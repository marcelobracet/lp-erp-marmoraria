'use client';

import { Variants, motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TestimonialsSection = () => {
  const t = useTranslations('testimonials');

  const testimonials = (
    t.raw('items') as Array<{
      name: string;
      company: string;
      location: string;
      text: string;
      result: string;
    }>
  ).map(item => ({
    ...item,
    image: '/api/placeholder/80/80',
    rating: 5,
    results: item.result,
  }));

  const stats = [
    { number: t('stats.active.value'), label: t('stats.active.label') },
    {
      number: t('stats.satisfaction.value'),
      label: t('stats.satisfaction.label'),
    },
    { number: t('stats.sales.value'), label: t('stats.sales.label') },
    { number: t('stats.rating.value'), label: t('stats.rating.label') },
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
    <section id='gallery' className='py-20 bg-[#050a30]'>
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

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants as Variants}
              className='text-center bg-[#f4f6fc]/5 backdrop-blur-md rounded-2xl p-6 border border-[#99dfec]/15'
            >
              <div className='text-3xl md:text-4xl font-bold text-white mb-2'>
                {stat.number}
              </div>
              <div className='text-gray-300 text-sm'>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3'
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants as Variants}
              className='bg-[#f4f6fc]/5 backdrop-blur-md rounded-2xl p-6 border border-[#99dfec]/15 hover:border-[#1ac8db]/40 transition-all duration-300 snap-start min-w-[85%] sm:min-w-[70%] md:min-w-0'
            >
              {/* Quote Icon */}
              <div className='w-12 h-12 bg-[#0292b7]/20 border border-[#0292b7]/30 rounded-xl flex items-center justify-center mb-4'>
                <Quote size={20} className='text-white' />
              </div>

              {/* Rating */}
              <div className='flex items-center gap-1 mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className='text-[#99dfec] fill-current'
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className='text-gray-300 leading-relaxed mb-6'>
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className='inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold mb-4'>
                {testimonial.results}
              </div>

              {/* Author Info */}
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-[#f4f6fc]/5 border border-[#99dfec]/15 rounded-full flex items-center justify-center text-white font-bold'>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className='text-white font-semibold'>
                    {testimonial.name}
                  </div>
                  <div className='text-gray-400 text-sm'>
                    {testimonial.company}
                  </div>
                  <div className='text-gray-500 text-xs'>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-16 text-center'
        >
          <motion.div
            variants={itemVariants as Variants}
            className='bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10'
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
              className='bg-[#233dff] text-[#f4f6fc] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1f34d9] transition'
            >
              {t('cta.button')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
