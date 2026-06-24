import { stats } from '@/data/site';
import { images } from '@/data/images';
import { Reveal } from '@/components/ui/Reveal';
import { CountUp } from '@/components/ui/CountUp';

export function Craft() {
  return (
    <section id="craft" className="relative overflow-hidden bg-obsidian py-24 md:py-32">
      <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Image */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
            <img
              src={images.craft}
              alt="A dry-aged steak being carved on a wooden board"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 border-r border-t border-brass/50" />
        </Reveal>

        {/* Copy + stats */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-5">The Craft</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-xl font-serif text-4xl font-semibold leading-tight text-bone text-balance md:text-5xl lg:text-6xl">
              Patience, salt, and a <span className="italic text-brass">live fire</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ash md:text-lg">
              Whole primals rest in our glass aging room for a minimum of 45 days,
              concentrating flavor until the crust turns to hazelnut and the center
              to butter. Then they meet the coal hearth — 1,100 degrees of Pacific
              Northwest hardwood and binchotan.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-9">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-3xl text-brass md:text-5xl">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ash">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
