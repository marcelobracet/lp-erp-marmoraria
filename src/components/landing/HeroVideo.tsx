'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useTranslations('hero');

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToNext = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='home' className='relative h-screen w-full overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 z-0'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover'
          muted
          loop
          playsInline
          poster='/api/placeholder/1920/1080'
        >
          <source src='/videos/hero-video.mp4' type='video/mp4' />
          {/* Fallback para navegadores que não suportam vídeo */}
        </video>

        {/* Overlay para melhorar legibilidade do texto */}
        <div className='absolute inset-0 bg-black/40' />
      </div>

      {/* Content */}
      <div className='relative z-10 h-full flex flex-col justify-center items-center text-center px-4'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='max-w-4xl mx-auto'
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight'
          >
            <span className='block'>{t('title.line1')}</span>
            <span className='block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
              {t('title.line2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className='text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed'
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToNext()}
              className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300'
            >
              {t('buttons.start')}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className='flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300'
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              <span>{isPlaying ? t('buttons.pause') : t('buttons.play')}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToNext}
          className='text-white/60 hover:text-white transition-colors duration-300'
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>

      {/* Navigation Dots */}
      <div className='absolute left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block'>
        <div className='flex flex-col space-y-3'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className='w-3 h-3 bg-white rounded-full'
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className='w-2 h-2 bg-white/40 rounded-full'
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            className='w-2 h-2 bg-white/40 rounded-full'
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className='w-2 h-2 bg-white/40 rounded-full'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
