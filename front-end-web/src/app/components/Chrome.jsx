//Used as our header and footer for the website, wraps around the website/children in layout.js

//We use Link instead of a tag because it navigates without a full page reload which is much faster


'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, ShoppingBag, Heart, Search, User, ArrowRight } from 'lucide-react';
import { useStore } from './StoreContext';

export function Header() {
  const path = usePathname();
  const router = useRouter();
  const { user, bagCount, saved, demoMode } = useStore();
  return <>
    {demoMode && <div className="demo-bar">Interactive demo · sample inventory · no real payments or accounts</div>}
    <div className="announcement">GOOD SHOES. GREAT DAYS.<span>A fresh perspective on everyday classics <ArrowUpRight size={13}/></span></div>
    <header className="header">
      <Link className="wordmark" href="/home" aria-label="Shoe Street home">SHOE<span>ST.</span><i/></Link>
      <nav aria-label="Main navigation">
        <Link className={path === '/list' ? 'active' : ''} href="/list">Shop all</Link>
        <Link href="/list?gender=Women">Women</Link>
        <Link href="/list?gender=Men">Men</Link>
      </nav>
      <form className="header-search" role="search" onSubmit={e => { e.preventDefault(); const q = new FormData(e.currentTarget).get('q'); router.push(`/list?q=${encodeURIComponent(q)}`); }}>
        <Search size={17} aria-hidden="true"/>
        <input name="q" aria-label="Search shoes" placeholder="Find your next pair"/>
        <button className="sr-only" type="submit">Search</button>
      </form>
      <div className="header-actions">
        <Link href={user ? '/user' : '/login'} aria-label={user ? 'Your account' : 'Sign in'}><User size={21}/></Link>
        <Link href="/favorites" aria-label={`Saved shoes, ${saved.length} items`}><Heart size={21}/></Link>
        <Link href="/cart" className="bag-link" aria-label={`Shopping bag, ${bagCount} items`}><ShoppingBag size={21}/><span>{bagCount}</span></Link>
      </div>
    </header>
  </>;
}

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link href="/home" className="wordmark">SHOE<span>ST.</span></Link>
        <p>Classics, with a fresh point of view.</p>
      </div>
      <div>
        <Link href="/list">Explore the collection <ArrowRight size={16}/></Link>
        <span>Independent portfolio storefront · 2026</span>
      </div>
    </footer>
  );
}
