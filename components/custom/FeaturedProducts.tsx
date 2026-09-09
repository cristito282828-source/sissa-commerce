'use client';

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: string;
  categorySlug: string;
  imageSrc: string;
  description: string;
}

interface FeaturedProductsProps {
  products: FeaturedProduct[];
  title?: string;
}

// Función para limpiar precio HTML
function formatPrice(price: string | undefined): string {
  if (!price) return 'Precio no disponible';

  const clean = price
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  return clean.trim();
}

export default function FeaturedProducts({ products, title = 'Productos destacados' }: FeaturedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(getVisibleCards());
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const normalizedIndex = closestIndex % products.length;
    setActiveIndex(normalizedIndex);

    if (closestIndex >= products.length && !container.dataset.isLooping) {
      container.dataset.isLooping = 'true';
      setTimeout(() => {
        const targetCard = cards[normalizedIndex];
        if (targetCard) {
          const scrollAmount = targetCard.getBoundingClientRect().left - containerRect.left + container.scrollLeft;
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = scrollAmount;
          container.style.scrollBehavior = 'smooth';
        }
        delete container.dataset.isLooping;
      }, 100);
    }
  }, [products.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards[index]) {
      const card = cards[index];
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollAmount = cardRect.left - containerRect.left + container.scrollLeft;

      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const totalPages = Math.ceil(products.length / visibleCards);
  const activePage = Math.floor(activeIndex / visibleCards);

  const scrollToPage = (pageIndex: number) => {
    const cardIndex = pageIndex * visibleCards;
    scrollToCard(Math.min(cardIndex, products.length - 1));
  };

  const scrollPrev = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = products.length - 1;
    }
    scrollToCard(newIndex);
  };

  const scrollNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= products.length) {
      newIndex = 0;
    }
    scrollToCard(newIndex);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Colección</p>
            <h2 className="text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              {title}
            </h2>
          </div>

          <Link
            href="/search"
            className="inline-flex items-center justify-center text-sm font-medium text-stone-700 transition-colors hover:text-stone-900"
          >
            Ver todos <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 sm:flex">
            <button
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-stone-300 hover:text-stone-900"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 sm:flex">
            <button
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-stone-300 hover:text-stone-900"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="scroll-container flex gap-5 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <div
                key={`${product.slug}-${index}`}
                className="group snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31%]"
              >
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                      <Image
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 31vw"
                      />
                    </div>

                    <div className="space-y-2 p-4">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
                        {product.category}
                      </p>
                      <h3 className="text-base font-medium text-stone-900">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <span className="text-sm text-stone-700">{product.price}</span>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-900">
                          Ver más <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          <button
            onClick={scrollPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4 text-stone-700" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4 text-stone-700" />
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-full bg-[#1d3a2b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#264d3b]"
          >
            Ver todos
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scroll-container {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-container {
            scroll-behavior: auto !important;
          }

          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
