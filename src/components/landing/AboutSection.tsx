'use client';

import { useEffect, useState } from 'react';
import { Variants, motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';
import WaitlistForm from '@/components/landing/WaitlistForm';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const problems = [
  {
    icon: '📋',
    title: 'Orçamentos no papel ou no Excel',
    desc: 'Você perde tempo recriando orçamentos do zero, sem padrão, sem histórico e sem controle de versões.',
  },
  {
    icon: '💸',
    title: 'Financeiro no escuro',
    desc: 'Não sabe ao certo quanto entrou, quanto saiu e quanto ainda vai entrar. Decisões importantes tomadas no feeling.',
  },
  {
    icon: '🪨',
    title: 'Estoque descontrolado',
    desc: 'Chapas somem, sobras se acumulam e você só descobre o problema na hora da produção — quando já é tarde.',
  },
];

const benefits = [
  {
    icon: <Users size={20} />,
    title: 'Clientes e obras organizados',
    desc: 'Histórico completo de cada cliente, orçamentos e pedidos em um só lugar.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Financeiro em tempo real',
    desc: 'Receitas, despesas e fluxo de caixa atualizados automaticamente.',
  },
  {
    icon: <Clock size={20} />,
    title: 'Orçamentos em minutos',
    desc: 'Monte orçamentos profissionais com cálculo automático de material e mão de obra.',
  },
  {
    icon: <CheckCircle size={20} />,
    title: 'Estoque sempre preciso',
    desc: 'Controle de chapas, retalhos e insumos com alertas de reposição.',
  },
];

const TOTAL_SPOTS = 30;

const AboutSection = () => {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/waitlist-count')
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count))
      .catch(() => setWaitlistCount(null));
  }, []);

  const filled = waitlistCount ?? 0;
  const remaining = Math.max(TOTAL_SPOTS - filled, 0);
  const pct = Math.min(Math.round((filled / TOTAL_SPOTS) * 100), 100);

  return (
    <section id='about' className='bg-[#050a30]'>

      {/* ── PROBLEMA ── */}
      <div className='py-20 md:py-28'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div
              variants={itemVariants as Variants}
              className='mx-auto mb-16 max-w-2xl text-center'
            >
              <span className='mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/20'>
                O problema
              </span>
              <h2 className='mb-4 text-3xl md:text-4xl font-bold text-white'>
                Sua marmoraria cresce,{' '}
                <span className='text-[#1ac8db]'>a bagunça também.</span>
              </h2>
              <p className='text-gray-400 text-lg leading-relaxed'>
                A maioria das marmorarias ainda gerencia obras, clientes e
                financeiro em cadernos, planilhas e grupos de WhatsApp. Isso
                custa caro — mesmo sem você perceber.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className='grid gap-6 md:grid-cols-3'
            >
              {problems.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={itemVariants as Variants}
                  className='rounded-2xl border border-[#99dfec]/10 bg-white/5 p-8'
                >
                  <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl bg-amber-400/10'>
                    {icon}
                  </div>
                  <h3 className='mb-2 text-lg font-semibold text-white'>
                    {title}
                  </h3>
                  <p className='text-sm leading-relaxed text-gray-400'>{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── SOLUÇÃO / BENEFÍCIOS ── */}
      <div className='py-20 md:py-28 bg-white/[0.02] border-y border-white/5'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div
              variants={itemVariants as Variants}
              className='mx-auto mb-16 max-w-2xl text-center'
            >
              <span className='mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-[#1ac8db]/10 text-[#1ac8db] border border-[#1ac8db]/20'>
                A solução
              </span>
              <h2 className='mb-4 text-3xl md:text-4xl font-bold text-white'>
                Um ERP feito do zero{' '}
                <span className='text-[#1ac8db]'>para marmorarias.</span>
              </h2>
              <p className='text-gray-400 text-lg leading-relaxed'>
                Nada de sistema genérico adaptado. A Onmarmoraria foi construído
                entendendo cada etapa do processo de uma marmoraria — do
                orçamento à entrega.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'
            >
              {benefits.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={itemVariants as Variants}
                  className='rounded-2xl border border-[#99dfec]/15 bg-white/5 p-6 hover:border-[#1ac8db]/40 transition-all duration-300 group'
                >
                  <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1ac8db]/10 text-[#1ac8db] border border-[#1ac8db]/20 group-hover:scale-110 transition-transform duration-300'>
                    {icon}
                  </div>
                  <h3 className='mb-2 text-base font-semibold text-white'>
                    {title}
                  </h3>
                  <p className='text-sm leading-relaxed text-gray-400'>{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── WAITLIST ── */}
      <div id='waitlist' className='py-20 md:py-28'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='grid items-center gap-12 lg:grid-cols-2'
          >
            {/* Esquerda: copy */}
            <motion.div variants={itemVariants as Variants}>
              <span className='mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-[#1ac8db]/10 text-[#1ac8db] border border-[#1ac8db]/20'>
                <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#1ac8db]' />
                Acesso antecipado
              </span>
              <h2 className='mb-4 text-3xl md:text-4xl font-bold text-white'>
                Estamos selecionando as primeiras{' '}
                <span className='text-[#1ac8db]'>30 marmorarias</span>.
              </h2>
              <p className='mb-8 text-base md:text-lg leading-relaxed text-gray-400'>
                Se você for selecionado, terá acesso gratuito ao beta e ajudará
                a moldar o sistema que vai transformar a gestão da sua
                marmoraria.
              </p>

              <div className='flex flex-col gap-4 mb-8'>
                {[
                  { icon: '🎁', text: 'Acesso beta 100% gratuito' },
                  { icon: '🛠️', text: 'Você sugere e molda as funcionalidades' },
                  { icon: '🔒', text: 'Vagas limitadas a 30 marmorarias' },
                  { icon: '⚡', text: 'Suporte direto com o fundador' },
                ].map(({ icon, text }) => (
                  <div key={text} className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base bg-[#1ac8db]/10'>
                      {icon}
                    </div>
                    <span className='text-sm font-medium text-white'>{text}</span>
                  </div>
                ))}
              </div>

              {/* Contador de vagas */}
              <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>
                <div className='mb-3 flex items-center justify-between'>
                  <span className='text-xs font-semibold text-gray-400'>
                    Vagas preenchidas
                  </span>
                  <span className='text-xs font-bold text-[#1ac8db]'>
                    {waitlistCount === null ? '...' : `${filled} / ${TOTAL_SPOTS}`}
                  </span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-white/10'>
                  <div
                    className='h-full rounded-full transition-all duration-700'
                    style={{
                      width: waitlistCount === null ? '0%' : `${pct}%`,
                      background: 'linear-gradient(90deg, #0292b7, #1ac8db)',
                    }}
                  />
                </div>
                <p className='mt-2 text-xs text-gray-400'>
                  {waitlistCount === null ? (
                    <span className='opacity-50'>Carregando vagas...</span>
                  ) : remaining === 0 ? (
                    <strong className='text-white'>Vagas esgotadas!</strong>
                  ) : (
                    <>
                      Apenas{' '}
                      <strong className='text-white'>
                        {remaining} {remaining === 1 ? 'vaga restante' : 'vagas restantes'}
                      </strong>
                      .
                    </>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Direita: formulário */}
            <motion.div
              variants={itemVariants as Variants}
              className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8'
            >
              <p className='mb-1 text-lg font-bold text-white'>
                Quero uma vaga no beta
              </p>
              <p className='mb-6 text-sm text-gray-400'>
                Preencha abaixo e entraremos em contato pelo WhatsApp assim que
                sua vaga for confirmada.
              </p>
              <WaitlistForm />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div
        className='py-24 md:py-32 text-center'
        style={{ background: 'linear-gradient(135deg, #0292b7 0%, #1ac8db 100%)' }}
      >
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants as Variants}
              className='mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white'
            >
              Transforme a gestão da sua marmoraria de uma vez por todas.
            </motion.h2>
            <motion.p
              variants={itemVariants as Variants}
              className='mx-auto mb-10 max-w-xl text-base md:text-lg leading-relaxed text-white/80'
            >
              As vagas são limitadas. Garanta sua posição entre as primeiras 30
              marmorarias a moldar o sistema.
            </motion.p>
            <motion.a
              variants={itemVariants as Variants}
              href='#waitlist'
              className='inline-flex items-center justify-center rounded-xl px-10 py-4 text-base font-semibold transition-all hover:-translate-y-1'
              style={{
                background: '#050a30',
                color: '#1ac8db',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              Garantir minha vaga no beta
              <svg
                className='ml-2 h-4 w-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M5 12h14M12 5l7 7-7 7' />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
