'use client';
import { ErrorState } from './components/Products';

export default function ErrorPage({ reset }) {
  return <ErrorState error="The page could not be loaded. Please try again." retry={reset}/>;
}
