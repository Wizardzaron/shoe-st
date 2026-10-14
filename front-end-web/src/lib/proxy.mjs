const methods = {
  allshoes: 'GET', allshoedata: 'GET', allmainimages: 'GET', allshoecolors: 'GET',
  shoeimages: 'GET', shoedata: 'GET', shoebrand: 'GET', allsizes: 'GET',
  differentshoecolors: 'GET', getlogin: 'GET', userdata: 'GET',
  checkshippingaddress: 'GET', cartitems: 'GET', getcartdata: 'GET', totalcost: 'GET',
  login: 'POST', signup: 'POST', logout: 'POST', sendemail: 'POST',
  passwordcode: 'POST', passwordchange: 'PATCH', cartitem: 'POST',
  cartitemremoved: 'DELETE', cartdataremoved: 'DELETE', newquantity: 'PATCH',
  changeshoesize: 'PATCH', updateshippingaddress: 'PATCH', ordercreate: 'POST',
};

export function fail(message, status) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function proxy(request, path, config, fetcher = fetch) {
  if (path.length !== 1 || !Object.hasOwn(methods, path[0])) return fail('Endpoint not found.', 404);
  if (request.method !== methods[path[0]]) return fail('Method not allowed.', 405);
  const incoming = new URL(request.url);
  // On Vercel/edge platforms, TLS terminates upstream so request.url has http:
  // even for https visitors. Trust x-forwarded-proto which the platform sets.
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const protocol = forwardedProto ? `${forwardedProto}:` : incoming.protocol;
  const expectedOrigin = new URL(`${protocol}//${request.headers.get('host') || incoming.host}`).origin;
  const mutate = request.method !== 'GET';
  let payload;
  if (mutate) {
    if (request.headers.get('Origin') !== expectedOrigin) return fail('Origin is not allowed.', 403);
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return fail('Send JSON.', 415);
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 32 * 1024) return fail('Request is too large.', 413);
    try { payload = JSON.parse(raw); } catch { return fail('Invalid JSON.', 400); }
    if (!payload || Array.isArray(payload) || typeof payload !== 'object') return fail('Send a JSON object.', 400);
  }
  if (config.demo) return config.demo(request, path[0], payload);
  if (!config.base) return fail('The store API is not configured. Please try again later.', 503);
  let base;
  try {
    base = new URL(config.base);
    if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash)
      throw new Error();
  } catch { return fail('The store API configuration is invalid.', 503); }
  const target = new URL(`/${path[0]}`, base);
  if (!mutate) target.search = incoming.search;
  const headers = { Accept: 'application/json' };
  const cookie = request.headers.get('Cookie');
  if (cookie) headers.Cookie = cookie;
  if (mutate) {
    headers['Content-Type'] = 'application/json';
    headers.Origin = config.origin || expectedOrigin;
  }
  try {
    const response = await fetcher(target, {
      method: request.method, headers,
      body: mutate ? JSON.stringify(payload) : undefined,
      cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(10000),
    });
    if (response.status >= 300 && response.status < 400) return fail('Unexpected API redirect.', 502);
    const data = await response.text();
    const result = new Response(data, { status: response.status, headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/json',
      'Cache-Control': 'no-store',
    } });
    for (const cookie of response.headers.getSetCookie()) result.headers.append('Set-Cookie', cookie);
    return result;
  } catch { return fail('The store is temporarily unavailable. Please try again.', 503); }
}
