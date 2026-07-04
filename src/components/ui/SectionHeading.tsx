import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading = ({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) => {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
};
