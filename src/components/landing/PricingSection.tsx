'use client';

import { useState } from 'react';
import { Variants, motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';

const PricingSection = () => {
  const [checkoutPlan, setCheckoutPlan] = useState<{
    name: string;
    slug: string;
    price: string;
  } | null>(null);

  const plans = [
    {
      slug: 'essencial',
      name: 'Essencial',
      icon: <Zap size={24} />,
      price: 'R$ 297',
      period: '/mês',
      description: 'Perfeito para marmorarias que estão começando a crescer',
      features: [
        'Até 2 usuários',
        'Relatórios básicos',
        'PDF padrão',
        'Histórico até 6 meses',
        'Suporte por email',
        'Orçamentos ilimitados',
      ],
      cta: 'Começar Agora',
      urgencyLabel: '⚡ Apenas 12 vagas restantes',
      popular: false,
      color: 'bg-[#f4f6fc]/5 border-[#99dfec]/15 text-[#f4f6fc]',
    },
    {
      slug: 'profissional',
      name: 'Profissional',
      icon: <Star size={24} />,
      price: 'R$ 397',
      period: '/mês',
      description: 'Ideal para marmorarias em crescimento acelerado',
      features: [
        'Até 10 usuários',
        'Relatórios avançados',
        'Exportação com branding personalizado',
        'Histórico ilimitado',
        'Suporte prioritário',
      ],
      cta: 'Quero o Profissional',
      urgencyLabel: '🔥 Oferta por tempo limitado',
      popular: true,
      color: 'bg-[#1ac8db]/15 border-[#1ac8db]/25 text-[#99dfec]',
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
    <>
      <section id='pricing' className='py-20 bg-[#050a30] vwo-pricing-section'>
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
              <span className='text-[#1ac8db]'>Preço Especial</span>
              <br />
              <span className='text-white'>Para os Primeiros Clientes</span>
            </motion.h2>

            <motion.p
              variants={itemVariants as Variants}
              className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
            >
              Vagas limitadas para a fase inicial. Garanta agora o preço de
              lançamento antes que as vagas acabem.
            </motion.p>

            <motion.div
              variants={itemVariants as Variants}
              className='mt-6 inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2.5 vwo-urgency-banner'
            >
              <span className='relative flex h-2 w-2 flex-shrink-0'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-amber-400'></span>
              </span>
              <span className='text-amber-300 text-sm font-semibold'>
                🔒 Preço de lançamento · Apenas 50 vagas nesta condição
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants as Variants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch max-w-4xl mx-auto'
          >
            {plans.map(plan => (
              <motion.div
                key={plan.slug}
                variants={itemVariants as Variants}
                className={`relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border transition-all duration-300 flex flex-col h-full vwo-plan-card vwo-plan-card-${plan.slug} ${
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
                  <p className='text-gray-400 text-sm mt-2'>
                    Teste gratuito por 14 dias
                  </p>
                  <div className='mt-3 inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full px-3 py-1 vwo-urgency-badge'>
                    <span className='w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0'></span>
                    <span className='text-amber-400 text-xs font-medium'>
                      {plan.urgencyLabel}
                    </span>
                  </div>
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
                  onClick={() =>
                    setCheckoutPlan({
                      name: plan.name,
                      slug: plan.slug,
                      price: plan.price,
                    })
                  }
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 mt-auto vwo-cta-pricing vwo-cta-pricing-${plan.slug} ${
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
                Garantia de 30 Dias
              </h3>
              <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto'>
                Se em 30 dias você não estiver completamente satisfeito com os
                resultados, devolvemos 100% do seu dinheiro. Sem perguntas, sem
                burocracias.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                {[
                  'Sem compromisso',
                  'Suporte completo',
                  'Cancele quando quiser',
                ].map((feature, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-[#0292b7] rounded-full flex items-center justify-center'>
                      <Check size={24} className='text-white' />
                    </div>
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                ))}
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
              Perguntas Frequentes
            </motion.h3>

            <motion.div
              variants={containerVariants as Variants}
              className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
            >
              {(
                [
                  {
                    question: 'Posso cancelar a qualquer momento?',
                    answer:
                      'Sim! Não há fidelidade. Você pode cancelar quando quiser, sem taxas ou multas.',
                  },
                  {
                    question: 'Meus dados estão seguros?',
                    answer:
                      'Absolutamente. Usamos criptografia de nível bancário e fazemos backups diários.',
                  },
                  {
                    question: 'Preciso de conhecimento técnico?',
                    answer:
                      'Não! O sistema foi feito para ser intuitivo. Além disso, oferecemos treinamento completo.',
                  },
                  {
                    question: 'Funciona offline?',
                    answer:
                      'O sistema funciona online, mas você pode visualizar dados básicos mesmo sem internet.',
                  },
                ] as Array<{ question: string; answer: string }>
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

      {checkoutPlan && (
        <CheckoutModal
          planName={checkoutPlan.name}
          planKey={checkoutPlan.slug}
          planPrice={checkoutPlan.price}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </>
  );
};

export default PricingSection;
