import { images } from '@/data/images';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

export function PrivateDining() {
  return (
    <section id="private-dining" className="relative overflow-hidden bg-obsidian py-24 md:py-32">
      <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
            <img
              src={images.privateDining}
              alt="A candlelit private table set for a small party"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/50 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-5">Private Dining</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-xl font-serif text-4xl font-semibold leading-tight text-bone text-balance md:text-5xl lg:text-6xl">
              The Cellar Room, <span className="italic text-brass">for your table</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ash md:text-lg">
              Behind the aging room, a private space seats up to twenty beneath the
              original steel trusses. Multi-course tasting menus, sommelier pairings,
              and a hearth you can watch — built for celebrations, boards, and nights
              that run long.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3">
              {['Seats up to 20 guests', 'Bespoke tasting menus & wine pairings', 'Dedicated service team'].map(
                (line) => (
                  <li key={line} className="flex items-center gap-3 text-ash">
                    <span className="h-1.5 w-1.5 rotate-45 bg-brass" />
                    {line}
                  </li>
                )
              )}
            </ul>
          </Reveal>
          <Reveal delay={0.24}>
            <ButtonLink href="#reserve" variant="outline" size="lg" className="mt-9">
              Inquire About Events
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
