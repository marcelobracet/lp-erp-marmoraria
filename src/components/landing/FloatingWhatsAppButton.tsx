'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { openWhatsApp } from '@/lib/whatsapp';

const DEFAULT_PHONE_E164 = '5521992927712';
const DEFAULT_SALES_NAME = 'Celso';

type PlanOption = {
  planName: string;
  label: string;
};

export default function FloatingWhatsAppButton() {
  const t = useTranslations('pricing');
  const [isOpen, setIsOpen] = useState(false);

  const phoneE164 =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE_E164 || DEFAULT_PHONE_E164;
  const salesName = process.env.NEXT_PUBLIC_SALES_NAME || DEFAULT_SALES_NAME;

  const planOptions = useMemo<PlanOption[]>(
    () => [
      { planName: t('plans.starter.name'), label: t('plans.starter.name') },
      {
        planName: t('plans.professional.name'),
        label: t('plans.professional.name'),
      },
      {
        planName: t('plans.enterprise.name'),
        label: t('plans.enterprise.name'),
      },
    ],
    [t]
  );

  const handlePlanClick = (planName: string) => {
    const message = `Oi ${salesName}! Cheguei até vocês pelo site e fiquei interessado no plano ${planName}. Pode me contar mais sobre como ele funciona?`;
    openWhatsApp({ phoneE164, message });
    setIsOpen(false);
  };

  const handleGenericClick = () => {
    const message = `Oi ${salesName}, vim pelo site e gostaria de falar sobre contratar o sistema.`;
    openWhatsApp({ phoneE164, message });
    setIsOpen(false);
  };

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className='w-[min(320px,calc(100vw-48px))] rounded-2xl border border-[#99dfec]/15 bg-[#050a30]/85 backdrop-blur-xl p-3 shadow-2xl'
            role='dialog'
            aria-label='Contato via WhatsApp'
          >
            <div className='px-2 pt-1 pb-2'>
              <p className='text-sm font-semibold text-white'>
                Falar no WhatsApp
              </p>
              <p className='text-xs text-gray-300'>
                Escolha um plano para enviar a mensagem.
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              {planOptions.map(option => (
                <button
                  key={option.planName}
                  onClick={() => handlePlanClick(option.planName)}
                  className='w-full rounded-xl border border-[#99dfec]/15 bg-[#f4f6fc]/5 px-3 py-3 text-left text-sm text-white hover:bg-[#f4f6fc]/10 transition'
                >
                  <span className='flex items-center justify-between gap-3'>
                    <span className='truncate'>{option.label}</span>
                    <ArrowUpRight className='h-4 w-4 text-gray-300' />
                  </span>
                </button>
              ))}

              <button
                onClick={handleGenericClick}
                className='w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-3 text-left text-sm font-semibold text-white hover:shadow-xl hover:shadow-green-500/20 transition'
              >
                <span className='flex items-center justify-between gap-3'>
                  <span className='truncate'>
                    Quero contratar (sem escolher plano)
                  </span>
                  <ArrowUpRight className='h-4 w-4 text-white' />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(v => !v)}
        className='group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl shadow-green-500/20 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400'
        aria-label={isOpen ? 'Fechar WhatsApp' : 'Abrir WhatsApp'}
      >
        {isOpen ? (
          <X className='h-6 w-6' />
        ) : (
          <MessageCircle className='h-6 w-6' />
        )}
      </button>
    </div>
  );
}
