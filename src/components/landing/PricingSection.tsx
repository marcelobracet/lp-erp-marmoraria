'use client';

import { Variants, motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { openWhatsApp } from '@/lib/whatsapp';

const DEFAULT_PHONE_E164 = '5521992927712';
const DEFAULT_SALES_NAME = 'Celso';

const PricingSection = () => {
  const t = useTranslations('pricing');

  const phoneE164 =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE_E164 || DEFAULT_PHONE_E164;
  const salesName = process.env.NEXT_PUBLIC_SALES_NAME || DEFAULT_SALES_NAME;

  const plans = [
    {
      name: t('plans.starter.name'),
      icon: <Zap size={24} />,
      price: t('plans.starter.price'),
      period: t('plans.starter.period'),
      description: t('plans.starter.description'),
      features: t.raw('plans.starter.features') as string[],
      cta: t('plans.starter.cta'),
      popular: false,
      color: 'bg-[#f4f6fc]/5 border-[#99dfec]/15 text-[#f4f6fc]',
    },
    {
      name: t('plans.professional.name'),
      icon: <Star size={24} />,
      price: t('plans.professional.price'),
      period: t('plans.professional.period'),
      description: t('plans.professional.description'),
      features: t.raw('plans.professional.features') as string[],
      cta: t('plans.professional.cta'),
      popular: true,
      color: 'bg-[#1ac8db]/15 border-[#1ac8db]/25 text-[#99dfec]',
    },
    {
      name: t('plans.enterprise.name'),
      icon: <Crown size={24} />,
      price: t('plans.enterprise.price'),
      period: t('plans.enterprise.period'),
      description: t('plans.enterprise.description'),
      features: t.raw('plans.enterprise.features') as string[],
      cta: t('plans.enterprise.cta'),
      popular: false,
      color: 'bg-[#f4f6fc]/5 border-[#99dfec]/15 text-[#f4f6fc]',
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
    <section id='pricing' className='py-20 bg-[#050a30]'>
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

        <motion.div
          variants={containerVariants as Variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch'
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants as Variants}
              className={`relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border transition-all duration-300 flex flex-col h-full ${
                plan.popular
                  ? 'border-[#1ac8db]/35 shadow-2xl shadow-black/40'
                  : 'border-[#99dfec]/15 hover:border-[#1ac8db]/30'
              }`}
            >
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <div className='bg-[#1ac8db] text-[#050a30] px-6 py-2 rounded-full text-sm font-semibold'>
                    Mais Popular
                  </div>
                </div>
              )}

              <div
                className={`w-16 h-16 ${plan.color} rounded-2xl flex items-center justify-center mb-6 border`}
              >
                {plan.icon}
              </div>

              <h3 className='text-2xl font-bold text-white mb-2'>
                {plan.name}
              </h3>
              <p className='text-gray-400 mb-6'>{plan.description}</p>

              <div className='mb-8'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-5xl font-bold text-white'>
                    {plan.price}
                  </span>
                  <span className='text-gray-400'>{plan.period}</span>
                </div>
                <p className='text-gray-400 text-sm mt-2'>{t('trial')}</p>
              </div>

              <div className='space-y-4 mb-8'>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className='flex items-center gap-3'>
                    <div className='w-5 h-5 bg-[#0292b7] rounded-full flex items-center justify-center flex-shrink-0'>
                      <Check size={12} className='text-white' />
                    </div>
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const message = `Oi ${salesName}, vim pelo site e estou querendo saber mais sobre o plano ${plan.name}.`;
                  openWhatsApp({ phoneE164, message });
                }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 mt-auto ${
                  plan.popular
                    ? 'bg-[#233dff] text-[#f4f6fc] hover:bg-[#1f34d9]'
                    : 'bg-[#f4f6fc]/10 text-[#f4f6fc] hover:bg-[#f4f6fc]/15'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants as Variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='text-center'
        >
          <motion.div
            variants={itemVariants as Variants}
            className='bg-[#f4f6fc]/5 rounded-3xl p-8 md:p-12 border border-[#99dfec]/15'
          >
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              {t('guarantee.title')}
            </h3>
            <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto'>
              {t('guarantee.description')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              {(t.raw('guarantee.features') as string[]).map(
                (feature, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-[#0292b7] rounded-full flex items-center justify-center'>
                      <Check size={24} className='text-white' />
                    </div>
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants as Variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-20'
        >
          <motion.h3
            variants={itemVariants as Variants}
            className='text-3xl md:text-4xl font-bold text-white text-center mb-12'
          >
            {t('faq.title')}
          </motion.h3>

          <motion.div
            variants={containerVariants as Variants}
            className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
          >
            {(
              t.raw('faq.items') as Array<{ question: string; answer: string }>
            ).map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants as Variants}
                className='bg-[#f4f6fc]/5 backdrop-blur-md rounded-2xl p-6 border border-[#99dfec]/15'
              >
                <h4 className='text-lg font-semibold text-white mb-3'>
                  {faq.question}
                </h4>
                <p className='text-gray-400'>{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
