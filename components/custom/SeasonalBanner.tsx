 'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    id: '1',
    image: '/espirulina.png',
    title: 'Bienestar natural en cada día',
    description: 'Descubre suplementos y productos naturales pensados para apoyar tu energía, salud y equilibrio diario.',
    buttonText: 'Ver colección',
    href: '/search',
  },
  {
    id: '2',
    image: '/espirulina2.png',
    title: 'Nutrición con propósito',
    description: 'Ingredientes naturales de alta calidad para cuidar tu cuerpo y fortalecer tus hábitos saludables.',
    buttonText: 'Explorar ahora',
    href: '/search',
  },
  {
    id: '3',
    image: '/espirulina.png',
    title: 'Salud, limpieza y vitalidad',
    description: 'Productos pensados para ayudarte a sentirte mejor cada día con soluciones simples y naturales.',
    buttonText: 'Ver más',
    href: '/search',
  },
];

export default function SeasonalBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    dotsClass: 'slick-dots seasonal-dots',
  };

  return (
    <section id="seasonal" className="relative bg-black text-white">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[70vh] min-h-[520px] overflow-hidden">
            <Link href="/search" className="absolute inset-0 block">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <span className="sr-only">Ver catálogo</span>
            </Link>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .seasonal-dots {
          display: flex !important;
          justify-content: center;
          gap: 0.75rem;
          margin: 0;
          padding: 0;
        }
        .seasonal-dots li {
          margin: 0;
        }
        .seasonal-dots li button {
          width: 3rem;
          height: 0.375rem;
          padding: 0;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .seasonal-dots li.slick-active button {
          width: 5rem;
          background: #ffffff;
        }
        .seasonal-dots li button:before {
          display: none;
        }
      `}</style>
    </section>
  );
}
