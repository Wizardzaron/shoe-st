import { Suspense } from 'react';
import { Catalog } from '../components/Catalog';
import { Loading } from '../components/Products';

export default function Page() { return <Suspense fallback={<Loading/>}><Catalog/></Suspense>; }
