'use client';

import { Variants, motion } from 'framer-motion';
import {
  Calculator,
  Users,
  Package,
  FileText,
  BarChart3,
  Smartphone,
  Shield,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const FeaturesSection = () => {
  const t = useTranslations('features');
  const features = [
    {
      icon: <Calculator size={32} />,
      title: t('items.quotes.title'),
      description: t('items.quotes.description'),
      benefits: t.raw('items.quotes.benefits') as string[],
    },
    {
      icon: <Users size={32} />,
      title: t('items.crm.title'),
      description: t('items.crm.description'),
      benefits: t.raw('items.crm.benefits') as string[],
    },
    {
      icon: <Package size={32} />,
      title: t('items.inventory.title'),
      description: t('items.inventory.description'),
      benefits: t.raw('items.inventory.benefits') as string[],
    },
    {
      icon: <FileText size={32} />,
      title: t('items.orders.title'),
      description: t('items.orders.description'),
      benefits: t.raw('items.orders.benefits') as string[],
    },
    {
      icon: <BarChart3 size={32} />,
      title: t('items.reports.title'),
      description: t('items.reports.description'),
      benefits: t.raw('items.reports.benefits') as string[],
    },
    {
      icon: <Smartphone size={32} />,
      title: t('items.mobile.title'),
      description: t('items.mobile.description'),
      benefits: t.raw('items.mobile.benefits') as string[],
    },
    {
      icon: <Shield size={32} />,
      title: t('items.security.title'),
      description: t('items.security.description'),
      benefits: t.raw('items.security.benefits') as string[],
    },
    {
      icon: <Zap size={32} />,
      title: t('items.integration.title'),
      description: t('items.integration.description'),
      benefits: t.raw('items.integration.benefits') as string[],
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
    <section id='services' className='py-20 bg-black'>
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
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              {t('title.line1')}
            </span>
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

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants as Variants}
              className='bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer'
            >
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300'>
                {feature.icon}
              </div>

              <h3 className='text-xl font-semibold text-white mb-4'>
                {feature.title}
              </h3>

              <p className='text-gray-400 leading-relaxed mb-6'>
                {feature.description}
              </p>

              <div className='space-y-3'>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0' />
                    <span className='text-gray-300 text-sm'>{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants as Variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-20 text-center'
        >
          <motion.div
            variants={itemVariants as Variants}
            className='bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl p-8 md:p-12 border border-white/10'
          >
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              {t('cta.title')}
            </h3>
            <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
              {t('cta.subtitle')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300'
            >
              {t('cta.button')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
