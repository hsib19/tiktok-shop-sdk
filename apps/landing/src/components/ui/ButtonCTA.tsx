import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type ButtonCTAProps = {
  href?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
  className?: string;
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
};

export default function ButtonCTA({
  href = '/docs/getting-started',
  label = 'Get Started',
  size = 'md',
  variant = 'primary',
  className = '',
  children,
  theme = 'light',
}: ButtonCTAProps) {
  const shadowColor =
    theme === 'dark'
      ? 'rgba(37, 99, 235, 0.35)'
      : variant === 'primary'
        ? 'rgba(37, 99, 235, 0.35)'
        : 'rgba(0, 0, 0, 0.15)';

  const style: CSSProperties = {
    ['--cta-shadow-color' as string]: shadowColor,
  };

  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex items-center rounded-xl font-medium transition focus:outline-none',
        size === 'sm' && 'px-3 py-1 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        variant === 'primary'
          ? 'bg-primary text-white! hover:bg-blue-700'
          : 'text-secondary-foreground! dark:bg-secondary hover:bg-secondary-foreground dark:hover:bg-secondary-foreground bg-white hover:text-white!',
        'shadow-[0px_1rem_3rem_var(--cta-shadow-color)]',
        className,
      )}
      style={style}
    >
      {label}
      {children}
    </Link>
  );
}
