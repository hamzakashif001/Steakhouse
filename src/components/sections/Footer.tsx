import { useState, type FormEvent } from 'react';
import { ArrowUp, Facebook, Instagram, Twitter, type LucideIcon } from 'lucide-react';
import { site } from '@/data/site';

const iconMap: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setJoined(true);
  };

  return (
    <footer className="relative border-t border-white/10 bg-obsidian">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl font-semibold text-bone">
              Ember <span className="text-brass">&amp;</span> Oak
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ash">
              An American chophouse in a 1907 ironworks. Fire, cellar, and the
              cold Pacific — in the heart of Pioneer Square.
            </p>
            <div className="mt-6 flex gap-3">
              {site.socials.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ash transition-colors hover:border-brass hover:text-brass"
                  >
                    {Icon && <Icon size={18} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Visit */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-brass">Visit</p>
            <p className="text-sm text-ash">{site.address.line1}</p>
            <p className="text-sm text-ash">{site.address.line2}</p>
            <a href={site.phoneHref} className="mt-3 block text-sm text-ash hover:text-brass">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block text-sm text-ash hover:text-brass">
              {site.email}
            </a>
          </div>

          {/* Hours */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-brass">Hours</p>
            {site.hours.map((h) => (
              <p key={h.day} className="text-sm text-ash">
                <span className="text-bone/80">{h.day}</span>
                <br />
                {h.time}
              </p>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-brass">The List</p>
            <p className="mb-4 text-sm text-ash">
              Seasonal menus, aged-beef releases, and a seat before anyone else.
            </p>
            {joined ? (
              <p className="text-sm text-brass">You're on the list. Welcome.</p>
            ) : (
              <form onSubmit={onSubscribe} className="flex flex-col gap-3" noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-white/15 bg-char px-4 py-3 text-sm text-bone placeholder:text-ash/60 transition-colors focus:border-brass focus:outline-none"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-sm border border-brass/60 px-4 py-3 text-xs uppercase tracking-[0.22em] text-brass transition-colors hover:bg-brass hover:text-obsidian"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ash">
            © {new Date().getFullYear()} Ember &amp; Oak. A design showcase — not a real establishment.
          </p>
          <a
            href="#top"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:text-brass"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
