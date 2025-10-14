import { getToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function HomePage() {
  
  const token = getToken();

  if (!token) {
    redirect('/login');
  } else {
    redirect('/tasks');
  }

  return null;
}
