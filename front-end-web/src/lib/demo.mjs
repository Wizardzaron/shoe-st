// Isolated preview only. No credentials, payments, or live database connections.
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fail } from './proxy.mjs';

const require = createRequire(import.meta.url);
const products = require('../data/demo-products.json');

const secret = process.env.DEMO_SECRET || crypto.randomBytes(32).toString('hex');
const sizeLabels = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'];

function sizes(product) {
  return sizeLabels.map((size, i) => ({ size, size_id: product.id * 100 + i + 1, in_stock: 10 }));
}

function state(request) {
  const cookie = request.headers.get('Cookie')?.split('; ').find(v => v.startsWith('shoe_demo='))?.slice(10);
  if (cookie) {
    try {
      const [payload, mac] = cookie.split('.');
      const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
      if (mac.length === expected.length && crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) {
        const result = JSON.parse(Buffer.from(payload, 'base64url').toString());
        if (result.expires > Date.now()) return result;
      }
    } catch {}
  }
  return { cart: [], account: null };
}

function response(request, value, session, status = 200) {
  session.expires = Date.now() + 2 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const mac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return Response.json(value, { status, headers: { 'Cache-Control': 'no-store',
    'Set-Cookie': `shoe_demo=${payload}.${mac}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7200${secure}` } });
}

export async function demo(request, endpoint, data = {}) {
  const params = new URL(request.url).searchParams;
  const session = state(request);
  const product = products.find(p => p.id === Number(params.get('id')));
  if (endpoint === 'getlogin') return response(request, { loggedin: session.account ? 'True' : 'False', ...(session.account ? { id: 'demo' } : {}) }, session);
  if (['allshoedata', 'allmainimages'].includes(endpoint)) return response(request, products, session);
  if (endpoint === 'shoebrand') return response(request, products.filter(p => p.manufacture_id === Number(params.get('manufacture_id'))), session);
  if (endpoint === 'allshoes') return response(request, products, session);
  if (endpoint === 'shoedata') {
    if (!product) return fail('Shoe not found.', 404);
    return response(request, { ...product, sizes: sizes(product), images: [{ image_url: product.image_url, image_id: product.image_id }],
      brand_images: products.filter(p => p.brand_id === product.brand_id).map(p => ({ image_url: p.image_url, shoe_id: p.id })) }, session);
  }
  if (endpoint === 'allsizes') return response(request, product ? sizes(product) : [], session);
  if (endpoint === 'login') {
    session.account = { username: 'Demo shopper', firstname: 'Demo', lastname: 'Shopper', email: 'demo@example.com' };
    return response(request, { loggedin: 'True', id: 'demo' }, session);
  }
  if (endpoint === 'signup') return response(request, 'Demo account ready. You can sign in.', session, 201);
  if (endpoint === 'logout') { session.account = null; session.cart = []; return response(request, { Signout: 'Successful' }, session); }
  if (endpoint === 'sendemail') return response(request, { message: 'Demo only: use recovery code 123456. No email was sent.' }, session);
  if (endpoint === 'passwordcode') {
    if (data.passwordcode !== '123456') return fail('Invalid recovery code.', 400);
    session.recovery = true; return response(request, 'True', session);
  }
  if (endpoint === 'passwordchange') {
    if (!session.recovery) return fail('Verify a recovery code first.', 403);
    session.recovery = false; return response(request, 'Demo recovery complete. No password was stored.', session);
  }
  if (!session.account) return fail('Please sign in to continue.', 401);
  if (endpoint === 'userdata') return response(request, [session.account], session);
  if (endpoint === 'checkshippingaddress') return response(request, session.account.streetaddress ? session.account : null, session);
  if (endpoint === 'updateshippingaddress') { Object.assign(session.account, data); return response(request, 'Address updated', session); }
  if (endpoint === 'cartitem') {
    const shoe = products.find(p => p.id === Number(data.shoe_id));
    if (!shoe || !sizes(shoe).some(s => s.size_id === Number(data.size_id))) return fail('Choose a valid size.', 400);
    const existing = session.cart.find(i => i.size_id === Number(data.size_id));
    if (existing && existing.quantity >= 10) return fail('Demo stock limit reached.', 409);
    if (existing) existing.quantity++;
    else session.cart.push({ shoe_id: shoe.id, size_id: Number(data.size_id), quantity: 1, cart_item_id: Number(data.size_id) });
    return response(request, 'Item added', session, 201);
  }
  if (endpoint === 'cartitemremoved') session.cart = session.cart.filter(i => i.cart_item_id !== Number(data.cart_item_id));
  if (endpoint === 'cartdataremoved') session.cart = [];
  if (endpoint === 'newquantity') {
    const item = session.cart.find(i => i.cart_item_id === Number(data.cart_item_id));
    if (!item) return fail('Item not found.', 404);
    if (!Number.isInteger(data.newQuantity) || data.newQuantity < 1 || data.newQuantity > 10) return fail('Quantity must be 1–10.', 400);
    item.quantity = data.newQuantity;
  }
  const items = session.cart.map(i => {
    const shoe = products.find(p => p.id === i.shoe_id);
    return { ...shoe, ...i, size: sizes(shoe).find(s => s.size_id === i.size_id)?.size };
  });
  const total = (items.reduce((sum, i) => sum + Math.round(Number(i.price) * 100) * i.quantity, 0) / 100).toFixed(2);
  if (endpoint === 'cartitems') return response(request, [items, { subTotal: total }], session);
  if (endpoint === 'totalcost') return response(request, total, session);
  if (endpoint === 'ordercreate') {
    if (!items.length) return fail('Your bag is empty.', 409);
    session.cart = []; return response(request, 'Demo order recorded. No payment was taken.', session, 201);
  }
  return response(request, 'Updated', session);
}
