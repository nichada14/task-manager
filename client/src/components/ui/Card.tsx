import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('bg-white p-6 rounded shadow', className)}>
      {children}
    </div>
  );
}
