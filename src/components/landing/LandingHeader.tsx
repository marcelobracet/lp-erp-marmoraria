'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Recursos', href: '#services' },
    { name: 'Preços', href: '#pricing' },
    { name: 'Lista de Espera', href: '#waitlist' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050a30]/90 backdrop-blur-md border-b border-[#99dfec]/15'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex items-center space-x-3'
          >
            <div className='w-28 h-28 flex items-center justify-center overflow-hidden'>
              <Image
                src='/logo.svg'
                alt='Onmarmoraria'
                className='h-full w-full object-contain'
                width={32}
                height={32}
              />
            </div>
            <div></div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='hidden md:flex items-center space-x-8'
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className='text-[#f4f6fc]/80 hover:text-[#f4f6fc] transition-colors duration-300 text-sm font-medium relative group'
              >
                {item.name}
                <motion.div
                  className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1ac8db] group-hover:w-full transition-all duration-300'
                  whileHover={{ width: '100%' }}
                />
              </motion.button>
            ))}
          </motion.nav>

          {/* Language Selector and CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='hidden md:flex items-center gap-4'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#waitlist')}
              className='bg-[#233dff] text-[#f4f6fc] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1f34d9] transition'
            >
              Garantir vaga
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden text-[#f4f6fc] p-2'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className='md:hidden overflow-hidden bg-[#050a30]/95 backdrop-blur-md border-t border-[#99dfec]/15'
        >
          <div className='py-4 space-y-4'>
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className='block w-full text-left text-[#f4f6fc]/80 hover:text-[#f4f6fc] transition-colors duration-300 py-2 px-4'
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
              onClick={() => scrollToSection('#waitlist')}
              className='block w-full bg-[#233dff] text-[#f4f6fc] px-6 py-3 rounded-full text-sm font-semibold mx-4 hover:bg-[#1f34d9] transition'
            >
              Garantir vaga
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default LandingHeader;
