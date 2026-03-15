'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// ─── Máscara WhatsApp ─────────────────────────────────────────
const maskWhatsApp = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

// ─── Schema de validação ───────────────────────────────────────
const waitlistSchema = z.object({
  name: z
    .string()
    .min(2, 'Informe seu nome completo')
    .max(100, 'Nome muito longo'),
  whatsapp: z
    .string()
    .min(10, 'Informe um WhatsApp válido')
    .max(20, 'WhatsApp inválido')
    .regex(
      /^[\d\s()\-+]+$/,
      'Use apenas números, espaços, parênteses e hífens',
    ),
  state: z
    .string()
    .length(2, 'Informe a sigla do estado (ex: SP)')
    .toUpperCase(),
  company_size: z.string().min(1, 'Selecione o tamanho da equipe'),
  quotes_avg: z.string().min(1, 'Selecione a média de orçamentos'),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

// ─── Componente ────────────────────────────────────────────────
const WaitlistForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsappDisplay, setWhatsappDisplay] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('waitlist').insert([
      {
        name: data.name,
        whatsapp: data.whatsapp,
        state: data.state.toUpperCase(),
        company_size: data.company_size,
        quotes_avg: data.quotes_avg,
      },
    ]);

    if (error) {
      // Erro de duplicata (mesmo WhatsApp já cadastrado)
      if (error.code === '23505') {
        setErrorMsg('Este WhatsApp já está na lista de espera. 🎉');
      } else {
        setErrorMsg('Ocorreu um erro. Tente novamente em instantes.');
      }
      setStatus('error');
      return;
    }

    setStatus('success');
    reset();
    setWhatsappDisplay('');
  };

  // ── Estado de sucesso ──────────────────────────────────────
  if (status === 'success') {
    return (
      <div className='flex flex-col items-center text-center gap-4 py-4'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#1ac8db]/15 text-3xl border border-[#1ac8db]/25'>
          🎉
        </div>
        <div>
          <p className='text-lg font-bold text-white mb-1'>
            Você está na lista!
          </p>
          <p className='text-sm text-gray-400 leading-relaxed'>
            Entraremos em contato pelo WhatsApp assim que sua vaga for
            confirmada. Fique de olho!
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className='mt-2 text-xs text-gray-500 underline underline-offset-2 hover:text-gray-300 transition-colors'
        >
          Cadastrar outro número
        </button>
      </div>
    );
  }

  // ── Formulário ─────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' noValidate>
      {/* Nome */}
      <div>
        <label className='block text-xs font-semibold text-gray-400 mb-1.5'>
          Seu nome
        </label>
        <input
          {...register('name')}
          type='text'
          placeholder='João Silva'
          autoComplete='name'
          className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#1ac8db]/50 focus:outline-none focus:ring-1 focus:ring-[#1ac8db]/30 transition-all'
        />
        {errors.name && (
          <p className='mt-1 text-xs text-red-400'>{errors.name.message}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label className='block text-xs font-semibold text-gray-400 mb-1.5'>
          WhatsApp
        </label>
        <input
          {...register('whatsapp')}
          type='tel'
          placeholder='(11) 99999-9999'
          autoComplete='tel'
          value={whatsappDisplay}
          onChange={(e) => {
            const masked = maskWhatsApp(e.target.value);
            setWhatsappDisplay(masked);
            // passa apenas dígitos para o react-hook-form validar
            e.target.value = masked;
            register('whatsapp').onChange(e);
          }}
          className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#1ac8db]/50 focus:outline-none focus:ring-1 focus:ring-[#1ac8db]/30 transition-all'
        />
        {errors.whatsapp && (
          <p className='mt-1 text-xs text-red-400'>{errors.whatsapp.message}</p>
        )}
      </div>

      {/* Estado + Colaboradores lado a lado */}
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label className='block text-xs font-semibold text-gray-400 mb-1.5'>
            Estado
          </label>
          <input
            {...register('state')}
            type='text'
            placeholder='SP'
            maxLength={2}
            className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#1ac8db]/50 focus:outline-none focus:ring-1 focus:ring-[#1ac8db]/30 transition-all uppercase'
          />
          {errors.state && (
            <p className='mt-1 text-xs text-red-400'>{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className='block text-xs font-semibold text-gray-400 mb-1.5'>
            Colaboradores
          </label>
          <div className='relative'>
            <select
              {...register('company_size')}
              className='w-full appearance-none rounded-xl border border-white/10 bg-[#050a30] px-4 py-3 pr-10 text-sm text-gray-300 focus:border-[#1ac8db]/50 focus:outline-none focus:ring-1 focus:ring-[#1ac8db]/30 transition-all'
            >
              <option value=''>Qtd...</option>
              <option value='1'>Só eu</option>
              <option value='2-5'>2 a 5</option>
              <option value='6-15'>6 a 15</option>
              <option value='15+'>+15</option>
            </select>
            <svg className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M6 9l6 6 6-6'/></svg>
          </div>
          {errors.company_size && (
            <p className='mt-1 text-xs text-red-400'>{errors.company_size.message}</p>
          )}
        </div>
      </div>

      {/* Orçamentos por mês */}
      <div>
        <label className='block text-xs font-semibold text-gray-400 mb-1.5'>
          Quantos orçamentos você faz por mês?
        </label>
        <div className='relative'>
          <select
            {...register('quotes_avg')}
            className='w-full appearance-none rounded-xl border border-white/10 bg-[#050a30] px-4 py-3 pr-10 text-sm text-gray-300 focus:border-[#1ac8db]/50 focus:outline-none focus:ring-1 focus:ring-[#1ac8db]/30 transition-all'
          >
            <option value=''>Selecione...</option>
            <option value='1-5'>1 a 5 orçamentos</option>
            <option value='6-20'>6 a 20 orçamentos</option>
            <option value='21-50'>21 a 50 orçamentos</option>
            <option value='50+'>Mais de 50</option>
          </select>
          <svg className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M6 9l6 6 6-6'/></svg>
        </div>
        {errors.quotes_avg && (
          <p className='mt-1 text-xs text-red-400'>{errors.quotes_avg.message}</p>
        )}
      </div>

      {/* Erro global */}
      {status === 'error' && (
        <p className='rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-xs text-red-400'>
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type='submit'
        disabled={status === 'loading'}
        className='mt-2 w-full rounded-xl px-6 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0'
        style={{ background: 'linear-gradient(135deg, #0292b7, #1ac8db)' }}
      >
        {status === 'loading' ? (
          <span className='flex items-center justify-center gap-2'>
            <svg
              className='h-4 w-4 animate-spin'
              viewBox='0 0 24 24'
              fill='none'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v8H4z'
              />
            </svg>
            Enviando...
          </span>
        ) : (
          'Garantir minha vaga →'
        )}
      </button>

      <p className='text-center text-xs text-gray-500'>
        Sem spam. Entraremos em contato só quando sua vaga for confirmada.
      </p>
    </form>
  );
};

export default WaitlistForm;
