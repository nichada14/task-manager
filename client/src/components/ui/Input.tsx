import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#1E7AAF]',
        className
      )}
      {...props}
    />
  );
}
