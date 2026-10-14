import { Suspense } from 'react';
import Bag from '../components/Bag';
import { Loading } from '../components/Products';

export default function Page() { return <Suspense fallback={<Loading/>}><Bag/></Suspense>; }
