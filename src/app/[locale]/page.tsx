'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function LocaleHomePage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get the locale from the current pathname
    const locale = pathname.split('/')[1];
    router.replace(`/${locale}/landing`);
  }, [router, pathname]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
    </div>
  );
}
