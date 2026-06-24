import { Star } from 'lucide-react';
import { press } from '@/data/press';
import { Reveal } from '@/components/ui/Reveal';

export function Press() {
  return (
    <section className="relative bg-obsidian py-24 md:py-32">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">The Word</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-bone md:text-5xl lg:text-6xl">
              From the <span className="italic text-brass">critics</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {press.map((p, i) => (
            <Reveal key={p.source} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-sm border border-white/10 bg-char/60 p-8">
                <div className="mb-5 flex gap-1" role="img" aria-label={`${p.rating ?? 5} out of 5 stars`}>
                  {Array.from({ length: p.rating ?? 5 }).map((_, s) => (
                    <Star key={s} size={16} className="fill-brass text-brass" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="flex-1 font-serif text-lg italic leading-relaxed text-bone/90">
                  “{p.quote}”
                </blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.22em] text-brass">
                  {p.source}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
