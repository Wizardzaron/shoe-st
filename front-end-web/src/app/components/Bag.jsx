'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { api, money, shoeName } from '@/lib/api';
import { useStore } from './StoreContext';
import { Loading, ErrorState, Empty } from './Products';

export default function Bag({ checkout = false }) {
  const { user, authReady, refreshBag, demoMode } = useStore();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [version, setVersion] = useState(0);
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (!authReady || !user) return;
    const controller = new AbortController();
    setError('');
    api('cartitems', { signal: controller.signal }).then(setData).catch(e => { if (e.name !== 'AbortError') setError(e.message); });
    if (checkout) api('checkshippingaddress', { signal: controller.signal }).then(value => setAddress(value || {})).catch(() => {});
    return () => controller.abort();
  }, [user, authReady, checkout, version]);

  async function change(endpoint, body) {
    setBusy(true); setError('');
    try {
      await api(endpoint, { method: endpoint === 'cartitemremoved' ? 'DELETE' : 'PATCH', body });
      const value = await api('cartitems');
      setData(value);
      await refreshBag();
    } catch(e) { setError(e.message); } finally { setBusy(false); }
  }

  async function order(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      await api('updateshippingaddress', { method: 'PATCH', body: Object.fromEntries(new FormData(event.currentTarget)) });
      await api('ordercreate', { method: 'POST', body: {} });
      await refreshBag();
      setDone(true);
    } catch(e) { setError(e.message); } finally { setBusy(false); }
  }

  if (!authReady) return <main className="section"><Loading label="Opening your bag…"/></main>;
  if (!user) return <main className="section"><Empty title="Your bag is personal." message="Sign in to add shoes and keep your bag together." action="Sign in" href={`/login?next=${checkout ? '/checkout' : '/cart'}`}/></main>;
  if (done) return <main className="section"><Empty title="Your demo order is recorded." message="No payment was collected and no shoes will be shipped. This is a portfolio checkout."/></main>;
  if (!data) return <main className="section">{error ? <ErrorState error={error} retry={() => setVersion(v => v+1)}/> : <Loading label="Opening your bag…"/>}</main>;

  const [items, total] = data;
  if (!items.length) return <main className="section"><Empty title="Room for your next favorite." message="Your bag is empty. Let's find something you love."/></main>;

  return (
    <main className="section bag-page">
      <div className="eyebrow">{checkout ? 'THE FINAL STEP' : 'YOUR DAILY ROTATION'}</div>
      <h1>{checkout ? 'Make them yours.' : 'Your bag.'}<span className="count">{items.length} {items.length === 1 ? 'pair' : 'pairs'}</span></h1>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="bag-grid">
        <section>
          {items.map(item => (
            <article className="bag-item" key={item.cart_item_id}>
              <Link href={`/shoedetail?id=${item.id}`} className="bag-photo"><img src={item.image_url.trim()} alt={shoeName(item)}/></Link>
              <div>
                <Link href={`/shoedetail?id=${item.id}`}><h3>{shoeName(item)}</h3></Link>
                <p className="muted">{item.color}</p>
                <p>Size {item.size}</p>
                {!checkout && (
                  <div className="quantity">
                    <button aria-label={`Decrease quantity of ${shoeName(item)}`} disabled={busy || item.quantity <= 1} onClick={() => change('newquantity', { cart_item_id: item.cart_item_id, newQuantity: item.quantity - 1 })}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Increase quantity of ${shoeName(item)}`} disabled={busy || item.quantity >= 99} onClick={() => change('newquantity', { cart_item_id: item.cart_item_id, newQuantity: item.quantity + 1 })}><Plus size={14}/></button>
                  </div>
                )}
                {checkout && <p>Quantity {item.quantity}</p>}
              </div>
              <div className="bag-item-end">
                <strong>{money(Number(item.price) * item.quantity)}</strong>
                {!checkout && <button className="icon-button" aria-label={`Remove ${shoeName(item)}`} disabled={busy} onClick={() => change('cartitemremoved', { cart_item_id: item.cart_item_id })}><Trash2 size={18}/></button>}
              </div>
            </article>
          ))}
          {checkout && (
            <form id="checkout-form" onSubmit={order} className="address-form">
              <h2>Shipping details</h2>
              <p className="muted">Portfolio demo: use sample information.</p>
              <div className="form address-grid">
                {[['firstname','First name'],['lastname','Last name'],['streetaddress','Street address'],['city','City'],['state','State'],['zipcode','ZIP code']].map(([name,label]) => (
                  <label key={name}>{label}<input name={name} required maxLength={255} value={address[name] || ''} onChange={e => setAddress({...address, [name]: e.target.value})}/></label>
                ))}
              </div>
            </form>
          )}
        </section>
        <aside className="order-summary">
          <div className="eyebrow">THE GOOD STUFF, TOGETHER</div>
          <h2>Order summary</h2>
          <div><span>Subtotal</span><strong>{money(total.subTotal)}</strong></div>
          <div><span>Shipping & tax</span><span>Not applied in demo</span></div>
          <div className="summary-total"><span>Demo total</span><strong>{money(total.subTotal)}</strong></div>
          <p>This portfolio checkout records an order only. No payment is taken and no shipment is created.</p>
          {checkout
            ? <button className="st-button full" form="checkout-form" disabled={busy}>{busy ? 'Recording…' : 'Record demo order'}<ArrowRight size={17}/></button>
            : <Link className="st-button full" href="/checkout">Continue to demo checkout<ArrowRight size={17}/></Link>}
          <Link className="small-link" href={checkout ? '/cart' : '/list'}>{checkout ? 'Back to bag' : 'Keep exploring'}</Link>
        </aside>
      </div>
    </main>
  );
}
