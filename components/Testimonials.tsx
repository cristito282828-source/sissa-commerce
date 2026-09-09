type Testimonial = {
  name: string;
  role: string;
  tag: string;
  avatar?: string;
  rating: number;
  quote: string;
  source: string;
};

type GoogleRating = {
  score: number;
  href: string;
};

interface TestimonialsProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  googleRating?: GoogleRating;
  testimonials: Testimonial[];
  closingNote?: string;
}

export default function Testimonials({
  eyebrow,
  title,
  subtitle,
  googleRating,
  testimonials,
  closingNote,
}: TestimonialsProps) {
  return (
    <section className="bg-[#f8f7f2] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 mb-2">{eyebrow}</p>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-emerald-900 leading-tight">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-emerald-800/80">{subtitle}</p>}
        </div>

        {googleRating && (
          <div className="flex justify-center mb-6">
            <a
              href={googleRating.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm ring-1 ring-emerald-100 text-emerald-900"
            >
              <span className="text-base font-semibold">★ {googleRating.score.toFixed(1)}</span>
              <span className="text-xs font-medium">Google Reviews</span>
            </a>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.slice(0, 2).map((item, idx) => (
            <article
              key={`${item.name}-${idx}`}
              className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-emerald-100 ring-1 ring-emerald-200">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-emerald-900">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-emerald-900 text-sm">{item.name}</p>
                  <p className="text-[11px] text-emerald-700">{item.role}</p>
                </div>
              </div>

              <div className="mb-3 inline-flex w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {item.tag}
              </div>

              <div className="mb-3 text-amber-500 text-sm tracking-wide">
                {"★".repeat(item.rating)}
              </div>

              <p className="text-sm leading-6 text-emerald-900/80">“{item.quote}”</p>

              <div className="mt-auto pt-4 text-[11px] text-emerald-700/80">{item.source}</div>
            </article>
          ))}
        </div>

        {closingNote && (
          <p className="mt-6 text-center text-xs text-emerald-800/80">
            {closingNote}
          </p>
        )}
      </div>
    </section>
  );
}
