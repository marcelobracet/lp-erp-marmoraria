'use client';

import { useState } from 'react';
import { Variants, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ContactForm = () => {
  const t = useTranslations('contact');
  const tv = useTranslations('validation');

  const contactSchema = z.object({
    name: z.string().min(2, tv('name.min')),
    email: z.string().email(tv('email.invalid')),
    phone: z.string().min(10, tv('phone.min')),
    company: z.string().min(2, tv('company.min')),
    message: z.string().min(10, tv('message.min')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Dados do formulário:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
      id='contact'
      className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20'
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
            variants={itemVariants as Variants}
            className='text-4xl md:text-6xl font-bold text-white mb-6'
          >
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              {t('title.line1')}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants as Variants}
            className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='max-w-4xl mx-auto'
        >
          <motion.div
            variants={itemVariants as Variants}
            className='bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl'
          >
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <motion.div
                  variants={itemVariants as Variants}
                  className='space-y-2'
                >
                  <label className='block text-sm font-medium text-gray-300'>
                    {t('form.fields.name.label')}
                  </label>
                  <input
                    {...register('name')}
                    type='text'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder={t('form.fields.name.placeholder')}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-red-400 text-sm flex items-center gap-1'
                    >
                      <AlertCircle size={16} />
                      {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants as Variants}
                  className='space-y-2'
                >
                  <label className='block text-sm font-medium text-gray-300'>
                    {t('form.fields.email.label')}
                  </label>
                  <input
                    {...register('email')}
                    type='email'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder={t('form.fields.email.placeholder')}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-red-400 text-sm flex items-center gap-1'
                    >
                      <AlertCircle size={16} />
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants as Variants}
                  className='space-y-2'
                >
                  <label className='block text-sm font-medium text-gray-300'>
                    {t('form.fields.phone.label')}
                  </label>
                  <input
                    {...register('phone')}
                    type='tel'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder={t('form.fields.phone.placeholder')}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-red-400 text-sm flex items-center gap-1'
                    >
                      <AlertCircle size={16} />
                      {errors.phone.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants as Variants}
                  className='space-y-2'
                >
                  <label className='block text-sm font-medium text-gray-300'>
                    {t('form.fields.company.label')}
                  </label>
                  <input
                    {...register('company')}
                    type='text'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder={t('form.fields.company.placeholder')}
                  />
                  {errors.company && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-red-400 text-sm flex items-center gap-1'
                    >
                      <AlertCircle size={16} />
                      {errors.company.message}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants as Variants}
                className='space-y-2'
              >
                <label className='block text-sm font-medium text-gray-300'>
                  {t('form.fields.message.label')}
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none'
                  placeholder={t('form.fields.message.placeholder')}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-red-400 text-sm flex items-center gap-1'
                  >
                    <AlertCircle size={16} />
                    {errors.message.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants as Variants} className='pt-4'>
                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3'
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                      />
                      {t('form.loading')}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t('form.button')}
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400'
                  >
                    <CheckCircle size={20} />
                    {t('form.success')}
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400'
                  >
                    <AlertCircle size={20} />
                    {t('form.error')}
                  </motion.div>
                )}
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={containerVariants as Variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-16 text-center'
        >
          <motion.div
            variants={itemVariants as Variants}
            className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'
          >
            {(
              t.raw('features') as Array<{
                icon: string;
                title: string;
                description: string;
              }>
            ).map((feature, index) => (
              <div key={index} className='space-y-3'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto'>
                  <span className='text-white font-bold text-xl'>
                    {feature.icon}
                  </span>
                </div>
                <h3 className='text-xl font-semibold text-white'>
                  {feature.title}
                </h3>
                <p className='text-gray-400'>{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
