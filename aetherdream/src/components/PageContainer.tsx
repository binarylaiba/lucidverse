import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function PageContainer({
  children,
  className = '',
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div
      className={[
        'relative z-10 min-h-screen',
        fullWidth ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
