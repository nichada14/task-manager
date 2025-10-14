import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

// Button props with optional variant
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'delete' | 'create';
}

export default function Button({
  children,
  className,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'px-4 py-2 rounded font-medium transition-all';

  // Style variants
  const variants = {
    primary: 'bg-[#B0CA08] text-white hover:bg-[#94989B] cursor-pointer',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-[#94989B] hover:text-white cursor-pointer',
    delete: 'bg-red-500 text-white hover:bg-red-700 cursor-pointer',
    create: 'bg-green-500 text-white hover:bg-green-700 cursor-pointer',
  };

  const disabledClass = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={cn(
        base,
        variants[variant],     
        disabled && disabledClass,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
