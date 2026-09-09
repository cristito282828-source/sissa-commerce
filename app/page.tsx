import { WooNavbar } from '@/components/layout/navbar/woo-navbar';
import SeasonalBanner from '@/components/custom/SeasonalBanner';
import FeaturedProducts from '@/components/custom/FeaturedProducts';
import FooterCustom from '@/components/custom/FooterCustom';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import LevelLadder from '@/components/LevelLadder';
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
        <Hero
          eyebrow="naturismo · cuidado · bienestar"
          title={
            <>
              Cuidar el <span className="font-belleza italic text-emerald-200">cuerpo</span> es un acto de <span className="font-belleza italic text-emerald-200">amor</span>
            </>
          }
          subtitle="Productos y rituales naturales para nutrir la piel, el cuerpo y el bienestar integral."
          primaryCta={{ label: "Quiero saber más", href: "#productos" }}
          secondaryCta={{ label: "Ver catálogo", href: "/tienda" }}
          slides={[]}
        />
        <Testimonials
          eyebrow="testimonios reales"
          title="Lo que dicen quienes ya los probaron."
          subtitle="clientas satisfechas · revendedoras que confían en nosotros"
          googleRating={{
            score: 4.9,
            href: "https://maps.google.com/?cid=xxxxxxxxxxxxxxxxxxx",
          }}
          testimonials={[
            {
              name: 'Nombre Apellido',
              role: 'Cliente desde 2023',
              tag: 'Clienta',
              avatar: '/testimonio1.jpg',
              rating: 5,
              quote:
                'Empecé a usar los productos por recomendación de una amiga y la diferencia se nota desde las primeras semanas. Son 100% naturales, se siente en la piel y en el bienestar general. Ya no compro nada más.',
              source: 'Reseña publicada en Google',
            },
            {
              name: 'Otro Nombre',
              role: 'Revendedora oficial · 2 años',
              tag: 'Revendedora',
              avatar: '/testimonio2.jpg',
              rating: 5,
              quote:
                'Empecé como clienta y acabé metida de lleno como revendedora. El soporte del equipo es constante, los productos se venden solos porque la gente repite, y el margen me permite tener un ingreso extra serio, no un hobby.',
              source: 'Reseña publicada en Google',
            },
            {
              name: 'Tercer Nombre',
              role: 'Cliente desde 2022',
              tag: 'Clienta',
              avatar: '/testimonio3.jpg',
              rating: 5,
              quote:
                'Probé muchas marcas antes de llegar aquí y esta es la única que no me generó ninguna reacción. El servicio de atención cuando tuve dudas fue rápido y cercano.',
              source: 'Reseña publicada en Google',
            },
            {
              name: 'Cuarto Nombre',
              role: 'Revendedor oficial · 8 meses',
              tag: 'Revendedor',
              avatar: '/testimonio1.jpg',
              rating: 5,
              quote:
                'Lo que más valoro es la transparencia: sé exactamente qué llevo, cuánto gano y cómo crecer mi cartera de clientas. En 8 meses ya tengo una base fija que repite pedido cada mes.',
              source: 'Reseña publicada en Google',
            },
          ]}
          closingNote="Reseñas reales de clientas y revendedoras publicadas en Google. Verlas en Google."
        />
        <LevelLadder
          eyebrow="trabaja con nosotros"
          title="Elige tu nivel de crecimiento."
          subtitle="Empieza desde donde estés y avanza con apoyo, comunidad y beneficios reales."
          levels={[
            {
              name: 'Cliente',
              requirement: '1 compra',
              benefits: ['Acceso a productos premium', 'Descuentos preferenciales', 'Atención cercana'],
            },
            {
              name: 'Revendedora',
              requirement: 'Desde 3 pedidos',
              benefits: ['Comisiones por recomendación', 'Kit de bienvenida', 'Soporte para vender'],
            },
            {
              name: 'Líder',
              requirement: 'Equipo activo',
              benefits: ['Bonos por equipo', 'Mentoría', 'Recompensas por crecimiento'],
            },
          ]}
          cta={{ label: 'Quiero entrar', href: '/tienda' }}
        />
        <SeasonalBanner />
        <FeaturedProducts products={products} title="Productos destacados" />
      </main>
      <FooterCustom />
    </>
  );
}
