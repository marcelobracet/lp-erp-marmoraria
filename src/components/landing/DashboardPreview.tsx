'use client';

import { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';

const screens = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    src: '/assets/images/main-dashboard.png',
  },
  {
    id: 'quotes',
    label: 'Orçamentos',
    icon: '📋',
    src: '/assets/images/quotes.png',
  },
  {
    id: 'clients',
    label: 'Clientes',
    icon: '👥',
    src: '/assets/images/clientes.png',
  },
  {
    id: 'financial',
    label: 'Financeiro',
    icon: '💰',
    src: '/assets/images/dashboard1.png',
  },
  {
    id: 'stock',
    label: 'Estoque',
    icon: '📦',
    src: '/assets/images/dashboard2.png',
  },
];

const DashboardPreview = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [7, -7]), {
    stiffness: 180,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-7, 7]), {
    stiffness: 180,
    damping: 28,
  });
  const glareX = useTransform(mouseX, [-200, 200], [0, 100]);
  const glareY = useTransform(mouseY, [-160, 160], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className='relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 shadow-2xl select-none'
    >
      {/* Glare layer */}
      <motion.div
        className='pointer-events-none absolute inset-0 rounded-3xl overflow-hidden'
        style={{ opacity: 0.07 }}
      >
        <motion.div
          className='absolute inset-0'
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, white 0%, transparent 65%)`,
          }}
        />
      </motion.div>

      {/* Mac-style window bar */}
      <div className='flex items-center gap-1 px-1 pb-3'>
        {/* Traffic lights */}
        <div className='flex gap-1.5 mr-3 flex-shrink-0'>
          <div className='w-2.5 h-2.5 rounded-full bg-red-400/80' />
          <div className='w-2.5 h-2.5 rounded-full bg-yellow-400/80' />
          <div className='w-2.5 h-2.5 rounded-full bg-green-400/80' />
        </div>

        {/* Tabs */}
        <div className='flex items-center gap-1 overflow-x-auto no-scrollbar flex-1'>
          {screens.map((screen, i) => (
            <button
              key={screen.id}
              onClick={() => setActive(i)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all duration-200 ${
                active === i
                  ? 'text-white bg-white/15'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <span className='text-sm leading-none'>{screen.icon}</span>
              <span>{screen.label}</span>
              {active === i && (
                <motion.div
                  layoutId='activeTab'
                  className='absolute inset-0 rounded-lg bg-white/15 -z-10'
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main image area */}
      <div className='relative overflow-hidden rounded-2xl aspect-[16/10] bg-[#0a0f2e] ring-1 ring-white/5'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className='absolute inset-0'
          >
            <Image
              src={screens[active].src}
              alt={screens[active].label}
              fill
              className='object-cover object-top'
              priority
              sizes='(max-width: 1024px) 0px, 50vw'
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient */}
        <div className='absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none' />

        {/* Active screen label badge */}
        <motion.div
          key={`badge-${active}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className='absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full'
        >
          <span className='text-xs'>{screens[active].icon}</span>
          <span className='text-xs font-medium text-white/90'>
            {screens[active].label}
          </span>
        </motion.div>
      </div>

      {/* Thumbnail strip */}
      <div className='mt-3 grid grid-cols-5 gap-2'>
        {screens.map((screen, i) => (
          <motion.button
            key={screen.id}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`relative rounded-lg overflow-hidden aspect-[16/10] border-2 transition-all duration-200 ${
              active === i
                ? 'border-[#1ac8db]/70 shadow-[0_0_10px_rgba(26,200,219,0.3)]'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <Image
              src={screen.src}
              alt={screen.label}
              fill
              className='object-cover object-top'
              sizes='80px'
            />
            <motion.div
              className='absolute inset-0 bg-black transition-all duration-200'
              animate={{ opacity: active === i ? 0 : 0.4 }}
            />
            {active === i && (
              <motion.div
                layoutId='thumbIndicator'
                className='absolute inset-0 ring-2 ring-inset ring-[#1ac8db]/50 rounded-lg'
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
