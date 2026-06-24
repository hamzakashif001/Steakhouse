import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'brass' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.22em] transition-colors duration-300 ease-luxe disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 min-h-[44px]',
  lg: 'px-8 py-4 min-h-[52px]',
};

const variants: Record<Variant, string> = {
  brass:
    'bg-brass text-obsidian hover:bg-brass-soft border border-brass hover:border-brass-soft',
  outline:
    'border border-brass/50 text-bone hover:border-brass hover:bg-brass/10',
  ghost: 'text-bone/80 hover:text-bone',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = 'brass',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'brass',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
