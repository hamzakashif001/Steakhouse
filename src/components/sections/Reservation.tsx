import { useId, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Loader2, MapPin, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface FormState {
  date: string;
  time: string;
  party: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  notes: string;
}

const empty: FormState = {
  date: '',
  time: '',
  party: '2',
  name: '',
  email: '',
  phone: '',
  occasion: '',
  notes: '',
};

const fieldClass =
  'w-full rounded-sm border border-white/15 bg-obsidian/60 px-4 py-3 text-bone placeholder:text-ash/60 transition-colors duration-200 focus:border-brass focus:outline-none';
const labelClass = 'mb-2 block font-sans text-xs uppercase tracking-[0.18em] text-ash';

export function Reservation() {
  const uid = useId();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.date) e.date = 'Choose a date';
    if (!form.time) e.time = 'Choose a time';
    if (!form.name.trim()) e.name = 'Your name, please';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email is required';
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'A reachable phone number';
    return e;
  };

  // Optional real backend: set VITE_FORMSPREE_ID to a Formspree form id.
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('submitting');

    if (!formspreeId) {
      // No backend configured — showcase mode: simulate, then confirm.
      window.setTimeout(() => setStatus('success'), 1100);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Reservation request — ${form.name} (${form.party})`,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="reserve" className="relative bg-char py-24 md:py-32">
      <div className="container-luxe grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Left: heading + details */}
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Reservations</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-bone md:text-5xl lg:text-6xl">
              Reserve your <span className="italic text-brass">table</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-ash">
              We hold a limited number of tables each evening. For parties larger
              than eight, please call the house directly.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 space-y-6 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 shrink-0 text-brass" size={20} />
                <div>
                  <p className="mb-1 text-sm uppercase tracking-[0.16em] text-bone">Hours</p>
                  {site.hours.map((h) => (
                    <p key={h.day} className="text-sm text-ash">
                      <span className="text-bone/80">{h.day}</span> — {h.time}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 shrink-0 text-brass" size={20} />
                <div>
                  <p className="mb-1 text-sm uppercase tracking-[0.16em] text-bone">Find us</p>
                  <p className="text-sm text-ash">{site.address.line1}</p>
                  <p className="text-sm text-ash">{site.address.line2}</p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm text-brass underline-offset-4 hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 shrink-0 text-brass" size={20} />
                <div>
                  <p className="mb-1 text-sm uppercase tracking-[0.16em] text-bone">Call the house</p>
                  <a href={site.phoneHref} className="text-sm text-ash hover:text-brass">
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: form / success */}
        <Reveal delay={0.1}>
          <div className="rounded-sm border border-white/10 bg-obsidian/50 p-6 md:p-9">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brass/50 text-brass">
                  <Check size={30} />
                </span>
                <h3 className="mt-6 font-serif text-3xl text-bone">Table requested</h3>
                <p className="mt-3 max-w-xs text-ash">
                  Thank you, {form.name.split(' ')[0] || 'friend'}. We'll confirm your
                  table for {form.party} on {form.date} by email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(empty);
                    setStatus('idle');
                  }}
                  className="mt-8 cursor-pointer text-xs uppercase tracking-[0.22em] text-brass hover:text-brass-soft"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id={`${uid}-date`} label="Date" error={errors.date}>
                    <input
                      id={`${uid}-date`}
                      type="date"
                      className={cn(fieldClass, '[color-scheme:dark]')}
                      value={form.date}
                      onChange={(e) => set('date', e.target.value)}
                    />
                  </Field>
                  <Field id={`${uid}-time`} label="Time" error={errors.time}>
                    <input
                      id={`${uid}-time`}
                      type="time"
                      className={cn(fieldClass, '[color-scheme:dark]')}
                      value={form.time}
                      onChange={(e) => set('time', e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field id={`${uid}-party`} label="Party size">
                    <select
                      id={`${uid}-party`}
                      className={fieldClass}
                      value={form.party}
                      onChange={(e) => set('party', e.target.value)}
                    >
                      {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                      <option value="8+">8+ (please call)</option>
                    </select>
                  </Field>
                </div>

                <div className="mt-5">
                  <Field id={`${uid}-name`} label="Name" error={errors.name}>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      className={fieldClass}
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id={`${uid}-email`} label="Email" error={errors.email}>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      className={fieldClass}
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  </Field>
                  <Field id={`${uid}-phone`} label="Phone" error={errors.phone}>
                    <input
                      id={`${uid}-phone`}
                      type="tel"
                      autoComplete="tel"
                      placeholder="(206) 555-0000"
                      className={fieldClass}
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field id={`${uid}-occasion`} label="Occasion (optional)">
                    <select
                      id={`${uid}-occasion`}
                      className={fieldClass}
                      value={form.occasion}
                      onChange={(e) => set('occasion', e.target.value)}
                    >
                      <option value="">No occasion</option>
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Business dinner</option>
                      <option>Date night</option>
                      <option>Celebration</option>
                    </select>
                  </Field>
                </div>

                <div className="mt-5">
                  <Field id={`${uid}-notes`} label="Special requests (optional)">
                    <textarea
                      id={`${uid}-notes`}
                      rows={3}
                      placeholder="Allergies, seating preferences, a special note…"
                      className={cn(fieldClass, 'resize-none')}
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                    />
                  </Field>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-8 w-full"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Requesting…
                    </>
                  ) : (
                    'Request Reservation'
                  )}
                </Button>

                {status === 'error' && (
                  <p className="mt-4 text-center text-sm" role="alert" style={{ color: '#E0848C' }}>
                    Something went wrong sending your request. Please call the house at{' '}
                    <a href={site.phoneHref} className="underline">
                      {site.phone}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-oxblood-deep" role="alert" style={{ color: '#E0848C' }}>
          {error}
        </p>
      )}
    </div>
  );
}
