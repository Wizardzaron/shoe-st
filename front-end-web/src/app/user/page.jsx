import { Suspense } from 'react';
import Account from '../components/Account';
import { Loading } from '../components/Products';

export default function Page() { return <Suspense fallback={<Loading/>}><Account/></Suspense>; }
