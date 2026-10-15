'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useStore } from './StoreContext';
import { Empty, Loading, ErrorState } from './Products';

export default function Account() {
  const { user, authReady, setUser, notify } = useStore();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    api('userdata', { signal: controller.signal }).then(value => setProfile(value[0])).catch(e => { if (e.name !== 'AbortError') setError(e.message); });
    return () => controller.abort();
  }, [user, version]);

  async function logout() {
    setBusy(true);
    try { await api('logout', { method: 'POST', body: {} }); setUser(null); notify('Signed out.'); router.push('/home'); }
    catch(e) { setError(e.message); } finally { setBusy(false); }
  }

  if (!authReady) return <Loading/>;
  if (!user) return <Empty title="A place for your favorites." message="Sign in to view your account." action="Sign in" href="/login?next=/user"/>;

  return (
    <main className="section account-page">
      <div className="eyebrow">YOUR SHOE ST.</div>
      <h1>Hey, {profile?.firstname || profile?.username || 'there'}.</h1>
      {error && <ErrorState error={error} retry={() => setVersion(v => v+1)}/>}
      <p className="muted">Your account, your rotation.</p>
      {profile
        ? <dl><dt>Username</dt><dd>{profile.username}</dd><dt>Email</dt><dd>{profile.email}</dd></dl>
        : <Loading/>}
      <button className="st-button secondary" onClick={logout} disabled={busy}>{busy ? 'Signing out…' : 'Sign out'}</button>
    </main>
  );
}
