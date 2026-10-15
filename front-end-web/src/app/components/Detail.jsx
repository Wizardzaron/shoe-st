'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Heart, Check } from 'lucide-react';
import { api, money, shoeName } from '@/lib/api';
import { useStore } from './StoreContext';
import { Loading, ErrorState } from './Products';

export default function Detail() {
  const params = useSearchParams();
  const id = params.get('id');
  const requestedSize = params.get('size');
  const router = useRouter();
  const { user, authReady, refreshBag, saved, toggleSaved, notify } = useStore();
  const [shoe, setShoe] = useState(null);
  const [error, setError] = useState('');
  const [size, setSize] = useState(null);
  const [image, setImage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setShoe(null); setSize(null); setError('');
    api(`shoedata?id=${encodeURIComponent(id || '')}`, { signal: controller.signal })
      .then(value => {
        setShoe(value);
        const restored = value.sizes?.find(s => String(s.size_id) === requestedSize && Number(s.in_stock) > 0);
        if (restored) setSize(Number(restored.size_id));
        setImage(value.images?.[0]?.image_url?.trim());
      })
      .catch(e => { if (e.name !== 'AbortError') setError(e.message); });
    return () => controller.abort();
  }, [id, version, requestedSize]);

  async function add() {
    if (!size) { setError('Choose your size before adding to the bag.'); return; }
    if (!user) { router.push(`/login?next=${encodeURIComponent(`/shoedetail?id=${id}&size=${size}`)}`); return; }
    setBusy(true); setError('');
    try { await api('cartitem', { method: 'POST', body: { shoe_id: Number(id), size_id: size } }); await refreshBag(); notify('Added to your bag.'); }
    catch(e) { setError(e.message); } finally { setBusy(false); }
  }

  if (!shoe) return <main className="section">{error ? <ErrorState error={error} retry={() => setVersion(v => v+1)}/> : <Loading label="Finding your pair…"/>}</main>;

  return (
    <main className="section">
      <Link className="back-link" href="/list"><ArrowLeft size={16}/> Back to the collection</Link>
      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="main-photo"><img src={image} alt={`${shoeName(shoe)} in ${shoe.color}`}/></div>
          <div className="thumbnails">
            {shoe.images?.map(i => (
              <button key={i.image_id} aria-label="View product angle" aria-pressed={image === i.image_url.trim()} onClick={() => setImage(i.image_url.trim())}>
                <img src={i.image_url.trim()} alt=""/>
              </button>
            ))}
          </div>
        </div>
        <section className="detail-info">
          <div className="eyebrow">AN EVERYDAY ICON</div>
          <h1>{shoeName(shoe)}</h1>
          <p className="muted">{shoe.sex === 'Woman' ? "Women's" : "Men's"} shoes</p>
          <strong className="detail-price">{money(shoe.price)}</strong>
          <div className="detail-divider"/>
          <p className="label">Color <span>{shoe.color}</span></p>
          <div className="color-options">
            {shoe.brand_images?.map(i => (
              <Link key={i.shoe_id} href={`/shoedetail?id=${i.shoe_id}`} aria-label={`View color ${i.shoe_id}`} aria-current={Number(id) === i.shoe_id ? 'true' : undefined}>
                <img src={i.image_url.trim()} alt="Shoe color option"/>
              </Link>
            ))}
          </div>
          <fieldset className="sizes" aria-describedby="size-feedback">
            <legend>Select your size <span>US sizing</span></legend>
            <div>
              {shoe.sizes?.map(s => (
                <button key={s.size_id} className="size-option" type="button" disabled={!(Number(s.in_stock) > 0)}
                  aria-label={`US ${s.size}${Number(s.in_stock) > 0 ? '' : ' — sold out'}`}
                  aria-pressed={size === Number(s.size_id)}
                  onClick={() => { setSize(Number(s.size_id)); setError(''); }}>
                  {s.size}{size === Number(s.size_id) && <Check size={13} aria-hidden="true"/>}
                </button>
              ))}
            </div>
          </fieldset>
          <p id="size-feedback" className={`size-feedback${size ? ' selected' : ''}`} aria-live="polite">
            {size ? `Selected: US ${shoe.sizes.find(s => Number(s.size_id) === size)?.size}` : 'Choose a US size above to find your fit.'}
          </p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="st-button full add-to-bag" disabled={busy || !authReady || !shoe.sizes?.some(s => s.in_stock > 0)} onClick={add}>
            {busy ? 'Adding…' : !shoe.sizes?.some(s => Number(s.in_stock) > 0) ? 'Sold out' : 'Add to bag'} <ArrowRight size={18}/>
          </button>
          <button className="st-button secondary full" onClick={() => toggleSaved(Number(id))}>
            <Heart size={17} fill={saved.includes(Number(id)) ? 'currentColor' : 'none'}/>
            {saved.includes(Number(id)) ? 'Saved to your shortlist' : 'Save for later'}
          </button>
          <p className="detail-description">{shoe.descript}</p>
          <div className="detail-note"><Check size={16}/> A classic silhouette for your daily rotation.</div>
        </section>
      </div>
    </main>
  );
}
