import { Suspense } from 'react';
import { Home } from '../components/Catalog';
import { Loading } from '../components/Products';

export default function Page() { return <Suspense fallback={<Loading/>}><Home/></Suspense>; }
