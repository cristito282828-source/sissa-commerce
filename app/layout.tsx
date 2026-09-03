import type { Metadata } from 'next';
import './globals.css';
import { RecentlyViewedProvider } from '@/components/providers/RecentlyViewedProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';
import { JsonLdScript } from '@/lib/json-ld-script';

export const metadata: Metadata = {
  title: {
    default: 'Sissa Productos Naturales',
    template: '%s | Sissa Productos Naturales'
  },
  description: 'Productos naturales, suplementos y bienestar para vivir con más energía, salud y equilibrio.',
  keywords: ['productos naturales', 'suplementos', 'salud', 'bienestar', 'natural', 'sissa'],
  authors: [{ name: 'Sissa Productos Naturales' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://example.com',
    siteName: 'Sissa Productos Naturales',
    title: 'Sissa Productos Naturales',
    description: 'Descubre productos naturales para salud, bienestar y estilo de vida.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="es">
      <head>
        {/* Structured Data global para SEO */}
        <JsonLdScript data={organizationSchema} />
        <JsonLdScript data={webSiteSchema} />
      </head>
      <body className="antialiased">
        {/* Skip Link para accesibilidad - permite saltar al contenido principal */}
        <a
          href="#main-content"
          className="skip-link"
        >
          Saltar al contenido principal
        </a>

        <CartProvider>
          <RecentlyViewedProvider>
            {children}
          </RecentlyViewedProvider>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
