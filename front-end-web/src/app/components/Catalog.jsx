'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search } from 'lucide-react';
import { api } from '@/lib/api';
import { useStore } from './StoreContext';
import { ProductCard, Loading, ErrorState, Empty } from './Products';

function useProducts(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setData(null); setError('');
    api(path, { signal: controller.signal }).then(setData).catch(e => { if (e.name !== 'AbortError') setError(e.message); });
    return () => controller.abort();
  }, [path, version]);
  return { data, error, retry: () => setVersion(v => v + 1) };
}

export function Home() {
  const { data, error, retry } = useProducts('allshoedata');
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span/> THE EVERYDAY, ELEVATED</div>
          <h1>Make your<br/>next move<br/><em>a classic.</em></h1>
          <p>Fresh colors. Familiar silhouettes.<br/>Find the pair that feels like you.</p>
          <Link href="/list" className="st-button">Explore the collection <ArrowUpRight size={19}/></Link>
          <div className="hero-foot">CURATED CLASSICS <span>01 — 04</span></div>
        </div>
        <div className="hero-art">
          <svg className="hero-graphic" viewBox="0 0 600 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs><pattern id="street-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#233324" strokeOpacity=".12"/></pattern></defs>
            <rect width="600" height="650" fill="url(#street-grid)"/>
            <circle cx="300" cy="290" r="225" fill="#d7f46a"/>
            <circle cx="300" cy="290" r="175" fill="none" stroke="#243325" strokeWidth="1"/>
            <path d="M-100 470 C100 50 480 760 740 120" fill="none" stroke="#ff795f" strokeWidth="70"/>
            <path d="M-100 470 C100 50 480 760 740 120" fill="none" stroke="#ffc5b5" strokeWidth="2"/>
            <path d="M75 155h36m-18-18v36M490 440h36m-18-18v36" stroke="#26362c" strokeWidth="3"/>
          </svg>
          <span className="hero-outline">STREET</span>
          <span className="art-coordinate">STUDIO / 001<br/>BUILT FOR THE EVERYDAY</span>
          <span className="hero-orbit"/>
          <div className="hero-shoe"><img src="/products/shoe-1.png" alt="White and blue Nike Air Force 1 Shadow" fetchPriority="high"/></div>
          <div className="hero-sticker">FRESH<br/>PERSPECTIVE <ArrowUpRight size={20}/></div>
          <Link href="/shoedetail?id=1" className="hero-caption">
            <div><small>IN THE SPOTLIGHT</small><strong>Nike Air Force 1 Shadow</strong></div>
            <span><ArrowUpRight size={23}/></span>
          </Link>
        </div>
      </section>

      {/* <div className="street-ticker" aria-label="Fresh perspective. Classic silhouettes. Your everyday rotation.">
        <div aria-hidden="true">{[0,1].map(i => <span key={i}>FRESH PERSPECTIVE <b>✳</b> CLASSIC SILHOUETTES <b>✳</b> YOUR EVERYDAY ROTATION <b>✳</b> </span>)}</div>
      </div> */}

      <div className="brand-strip">
        <span>ICONS FOR A REASON</span>
        <Link href="/brand?manufacture_id=2">NIKE <ArrowUpRight size={16}/></Link>
        <Link href="/brand?manufacture_id=4">JORDAN <ArrowUpRight size={16}/></Link>
        <Link href="/brand?manufacture_id=1">ADIDAS <ArrowUpRight size={16}/></Link>
        <Link href="/brand?manufacture_id=3">PUMA <ArrowUpRight size={16}/></Link>
      </div>

      <section className="section">
        <div className="section-heading">
          <div><div className="eyebrow">YOUR NEXT DAILY ROTATION</div><h2>A little fresh. A lot classic.</h2></div>
          <Link href="/list">Shop all shoes <ArrowRight size={18}/></Link>
        </div>
        {error ? <ErrorState error={error} retry={retry}/> : !data ? <Loading/> : !data.length ? <Empty title="New pairs are on the way." message="Check back for the next collection."/> : <div className="product-grid">{data.slice(0,4).map((p,i) => <ProductCard key={p.id} product={p} index={i}/>)}</div>}
      </section>

      <section className="editorial">
        <svg className="editorial-graphic" viewBox="0 0 600 400" aria-hidden="true">
          <g fill="none" stroke="#d7ef69" strokeWidth="24">
            <ellipse cx="360" cy="200" rx="200" ry="80" transform="rotate(-35 360 200)"/>
            <ellipse cx="360" cy="200" rx="200" ry="80" transform="rotate(35 360 200)"/>
          </g>
          <circle cx="360" cy="200" r="45" fill="#ff795f"/>
        </svg>
        <div className="eyebrow">STYLE WITHOUT THE OVERTHINKING</div>
        <h2>Your shoes.<br/>Your street.<br/><em>Your story.</em></h2>
        <div>
          <p>Some things never go out of style.<br/>Start with a silhouette you love.<br/>Make everything else your own.</p>
          <Link href="/list" className="st-button light">Find your pair <ArrowUpRight size={18}/></Link>
        </div>
        <span className="editorial-number" aria-hidden="true">ST.</span>
      </section>
    </main>
  );
}

