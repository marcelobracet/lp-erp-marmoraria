'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/pt-br/landing');
  }, [router]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
    </div>
  );
}
