import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function SecondaryButton({
  children,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: SecondaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={[
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        'relative inline-flex items-center justify-center gap-2',
        'font-syne font-semibold tracking-widest uppercase',
        'rounded-sm overflow-hidden',
        'bg-transparent',
        'text-violet-300',
        'border border-violet-500/40',
        'hover:border-violet-400/70 hover:text-violet-200',
        'hover:bg-violet-950/20',
        'transition-all duration-300',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}
