
//Single helper function designed to make it easier to do requests instead of doing it on every page

export class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

export async function api(path, { method = 'GET', body, signal } = {}) {
  let response;
  try {
    response = await fetch(`/api/store/${path}`, {
      method, credentials: 'same-origin', signal,
      headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('Unable to reach the store. Please try again.', 0);
  }
  const value = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(value?.message || (response.status === 401 ? 'Please sign in to continue.' : 'That request could not be completed.'), response.status);
  return value;
}

//
export function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

export function shoeName(product) {
  const base = (product.brand_name || '').trim();
  const name = (product.shoe_name || '').trim();
  return `${base} ${name}`.trim();
}

export function safeReturn(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !value.includes('\\') ? value : '/home';
}
