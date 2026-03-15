'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import DashboardPreview from '@/components/landing/DashboardPreview';

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const heroVideoUrl =
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/videos/hero-video.mp4';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(console.error);
    }
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.play().catch(console.error);
      }
    }
  };

  const scrollToNext = () => {
    const heroSection = document.querySelector<HTMLElement>('#home');
    const fallback = document.querySelector<HTMLElement>('#about');

    if (!heroSection) {
      fallback?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const allSections = Array.from(
      document.querySelectorAll<HTMLElement>('section')
    );
    const heroIndex = allSections.findIndex(section => section.id === 'home');
    const nextSection = heroIndex >= 0 ? allSections[heroIndex + 1] : null;

    (nextSection || fallback)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id='home' className='relative h-screen w-full overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 z-0'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover pointer-events-none'
          muted={isMuted}
          loop
          playsInline
          autoPlay
          preload='metadata'
          controls={false}
          disablePictureInPicture
          controlsList='nodownload noplaybackrate noremoteplayback'
        >
          <source src={heroVideoUrl} type='video/mp4' />
          {/* Fallback para navegadores que não suportam vídeo */}
        </video>

        {/* Overlay para melhorar legibilidade do texto */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#050a30]/70 via-[#050a30]/55 to-[#050a30]/80' />
      </div>

      {/* Content */}
      <div className='relative z-10 h-full flex flex-col justify-center px-6'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='max-w-7xl mx-auto w-full'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            <div className='text-left'>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]'
              >
                <span className='block'>Sistema de</span>
                <span className='block text-[#1ac8db]'>Gestão Completo</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className='text-lg md:text-xl text-zinc-200 mb-8 max-w-xl leading-relaxed'
              >
                Gerencie sua marmoraria com eficiência. Controle de clientes, orçamentos, produtos e muito mais em uma única plataforma.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className='flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center'
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToNext()}
                  className='bg-[#233dff] text-[#f4f6fc] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1f34d9] transition'
                >
                  Começar Agora
                </motion.button>
              </motion.div>

              <p className='mt-6 text-sm text-white/60 max-w-xl'>
                Dica: o vídeo inicia mudo (autoplay). Você pode ativar o áudio
                quando quiser.
              </p>
            </div>

            <div className='hidden lg:block'>
              <DashboardPreview />
            </div>
          </div>
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
