'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';

//Allows us to pass the data to multiple pages and components without  needing to use props which is cumbersome
const Context = createContext(null);

export function StoreProvider({ children, demoMode }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [bagCount, setBagCount] = useState(0);
  const [saved, setSaved] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    api('getlogin').then(value => { if (active) setUser(value.loggedin === 'True' ? value : null); })
      .catch(() => {}).finally(() => { if (active) setAuthReady(true); });
    try { const value = JSON.parse(localStorage.getItem('shoe-st-saved') || '[]'); if (Array.isArray(value)) setSaved(value.filter(Number.isInteger)); } catch {}
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!user) { setBagCount(0); return; }
    let active = true;
    api('cartitems').then(([items]) => { if (active) setBagCount(items.reduce((sum, item) => sum + item.quantity, 0)); }).catch(() => {});
    return () => { active = false; };
  }, [user]);

  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 4000); return () => clearTimeout(timer); }, [notice]);

  async function refreshBag() {
    if (!user) return;
    try { const [items] = await api('cartitems'); setBagCount(items.reduce((sum, item) => sum + item.quantity, 0)); } catch {}
  }

  function toggleSaved(id) {
    setSaved(previous => {
      const next = previous.includes(id) ? previous.filter(x => x !== id) : [...previous, id];
      try { localStorage.setItem('shoe-st-saved', JSON.stringify(next)); } catch {}
      return next;
    });
  }

  return (
    <Context.Provider value={{ user, setUser, authReady, bagCount, refreshBag, saved, toggleSaved, notify: setNotice, demoMode }}>
      {children}
      {notice && <div className="toast" role="status">{notice}</div>}
    </Context.Provider>
  );
}

export function useStore() { return useContext(Context); }
