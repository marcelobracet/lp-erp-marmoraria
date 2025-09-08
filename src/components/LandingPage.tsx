'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChartBarIcon,
  CubeIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  CheckIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      name: 'Gestão de Estoque',
      description:
        'Controle completo do seu estoque de mármores e granitos com alertas automáticos de baixo estoque e histórico detalhado.',
      icon: CubeIcon,
    },
    {
      name: 'Relatórios Avançados',
      description:
        'Relatórios detalhados de vendas, lucros, desempenho e análises para tomada de decisões estratégicas.',
      icon: ChartBarIcon,
    },
    {
      name: 'Gestão de Clientes',
      description:
        'Cadastro completo de clientes com histórico de compras, preferências e comunicação centralizada.',
      icon: UserGroupIcon,
    },
    {
      name: 'Orçamentos Digitais',
      description:
        'Crie orçamentos profissionais rapidamente com templates personalizáveis e envio automático por email.',
      icon: DocumentChartBarIcon,
    },
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      company: 'Mármores Silva',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote:
        'O sistema revolucionou nossa gestão. Aumentamos 40% nossa produtividade e reduzimos os erros de estoque.',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      company: 'Granitos Premium',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote:
        'Interface intuitiva e relatórios que realmente ajudam na tomada de decisões. Recomendo para todas as marmorarias.',
      rating: 5,
    },
    {
      name: 'João Mendes',
      company: 'Pedras Naturais JM',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote:
        'Suporte excepcional e sistema que se adapta perfeitamente ao nosso negócio. Vale cada centavo investido.',
      rating: 5,
    },
  ];

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 149',
      period: '/mês',
      description: 'Perfeito para marmorarias pequenas',
      features: [
        'Até 2 usuários',
        'Gestão de estoque básica',
        'Orçamentos ilimitados',
        'Relatórios básicos',
        'Suporte por email',
      ],
      popular: false,
    },
    {
      name: 'Profissional',
      price: 'R$ 299',
      period: '/mês',
      description: 'Ideal para empresas em crescimento',
      features: [
        'Até 10 usuários',
        'Gestão completa de estoque',
        'Orçamentos e contratos',
        'Relatórios avançados',
        'Suporte prioritário',
        'Integração com WhatsApp',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'R$ 599',
      period: '/mês',
      description: 'Para grandes operações',
      features: [
        'Usuários ilimitados',
        'Todos os recursos',
        'Relatórios personalizados',
        'API completa',
        'Suporte 24/7',
        'Treinamento incluso',
        'Customizações',
      ],
      popular: false,
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white shadow-sm sticky top-0 z-50'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
          <div className='flex lg:flex-1'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='text-2xl font-bold text-gray-900'>
                ERP Marmoraria
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className='h-6 w-6' />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className='hidden lg:flex lg:gap-x-12'>
            <Link
              href='#features'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600'
            >
              Funcionalidades
            </Link>
            <Link
              href='#testimonials'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600'
            >
              Depoimentos
            </Link>
            <Link
              href='#pricing'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600'
            >
              Preços
            </Link>
            <Link
              href='#contact'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600'
            >
              Contato
            </Link>
          </div>

          <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-4'>
            <Link
              href='/login'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600'
            >
              Entrar
            </Link>
            <Link
              href='/register'
              className='rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            >
              Teste Grátis
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className='lg:hidden'>
            <div className='fixed inset-0 z-50' />
            <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
              <div className='flex items-center justify-between'>
                <Link href='/' className='-m-1.5 p-1.5'>
                  <span className='text-xl font-bold text-gray-900'>
                    ERP Marmoraria
                  </span>
                </Link>
                <button
                  type='button'
                  className='-m-2.5 rounded-md p-2.5 text-gray-700'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className='h-6 w-6' />
                </button>
              </div>
              <div className='mt-6 flow-root'>
                <div className='-my-6 divide-y divide-gray-500/10'>
                  <div className='space-y-2 py-6'>
                    <Link
                      href='#features'
                      className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                    >
                      Funcionalidades
                    </Link>
                    <Link
                      href='#testimonials'
                      className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                    >
                      Depoimentos
                    </Link>
                    <Link
                      href='#pricing'
                      className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                    >
                      Preços
                    </Link>
                    <Link
                      href='#contact'
                      className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                    >
                      Contato
                    </Link>
                  </div>
                  <div className='py-6'>
                    <Link
                      href='/login'
                      className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
                    >
                      Entrar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero section */}
      <div className='relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32'>
        <Image
          src='https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'
          alt='Background image'
          layout='fill'
          objectFit='cover'
          className='absolute inset-0 -z-10 h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-gray-900 opacity-50' />
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
              ERP Marmoraria
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              O sistema de gestão completo para marmorarias e granitos. Controle
              seu estoque, clientes, orçamentos e muito mais.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/register'
                className='rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              >
                Teste Grátis
              </Link>
              <Link
                href='#features'
                className='text-sm font-semibold leading-6 text-white'
              >
                Saiba mais <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div id='features' className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Funcionalidades
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Descubra as principais funcionalidades do nosso sistema e como ele
              pode ajudar sua marmoraria a crescer.
            </p>
          </div>
          <div className='mt-20 max-w-lg sm:mx-auto md:max-w-none'>
            <div className='grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16'>
              {features.map(feature => (
                <div
                  key={feature.name}
                  className='relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row'
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white sm:shrink-0'>
                    <feature.icon className='h-8 w-8' aria-hidden='true' />
                  </div>
                  <div className='sm:min-w-0 sm:flex-1'>
                    <p className='text-lg font-semibold leading-8 text-gray-900'>
                      {feature.name}
                    </p>
                    <p className='mt-2 text-base leading-7 text-gray-600'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div id='testimonials' className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Depoimentos
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Veja o que nossos clientes estão dizendo sobre o ERP Marmoraria.
            </p>
          </div>
          <div className='mt-20 max-w-lg sm:mx-auto md:max-w-none'>
            <div className='grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-12 md:gap-y-16'>
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.name}
                  className='relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row'
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white sm:shrink-0'>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className='rounded-full'
                    />
                  </div>
                  <div className='sm:min-w-0 sm:flex-1'>
                    <p className='text-lg font-semibold leading-8 text-gray-900'>
                      {testimonial.name}
                    </p>
                    <p className='mt-2 text-base leading-7 text-gray-600'>
                      {testimonial.company}
                    </p>
                    <p className='mt-2 text-base leading-7 text-gray-600'>
                      {testimonial.quote}
                    </p>
                    <div className='mt-2 flex items-center'>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className='h-5 w-5 text-yellow-500'
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div id='pricing' className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Preços
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Escolha o plano que melhor se adapta às necessidades da sua
              marmoraria.
            </p>
          </div>
          <div className='mt-20 max-w-lg sm:mx-auto md:max-w-none'>
            <div className='grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-12 md:gap-y-16'>
              {plans.map(plan => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row ${plan.popular ? 'border-2 border-blue-600' : ''}`}
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white sm:shrink-0'>
                    <CheckIcon className='h-8 w-8' aria-hidden='true' />
                  </div>
                  <div className='sm:min-w-0 sm:flex-1'>
                    <p className='text-lg font-semibold leading-8 text-gray-900'>
                      {plan.name}
                    </p>
                    <p className='mt-2 text-base leading-7 text-gray-600'>
                      {plan.description}
                    </p>
                    <p className='mt-2 text-base leading-7 text-gray-600'>
                      {plan.price}
                      {plan.period}
                    </p>
                    <ul className='mt-2 text-base leading-7 text-gray-600'>
                      {plan.features.map((feature, i) => (
                        <li key={i} className='flex items-center'>
                          <CheckIcon
                            className='h-5 w-5 text-green-500'
                            aria-hidden='true'
                          />
                          <span className='ml-2'>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div id='contact' className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Contato
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Entre em contato conosco para mais informações ou para agendar uma
              demonstração.
            </p>
          </div>
          <div className='mt-20 max-w-lg sm:mx-auto md:max-w-none'>
            <div className='grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-12 md:gap-y-16'>
              <div className='relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white sm:shrink-0'>
                  <PhoneIcon className='h-8 w-8' aria-hidden='true' />
                </div>
                <div className='sm:min-w-0 sm:flex-1'>
                  <p className='text-lg font-semibold leading-8 text-gray-900'>
                    Telefone
                  </p>
                  <p className='mt-2 text-base leading-7 text-gray-600'>
                    (11) 1234-5678
                  </p>
                </div>
              </div>
              <div className='relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white sm:shrink-0'>
                  <EnvelopeIcon className='h-8 w-8' aria-hidden='true' />
                </div>
                <div className='sm:min-w-0 sm:flex-1'>
                  <p className='text-lg font-semibold leading-8 text-gray-900'>
                    Email
                  </p>
                  <p className='mt-2 text-base leading-7 text-gray-600'>
                    contato@erpmarmoraria.com
                  </p>
                </div>
              </div>
              <div className='relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white sm:shrink-0'>
                  <MapPinIcon className='h-8 w-8' aria-hidden='true' />
                </div>
                <div className='sm:min-w-0 sm:flex-1'>
                  <p className='text-lg font-semibold leading-8 text-gray-900'>
                    Endereço
                  </p>
                  <p className='mt-2 text-base leading-7 text-gray-600'>
                    Rua Exemplo, 123, São Paulo, SP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 py-12'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='text-2xl font-bold text-white'>
              ERP Marmoraria
            </Link>
            <p className='text-sm text-gray-400'>
              &copy; 2023 ERP Marmoraria. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
