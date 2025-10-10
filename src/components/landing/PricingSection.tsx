'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const PricingSection = () => {
  const t = useTranslations('pricing');

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
      color: 'from-blue-500 to-blue-600',
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
      color: 'from-purple-500 to-purple-600',
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
      color: 'from-orange-500 to-red-500',
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
    <section id='pricing' className='py-20 bg-black'>
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

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/10 scale-105'
                  : 'border-white/10 hover:border-blue-500/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <div className='bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold'>
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Plan Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center text-white mb-6`}
              >
                {plan.icon}
              </div>

              {/* Plan Name & Description */}
              <h3 className='text-2xl font-bold text-white mb-2'>
                {plan.name}
              </h3>
              <p className='text-gray-400 mb-6'>{plan.description}</p>

              {/* Price */}
              <div className='mb-8'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-5xl font-bold text-white'>
                    {plan.price}
                  </span>
                  <span className='text-gray-400'>{plan.period}</span>
                </div>
                <p className='text-gray-400 text-sm mt-2'>{t('trial')}</p>
              </div>

              {/* Features */}
              <div className='space-y-4 mb-8'>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className='flex items-center gap-3'>
                    <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                      <Check size={12} className='text-white' />
                    </div>
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/25'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee Section */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='text-center'
        >
          <motion.div
            variants={itemVariants}
            className='bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl p-8 md:p-12 border border-green-500/20'
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
                    <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'>
                      <Check size={24} className='text-white' />
                    </div>
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-20'
        >
          <motion.h3
            variants={itemVariants}
            className='text-3xl md:text-4xl font-bold text-white text-center mb-12'
          >
            {t('faq.title')}
          </motion.h3>

          <motion.div
            variants={containerVariants}
            className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
          >
            {(
              t.raw('faq.items') as Array<{ question: string; answer: string }>
            ).map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10'
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
