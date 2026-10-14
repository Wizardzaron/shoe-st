import './globals.css';
import { StoreProvider } from './components/StoreContext';
import { Header, Footer } from './components/Chrome';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Shoe St. — Everyday icons', template: '%s | Shoe St.' },
  description: 'Fresh colors. Familiar silhouettes. Explore a curated collection of everyday sneaker classics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {/*Wraps the entire context used for storing login credentials, carts, etc in the application so it cna be used everywhere */}
        <StoreProvider demoMode={process.env.DEMO_MODE === 'true'}>
          <Header/>
          <div id="main-content">{children}</div>
          <Footer/>
        </StoreProvider>
      </body>
    </html>
  );
}
