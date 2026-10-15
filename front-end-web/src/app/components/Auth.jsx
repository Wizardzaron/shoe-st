'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { api, safeReturn } from '@/lib/api';
import { useStore } from './StoreContext';

const config = {
  login:        { title: 'Welcome back.',         intro: 'Your next favorite pair is waiting.',                     endpoint: 'login',          method: 'POST',  action: 'Sign in',            fields: [['username','Username','text'],['passwd','Password','password']] },
  signup:       { title: 'Make yourself at home.', intro: 'A new account. A fresh start.',                          endpoint: 'signup',         method: 'POST',  action: 'Create account',     fields: [['firstname','First name','text'],['lastname','Last name','text'],['username','Username','text'],['email','Email','email'],['passwd','Password','password']] },
  forgotpass:   { title: 'Let’s get you back in.', intro: 'Enter your username to request a recovery code.',   endpoint: 'sendemail',      method: 'POST',  action: 'Send recovery code', fields: [['username','Username','text']] },
  recoverycode: { title: 'Check your inbox.',      intro: 'Enter the six-digit code from your recovery email.',     endpoint: 'passwordcode',   method: 'POST',  action: 'Verify code',        fields: [['username','Username','text'],['passwordcode','Recovery code','text']] },
  changepass:   { title: 'A fresh start.',         intro: 'Choose a new password with at least eight characters.',  endpoint: 'passwordchange', method: 'PATCH', action: 'Update password',    fields: [['username','Username','text'],['password','New password','password']] },
};

export default function Auth({ type }) {
  const options = config[type];
  const router = useRouter();
  const params = useSearchParams();
  const { setUser, demoMode, notify } = useStore();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    const data = demoMode && type === 'login' ? { username: 'demo', passwd: 'demo-only' } : Object.fromEntries(new FormData(event.currentTarget));
    try {
      const value = await api(options.endpoint, { method: options.method, body: data });
      if (type === 'login') { setUser(value); router.push(safeReturn(params.get('next'))); }
      else if (type === 'signup') { notify('Account created. You can sign in now.'); router.push('/login'); }
      else if (type === 'forgotpass') { setMessage(value.message); }
      else if (type === 'recoverycode') { if (value !== 'True') throw new Error('That recovery code could not be verified.'); notify('Code verified. Choose a new password.'); router.push('/changepass'); }
      else { notify(demoMode ? 'Demo recovery complete.' : 'Password updated. Please sign in.'); setUser(null); router.push('/login'); }
    } catch(e) { setError(e.message); } finally { setBusy(false); }
  }

  return (
    <main className="auth-layout">
      <section className="auth-art">
        <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
        <h2>A good day<br/>starts with<br/><em>a great pair.</em></h2>
        <img src="/products/shoe-3.png" alt="Black and white Air Jordan 1 Low"/>
        <span className="auth-art-foot">SHOE ST. — EVERYDAY ICONS</span>
      </section>
      <section className="auth-panel">
        <Link className="back-link" href="/list">Explore the collection <ArrowUpRight size={16}/></Link>
        <div className="eyebrow">{type === 'login' ? 'BACK IN YOUR ROTATION' : 'YOUR SHOE ST. ACCOUNT'}</div>
        <h1>{options.title}</h1>
        <p className="muted">{options.intro}</p>
        {demoMode && <p className="demo-note">Preview only. Use sample details, never a real password.{type === 'recoverycode' && ' Demo code: 123456.'}</p>}
        <form onSubmit={submit} className="form">
          {!(demoMode && type === 'login') && options.fields.map(([name, label, inputType]) => (
            <label key={name} htmlFor={name}>{label}
              <input id={name} name={name} type={inputType} required
                minLength={name === 'passwd' && type === 'signup' || name === 'password' ? 8 : name === 'username' && type === 'signup' ? 4 : undefined}
                maxLength={name === 'passwordcode' ? 6 : 255}
                pattern={name === 'passwordcode' ? '[0-9]{6}' : undefined}
                inputMode={name === 'passwordcode' ? 'numeric' : undefined}
                autoComplete={name === 'passwd' ? type === 'login' ? 'current-password' : 'new-password' : name === 'password' ? 'new-password' : name === 'passwordcode' ? 'one-time-code' : name === 'username' ? 'username' : name === 'email' ? 'email' : name === 'firstname' ? 'given-name' : 'family-name'}
              />
            </label>
          ))}
          {type === 'login' && !demoMode && <Link className="small-link" href="/forgotpass">Forgot password?</Link>}
          {error && <p role="alert" className="form-error">{error}</p>}
          {message && <p role="status" className="success-message">{message}</p>}
          <button className="st-button full" disabled={busy}>{busy ? 'Please wait…' : demoMode && type === 'login' ? 'Continue as demo shopper' : options.action}<ArrowRight size={18}/></button>
        </form>
        {type === 'forgotpass' && message && <Link className="small-link" href="/recoverycode">I have a recovery code <ArrowRight size={15}/></Link>}
        {type === 'login' && <p className="auth-alternate">New around here? <Link href="/signup">Create an account</Link></p>}
        {type !== 'login' && <p className="auth-alternate"><Link href="/login">Back to sign in</Link></p>}
      </section>
    </main>
  );
}
