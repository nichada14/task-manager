'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { register } from '@/lib/api/auth';

export default function RegisterForm() {
  // const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(form);
      localStorage.setItem('token', res.token);
      // Reload to update auth state (e.g., Navbar)
      window.location.href = '/tasks';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="w-full">Register</Button>
      </form>

      {/* Link to login page */}
      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </Card>
  );
}
