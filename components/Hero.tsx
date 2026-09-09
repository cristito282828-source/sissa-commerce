"use client"

import React from "react";

type Cta = { label: string; href: string };
type Slide = { src: string; alt?: string };

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  slides?: Slide[];
}

export default function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  slides = [],
}: HeroProps) {
  return (
    <section className="bg-emerald-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <>
            <p className="text-sm uppercase tracking-[0.18em] text-emerald-200 mb-4">{eyebrow}</p>
            <div className="mb-6 flex justify-center">
              <img
                src="/shocked-young-female-gardener-uniform-wearing-gardening-hat-holds-broken-hot-pepper-isolated-green-wall-with-copy-space.jpg"
                alt="Jardinera natural"
                className="h-40 w-auto object-cover rounded-2xl shadow-lg"
              />
            </div>
          </>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-emerald-100 max-w-2xl mx-auto">{subtitle}</p>}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {primaryCta && (
            <a href={primaryCta.href} className="inline-block bg-white hover:bg-gray-100 text-emerald-900 px-6 py-3 rounded-full text-sm font-semibold">
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a href={secondaryCta.href} className="inline-block border border-white text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10">
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
