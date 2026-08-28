import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function PrimaryButton({
  children,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: PrimaryButtonProps) {
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
        'bg-gradient-to-r from-violet-600 to-indigo-600',
        'text-white',
        'border border-violet-500/30',
        'shadow-[0_0_20px_rgba(124,58,237,0.3)]',
        'hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]',
        'transition-shadow duration-300',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(props as Record<string, unknown>)}
    >
      {/* Shimmer overlay */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
        }}
      />
      {children}
    </motion.button>
  );
}
