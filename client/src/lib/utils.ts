// Utility function to combine class names, ignoring falsy values
export function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
  }
  