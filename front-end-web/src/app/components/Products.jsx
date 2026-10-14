//A reusable component that allows us to show the shoes like profile cards


'use client';
import Link from 'next/link';
import { Heart, ArrowUpRight } from 'lucide-react';
import { useStore } from './StoreContext';
import { money, shoeName } from '@/lib/api';

export function ProductCard({ product, index = 0 }) {
  const { saved, toggleSaved } = useStore();
  const name = shoeName(product);
  return (
    <article className={`product-card tone-${index % 4}`}>
      <div className="product-image">

        <Link href={`/shoedetail?id=${product.id}`} aria-label={`View ${name}`}>
          <img src={product.image_url?.trim()} alt={`${name} in ${product.color}`} loading="lazy"/>
        </Link>

        <button className="save-button" aria-label={`${saved.includes(product.id) ? 'Unsave' : 'Save'} ${name}`} aria-pressed={saved.includes(product.id)} onClick={() => toggleSaved(product.id)}>
          <Heart size={18} fill={saved.includes(product.id) ? 'currentColor' : 'none'}/>
        </button>

        <span className="product-tag">Everyday icon</span>
      </div>

      <Link href={`/shoedetail?id=${product.id}`} className="product-title">
        <h3>{name}</h3><ArrowUpRight size={17}/>
      </Link>

      <div className="product-meta">
        <span>{product.sex === 'Woman' ? 'Women' : 'Men'} · {product.color?.split('/').slice(0,2).join(' / ')}</span>
        <strong>{money(product.price)}</strong>
      </div>
      
    </article>
  );
}

export function Loading({ label = 'Loading the collection…' }) {
  return <div className="loading" role="status"><span className="spinner"/>{label}</div>;
}

export function ErrorState({ error, retry }) {
  return (
    <div className="empty-state" role="alert">
      <h2>Something got in the way.</h2>
      <p>{error}</p>
      {retry && <button className="st-button" onClick={retry}>Try again</button>}
    </div>
  );
}

export function Empty({ title, message, action = 'Explore shoes', href = '/list' }) {
  return (
    <div className="empty-state">
      <ShoppingIcon/>
      <h2>{title}</h2>
      <p>{message}</p>
      <Link className="st-button" href={href}>{action} <ArrowUpRight size={17}/></Link>
    </div>
  );
}

function ShoppingIcon() { return <span className="empty-mark">ST.</span>; }
