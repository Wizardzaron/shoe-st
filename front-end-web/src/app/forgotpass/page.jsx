import { Suspense } from 'react';
import Auth from '../components/Auth';
import { Loading } from '../components/Products';

export default function Page() { return <Suspense fallback={<Loading/>}><Auth type="forgotpass"/></Suspense>; }
