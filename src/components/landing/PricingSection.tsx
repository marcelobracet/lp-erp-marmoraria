'use client';

import { Variants, motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';

function scrollToWaitlist() {
  const el = document.querySelector('#waitlist');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const PricingSection = () => {
  const plans = [
    {
      slug: 'essencial',
      name: 'Essencial',
      icon: <Zap size={24} />,
      description: 'Indicativo para marmorarias pequenas em início de digitalização',
      features: [
        'Gestão de clientes e produtos',
        'Orçamentos e status de obra',
        'Dashboard com indicadores',
        'Upload de logo e imagens (GCS)',
        'Multi-usuário (conforme evolução do produto)',
      ],
      cta: 'Entrar na lista de interesse',
      popular: false,
      color: 'bg-[#f4f6fc]/5 border-[#99dfec]/15 text-[#f4f6fc]',
    },
    {
      slug: 'profissional',
      name: 'Profissional',
      icon: <Star size={24} />,
      description: 'Indicativo para operações maiores, com mais usuários e relatórios',
      features: [
        'Tudo do Essencial',
        'Mais usuários por empresa (planejado)',
        'Relatórios avançados (planejado)',
        'Personalização de marca (planejado)',
        'Suporte prioritário (planejado)',
      ],
      cta: 'Quero ser avisado',
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
            <span className='text-[#1ac8db]'>Planos previstos</span>
            <br />
            <span className='text-white'>para cada porte de marmoraria</span>
          </motion.h2>

          <motion.p
            variants={itemVariants as Variants}
            className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
          >
            Nesta fase do projeto (TCC / MVP), o acesso ao sistema é aberto para
            demonstração, sem cobrança e sem bloqueio por plano. A diferenciação
            abaixo descreve a evolução futura por tamanho de operação.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16'
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.slug}
              variants={itemVariants as Variants}
              className={`relative rounded-3xl p-8 border backdrop-blur-md flex flex-col ${plan.color}`}
            >
              {plan.popular ? (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-[#233dff] text-white text-xs font-semibold px-4 py-1.5 rounded-full'>
                    Mais completo (futuro)
                  </span>
                </div>
              ) : null}

              <div className='w-12 h-12 rounded-2xl bg-[#0292b7]/20 border border-[#0292b7]/30 flex items-center justify-center text-[#99dfec] mb-6'>
                {plan.icon}
              </div>

              <h3 className='text-2xl font-bold text-white mb-2'>{plan.name}</h3>
              <p className='text-gray-400 mb-8'>{plan.description}</p>

              <div className='space-y-4 mb-8'>
                {plan.features.map((feature) => (
                  <div key={feature} className='flex items-center gap-3'>
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
                type='button'
                onClick={scrollToWaitlist}
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
          variants={containerVariants}
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
              Cadastre interesse na lista de espera
            </h3>
            <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto'>
              Preencha o formulário da landing page para receber contato. Os dados
              são salvos no banco PostgreSQL do projeto via API.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='button'
              onClick={scrollToWaitlist}
              className='px-8 py-4 rounded-xl font-semibold text-lg bg-[#233dff] text-white hover:bg-[#1f34d9]'
            >
              Ir para o formulário
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
