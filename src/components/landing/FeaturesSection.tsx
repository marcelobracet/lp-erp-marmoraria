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

const FeaturesSection = () => {
  const features = [
    {
      icon: <Calculator size={32} />,
      title: 'Orçamentos Inteligentes',
      description: 'Crie orçamentos profissionais em minutos. Sistema calcula automaticamente custos de materiais, mão de obra e margem de lucro.',
      benefits: ['Cálculo automático de preços', 'Aprovação digital do cliente', 'Histórico completo de orçamentos'],
    },
    {
      icon: <Package size={32} />,
      title: 'Controle de Estoque',
      description: 'Controle preciso de mármores, granitos e materiais. Alertas de estoque baixo e rastreamento de movimentações.',
      benefits: ['Controle por tipo e cor', 'Alertas de reposição', 'Movimentação detalhada'],
    },
    {
      icon: <FileText size={32} />,
      title: 'Gestão de Pedidos',
      description: 'Acompanhe cada pedido desde a aprovação até a entrega. Status em tempo real e notificações automáticas.',
      benefits: ['Workflow personalizado', 'Status em tempo real', 'Notificações automáticas', 'Relatórios de produção'],
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Relatórios Financeiros',
      description: 'Dashboard completo com métricas de vendas, lucratividade e performance. Tome decisões baseadas em dados reais.',
      benefits: ['Dashboard em tempo real', 'Análise de lucratividade', 'Projeções de vendas', 'Comparativos mensais'],
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Acesso Mobile',
      description: 'Acesse seu sistema de qualquer lugar. Aplicativo responsivo que funciona perfeitamente em tablets e smartphones.',
      benefits: ['Interface responsiva', 'Sincronização automática', 'Notificações push'],
    },
    {
      icon: <Shield size={32} />,
      title: 'Segurança Total',
      description: 'Seus dados protegidos com criptografia de nível bancário. Backups automáticos e controle de acesso por usuário.',
      benefits: ['Criptografia SSL', 'Backups automáticos', 'Controle de usuários', 'Auditoria de ações'],
    },
    {
      icon: <Zap size={32} />,
      title: 'Integração Fácil',
      description: 'Conecte com ferramentas que você já usa. Importação de dados, APIs e integrações com sistemas contábeis.',
      benefits: ['Importação de dados', 'APIs abertas'],
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
    <section id='services' className='py-20 bg-[#050a30]'>
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
            <span className='text-[#1ac8db]'>Recursos Poderosos</span>
            <br />
            <span className='text-white'>para sua Marmoraria</span>
          </motion.h2>

          <motion.p
            variants={itemVariants as Variants}
            className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
          >
            Cada funcionalidade foi pensada especificamente para o dia a dia de uma marmoraria. Simples de usar, mas com toda a robustez que seu negócio precisa.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4'
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants as Variants}
              className='bg-[#f4f6fc]/5 rounded-2xl p-6 border border-[#99dfec]/15 hover:border-[#1ac8db]/40 transition-all duration-300 group cursor-pointer snap-start min-w-[85%] sm:min-w-[70%] md:min-w-0'
            >
              <div className='w-16 h-16 bg-[#0292b7]/20 border border-[#0292b7]/30 rounded-2xl flex items-center justify-center text-[#99dfec] mb-6 group-hover:scale-110 transition-transform duration-300'>
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
                    <div className='w-2 h-2 bg-[#1ac8db] rounded-full flex-shrink-0' />
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
            className='bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10'
          >
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Pronto para revolucionar sua marmoraria?
            </h3>
            <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
              Junte-se às primeiras marmorarias que vão transformar seus negócios com nosso sistema.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.querySelector('#waitlist');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className='bg-[#233dff] text-[#f4f6fc] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1f34d9] transition'
            >
              Garantir minha vaga
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
