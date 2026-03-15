import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='bg-[#030821] border-t border-white/5'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Logo + nome */}
          <div className='flex items-center gap-2.5'>
            <div className='w-7 h-7 flex items-center justify-center overflow-hidden'>
              <Image
                src='/logo.svg'
                alt='Onmarmoraria'
                width={28}
                height={28}
                className='h-full w-full object-contain'
              />
            </div>
            <span className='text-sm font-semibold text-white'>Onmarmoraria</span>
          </div>

          {/* Copyright */}
          <p className='text-xs text-gray-500 text-center'>
            © {new Date().getFullYear()} Onmarmoraria. Todos os direitos reservados.
          </p>

          {/* Links */}
          <div className='flex gap-6'>
            {[
              { label: 'Privacidade', href: '#' },
              { label: 'Termos', href: '#' },
              { label: 'Suporte', href: '#' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className='text-xs text-gray-500 hover:text-gray-300 transition-colors'
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
