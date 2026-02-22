'use client';

import { Variants, motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Skeleton from '@/components/ui/Skeleton';

const AboutSection = () => {
  const t = useTranslations('about');

  const features = [
    {
      icon: <Users size={24} />,
      title: t('features.clients.title'),
      description: t('features.clients.description'),
    },
    {
      icon: <TrendingUp size={24} />,
      title: t('features.financial.title'),
      description: t('features.financial.description'),
    },
    {
      icon: <Clock size={24} />,
      title: t('features.quotes.title'),
      description: t('features.quotes.description'),
    },
    {
      icon: <CheckCircle size={24} />,
      title: t('features.inventory.title'),
      description: t('features.inventory.description'),
    },
  ];

  const stats = [
    {
      number: t('stats.productivity.value'),
      label: t('stats.productivity.label'),
    },
    { number: t('stats.time.value'), label: t('stats.time.label') },
    {
      number: t('stats.satisfaction.value'),
      label: t('stats.satisfaction.label'),
    },
    {
      number: t('stats.availability.value'),
      label: t('stats.availability.label'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id='about' className='py-20 bg-[#050a30]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='text-center mb-16'
        >
          <motion.h2
            variants={itemVariants as Variants}
            className='text-4xl md:text-6xl font-bold text-white mb-6'
          >
            <span className='text-[#1ac8db]'>{t('title.line1')}</span>
            <br />
            <span className='text-white'>{t('title.line2')}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants as Variants}
            className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20'
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants as Variants}
              className='bg-[#f4f6fc]/5 backdrop-blur-md rounded-2xl p-6 border border-[#99dfec]/15 hover:border-[#1ac8db]/40 transition-all duration-300 group'
            >
              <div className='w-12 h-12 bg-[#0292b7]/20 rounded-xl flex items-center justify-center text-[#99dfec] mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#0292b7]/30'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold text-white mb-3'>
                {feature.title}
              </h3>
              <p className='text-gray-400 leading-relaxed'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants as Variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10'
        >
          <motion.div
            variants={itemVariants as Variants}
            className='text-center mb-12'
          >
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              {t('statsSection.title')}
            </h3>
            <p className='text-gray-300 text-lg'>
              {t('statsSection.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants as Variants}
            className='grid grid-cols-2 md:grid-cols-4 gap-8'
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants as Variants}
                className='text-center'
              >
                <div className='text-4xl md:text-5xl font-bold text-white mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-300'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Problem/Solution Section */}
        <motion.div
          variants={containerVariants as Variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
        >
          <motion.div variants={itemVariants as Variants}>
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              {t('problems.title')}{' '}
              <span className='text-[#99dfec]'>
                {t('problems.titleHighlight')}
              </span>
            </h3>
            <div className='space-y-4 mb-8'>
              {(t.raw('problems.items') as string[]).map((item, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-[#f4f6fc]/5 border border-[#99dfec]/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white/80 text-sm'>•</span>
                  </div>
                  <p className='text-gray-300'>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants as Variants} className='space-y-6'>
            <div>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-sm font-semibold text-white'>
                  Sua marmoraria
                </p>
                <p className='text-xs text-white/60'>imagem (skeleton)</p>
              </div>
              <Skeleton className='aspect-[4/3] w-full rounded-3xl' />
            </div>

            <div className='bg-white/5 rounded-3xl p-8 border border-white/10'>
              <h4 className='text-2xl font-bold text-white mb-6'>
                {t('solutions.title')}
              </h4>
              <div className='space-y-4'>
                {(
                  t.raw('solutions.items') as Array<{
                    title: string;
                    description: string;
                  }>
                ).map((item, index) => (
                  <div key={index} className='flex items-start gap-3'>
                    <div className='w-6 h-6 bg-[#1ac8db]/15 border border-[#1ac8db]/25 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <span className='text-[#99dfec] text-sm'>✓</span>
                    </div>
                    <p className='text-gray-300'>
                      <strong className='text-white'>{item.title}</strong>{' '}
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
