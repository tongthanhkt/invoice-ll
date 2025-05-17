'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  // const { user } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}').user;
    if (user) {
      router.push('/invoice');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
