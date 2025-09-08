import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Link from 'next/link';

export const MenuMobile = ({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  return (
    <div className='lg:hidden'>
      <div className='fixed inset-0 z-50' />
      <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='text-xl font-bold text-gray-900'>
              ERP Marmoraria
            </span>
          </Link>
          <button
            type='button'
            className='-m-2.5 rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(false)}
          >
            <XMarkIcon className='h-6 w-6' />
          </button>
        </div>
        <div className='mt-6 flow-root'>
          <div className='-my-6 divide-y divide-gray-500/10'>
            <div className='space-y-2 py-6'>
              <Link
                href='#features'
                className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
              >
                Funcionalidades
              </Link>
              <Link
                href='#testimonials'
                className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
              >
                Depoimentos
              </Link>
              <Link
                href='#pricing'
                className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
              >
                Preços
              </Link>
              <Link
                href='#contact'
                className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
              >
                Contato
              </Link>
            </div>
            <div className='py-6'>
              <Link
                href='/login'
                className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
