'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMe, logout } from '@/lib/api/auth';
import { IUser } from '@/types/user';
import Button from '../ui/Button';
import { FaUserLarge } from "react-icons/fa6";

export default function Navbar() {
  const [user, setUser] = useState<IUser | null>(null);

  // Fetch user from token on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          return;
        }
        const res = await getMe();
        setUser(res);
      } catch (err) {
        // Invalid token or request failed
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <nav className="bg-[#B0CA08] text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Home Link */}
      <Link href="/" className="text-xl font-bold text-white">
        Task Manager
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* User Info */}
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <FaUserLarge />
              <span className="font-medium">{user.username}</span>
            </div>

            {/* Logout Button */}
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Links if not logged in */}
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
