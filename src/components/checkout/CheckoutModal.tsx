'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2, CreditCard, ShieldCheck } from 'lucide-react';

const checkoutSchema = z.object({
  companyName: z.string().min(2, 'Nome da empresa deve ter ao menos 2 caracteres'),
  adminName: z.string().min(2, 'Seu nome deve ter ao menos 2 caracteres'),
  adminEmail: z.string().email('E-mail inválido'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  planName: string;
  planKey: string;
  planPrice: string;
  onClose: () => void;
}

export function CheckoutModal({
  planName,
  planKey,
  planPrice,
  onClose,
}: CheckoutModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Fecha com ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Bloqueia scroll do body enquanto modal aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  async function onSubmit(data: CheckoutFormData) {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planKey,
        companyName: data.companyName,
        adminName: data.adminName,
        adminEmail: data.adminEmail,
      }),
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      alert('Erro ao iniciar pagamento: ' + (json.error ?? 'Tente novamente.'));
      return;
    }

    // Redireciona para o checkout do Mercado Pago
    window.location.href = json.url;
  }

  return (
    <div
      className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'
      onClick={onClose}
    >
      <div
        className='bg-[#050a30] border border-[#1ac8db]/25 rounded-2xl w-full max-w-md shadow-2xl shadow-black/60'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-[#99dfec]/15'>
          <div>
            <h2 className='text-xl font-bold text-white'>Assinar plano</h2>
            <p className='text-[#1ac8db] font-semibold mt-0.5'>
              {planName} — {planPrice}/mês
            </p>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10'
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='p-6 flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1.5'>
              Nome da empresa *
            </label>
            <input
              {...register('companyName')}
              placeholder='Marmoraria Silva Ltda'
              className='w-full bg-white/5 border border-[#99dfec]/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1ac8db]/60 focus:ring-1 focus:ring-[#1ac8db]/30 transition-colors'
            />
            {errors.companyName && (
              <p className='text-red-400 text-xs mt-1'>{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1.5'>
              Seu nome *
            </label>
            <input
              {...register('adminName')}
              placeholder='João Silva'
              className='w-full bg-white/5 border border-[#99dfec]/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1ac8db]/60 focus:ring-1 focus:ring-[#1ac8db]/30 transition-colors'
            />
            {errors.adminName && (
              <p className='text-red-400 text-xs mt-1'>{errors.adminName.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1.5'>
              E-mail *
            </label>
            <input
              {...register('adminEmail')}
              type='email'
              placeholder='joao@marmorariasilva.com.br'
              className='w-full bg-white/5 border border-[#99dfec]/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1ac8db]/60 focus:ring-1 focus:ring-[#1ac8db]/30 transition-colors'
            />
            {errors.adminEmail && (
              <p className='text-red-400 text-xs mt-1'>{errors.adminEmail.message}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full flex items-center justify-center gap-2 bg-[#233dff] hover:bg-[#1f34d9] disabled:bg-[#233dff]/40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl mt-2 transition-colors'
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className='animate-spin' />
                Aguarde...
              </>
            ) : (
              <>
                <CreditCard size={18} />
                Ir para pagamento
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className='px-6 pb-5 flex items-center justify-center gap-2 text-gray-500 text-xs'>
          <ShieldCheck size={14} />
          <span>Pagamento seguro via Mercado Pago</span>
        </div>
      </div>
    </div>
  );
}