export function Catalog({ favorites = false, brand = false }) {
  const params = useSearchParams();
  const manufacturer = params.get('manufacture_id');
  const { saved } = useStore();
  const { data, error, retry } = useProducts(brand ? `shoebrand?manufacture_id=${encodeURIComponent(manufacturer || '')}` : 'allshoedata');
  const [query, setQuery] = useState(params.get('q') || '');
  const [gender, setGender] = useState(params.get('gender') || 'All');
  const [sort, setSort] = useState('featured');

  useEffect(() => { setQuery(params.get('q') || ''); setGender(params.get('gender') || 'All'); }, [params]);

  const products = useMemo(() => (data || []).filter(p =>
    (!favorites || saved.includes(p.id)) &&
    (gender === 'All' || (gender === 'Women' ? p.sex === 'Woman' : p.sex !== 'Woman')) &&
    `${p.brand_name} ${p.shoe_name} ${p.color}`.toLowerCase().includes(query.toLowerCase().trim()))
    .sort((a,b) => sort === 'low' ? Number(a.price)-Number(b.price) : sort === 'high' ? Number(b.price)-Number(a.price) : a.id-b.id),
    [data, favorites, saved, gender, query, sort]);

  const brandNames = {1:'Adidas',2:'Nike',3:'Puma',4:'Jordan'};

  return (
    <main className="section catalog">
      <div className="eyebrow">{favorites ? 'THE ONES YOU LOVE' : 'FIND YOUR NEXT EVERYDAY ICON'}</div>
      <div className="catalog-heading">
        <h1>{favorites ? 'Your shortlist.' : brand ? `${brandNames[manufacturer] || 'Brand'} collection.` : 'Good shoes. Great days.'}</h1>
        <span>{data ? `${products.length} pairs` : 'Loading'}</span>
      </div>
      <div className="filter-bar">
        <div className="filter-tabs" aria-label="Filter by gender">
          {['All','Women','Men'].map(value => <button key={value} aria-pressed={gender === value} onClick={() => setGender(value)}>{value === 'All' ? 'All shoes' : value}</button>)}
        </div>
        <label className="catalog-search">
          <Search size={16}/>
          <input aria-label="Search this collection" placeholder="Search collection" value={query} onChange={e => setQuery(e.target.value)}/>
        </label>
        <label className="sort-label">Sort <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select></label>
      </div>
      {error ? <ErrorState error={error} retry={retry}/> : !data ? <Loading/> : !products.length
        ? <Empty title={favorites && !saved.length ? 'Keep the good ones close.' : 'No pairs here yet.'} message={favorites && !saved.length ? 'Tap a heart on any shoe to save it here.' : 'Try another search or browse the full collection.'}/>
        : <div className="product-grid">{products.map((p,i) => <ProductCard key={p.id} product={p} index={i}/>)}</div>}
    </main>
  );
}
