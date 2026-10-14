import { Suspense } from 'react';
import Detail from '../components/Detail';
import { Loading } from '../components/Products';

export default function Page() { return <Suspense fallback={<Loading/>}><Detail/></Suspense>; }
