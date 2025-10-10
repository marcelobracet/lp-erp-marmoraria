'use client';

import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
    <section
      id='about'
      className='py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='text-center mb-16'
        >
          <motion.h2
            variants={itemVariants}
            className='text-4xl md:text-6xl font-bold text-white mb-6'
          >
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              {t('title.line1')}
            </span>
            <br />
            <span className='text-white'>{t('title.line2')}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
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
              variants={itemVariants}
              className='bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group'
            >
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300'>
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
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl p-8 md:p-12 border border-white/10'
        >
          <motion.div variants={itemVariants} className='text-center mb-12'>
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              {t('statsSection.title')}
            </h3>
            <p className='text-gray-300 text-lg'>
              {t('statsSection.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className='grid grid-cols-2 md:grid-cols-4 gap-8'
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
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
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
        >
          <motion.div variants={itemVariants}>
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              {t('problems.title')}{' '}
              <span className='text-red-400'>
                {t('problems.titleHighlight')}
              </span>
            </h3>
            <div className='space-y-4 mb-8'>
              {(t.raw('problems.items') as string[]).map((item, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm'>✗</span>
                  </div>
                  <p className='text-gray-300'>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className='bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl p-8 border border-blue-500/30'>
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
                    <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <span className='text-white text-sm'>✓</span>
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
