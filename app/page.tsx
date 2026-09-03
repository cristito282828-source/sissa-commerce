import { WooNavbar } from '@/components/layout/navbar/woo-navbar';
import SeasonalBanner from '@/components/custom/SeasonalBanner';
import FeaturedProducts from '@/components/custom/FeaturedProducts';
import FooterCustom from '@/components/custom/FooterCustom';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Sissa Productos Naturales',
  description: 'Productos naturales para tu bienestar diario: suplementos, hierbas, cuidado personal y estilo de vida saludable.',
  keywords: 'productos naturales, bienestar, salud, hierbas, suplementos, sissa',
};

export default async function HomePage() {
  let products = [] as any[];

  try {
    const data = await getProducts({});
    products = data.slice(0, 6).map((product) => ({
      id: product.id,
      name: product.title,
      slug: product.handle,
      price: product.priceRange?.minVariantPrice?.amount
        ? `$${product.priceRange.minVariantPrice.amount}`
        : 'Consultar precio',
      category: 'Destacados',
      categorySlug: 'destacados',
      imageSrc: product.featuredImage?.url || '/espirulina.png',
      description: product.description || 'Descubre más sobre este producto.',
    }));
  } catch (error) {
    console.error('Error loading featured products for home:', error);
  }

  return (
    <>
      <WooNavbar />
      <main id="main-content" className="min-h-screen bg-gray-50 pt-24">
        <SeasonalBanner />
        <FeaturedProducts products={products} title="Productos destacados" />
      </main>
      <FooterCustom />
    </>
  );
}
