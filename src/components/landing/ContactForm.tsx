'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  company: z
    .string()
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
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
            variants={itemVariants}
            className='text-4xl md:text-6xl font-bold text-white mb-6'
          >
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              Entre em Contato
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'
          >
            Pronto para transformar sua marmoraria? Solicite uma demonstração
            personalizada e descubra como nosso sistema pode otimizar seus
            processos.
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
            variants={itemVariants}
            className='bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl'
          >
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <motion.div variants={itemVariants} className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>
                    Nome Completo *
                  </label>
                  <input
                    {...register('name')}
                    type='text'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder='Seu nome completo'
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

                <motion.div variants={itemVariants} className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>
                    E-mail *
                  </label>
                  <input
                    {...register('email')}
                    type='email'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder='seu@email.com'
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

                <motion.div variants={itemVariants} className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>
                    Telefone *
                  </label>
                  <input
                    {...register('phone')}
                    type='tel'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder='(11) 99999-9999'
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

                <motion.div variants={itemVariants} className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>
                    Nome da Empresa *
                  </label>
                  <input
                    {...register('company')}
                    type='text'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                    placeholder='Nome da sua marmoraria'
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

              <motion.div variants={itemVariants} className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Mensagem *
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none'
                  placeholder='Conte-nos sobre suas necessidades e como podemos ajudar...'
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

              <motion.div variants={itemVariants} className='pt-4'>
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
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Solicitar Demonstração
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
                    Mensagem enviada com sucesso! Entraremos em contato em
                    breve.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400'
                  >
                    <AlertCircle size={20} />
                    Erro ao enviar mensagem. Tente novamente.
                  </motion.div>
                )}
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-16 text-center'
        >
          <motion.div
            variants={itemVariants}
            className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'
          >
            <div className='space-y-3'>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto'>
                <span className='text-white font-bold text-xl'>⚡</span>
              </div>
              <h3 className='text-xl font-semibold text-white'>
                Implementação Rápida
              </h3>
              <p className='text-gray-400'>
                Sistema pronto para uso em até 48 horas após a contratação.
              </p>
            </div>

            <div className='space-y-3'>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto'>
                <span className='text-white font-bold text-xl'>🎯</span>
              </div>
              <h3 className='text-xl font-semibold text-white'>
                Personalizado
              </h3>
              <p className='text-gray-400'>
                Adaptado especificamente para o segmento de marmorarias.
              </p>
            </div>

            <div className='space-y-3'>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto'>
                <span className='text-white font-bold text-xl'>📱</span>
              </div>
              <h3 className='text-xl font-semibold text-white'>
                Multiplataforma
              </h3>
              <p className='text-gray-400'>
                Acesse de qualquer dispositivo, a qualquer hora.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
