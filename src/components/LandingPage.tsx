'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  Bars3Icon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { features } from './constants/features';
import { testimonials } from './constants/testimonials';
import { plans } from './constants/plans';
import { MenuMobile } from './MenuMobile';

const products = [
  { name: 'Granito', image: '/granito-1.jpg' },
  { name: 'Mármore', image: '/marmore-1.png' },
  { name: 'Dekton', image: '/dekton-1.avif' },
  { name: 'Quartzo', image: '/quartzo-1.jpeg' },
  { name: 'Granito Premium', image: '/granito-2.jpeg' },
  { name: 'Mármore Carrara', image: '/marmore-2.jpg' },
  { name: 'Dekton Ultra', image: '/dekton-2.avif' },
  { name: 'Quartzo Natural', image: '/quartzo-2.jpg' },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='min-h-screen bg-white'>
      <div className='fixed bottom-6 right-6 z-50'>
        <a
          href='https://wa.me/5511123456789'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group'
        >
          <ChatBubbleLeftRightIcon className='h-6 w-6 text-white' />
          <span className='absolute right-16 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
            Fale conosco
          </span>
        </a>
      </div>

      <header className='bg-white shadow-sm sticky top-0 z-50'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
          <div className='flex lg:flex-1'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='text-2xl font-bold text-gray-900'>
                ERP Marmoraria
              </span>
            </Link>
          </div>

          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className='h-6 w-6' />
            </button>
          </div>

          <div className='hidden lg:flex lg:gap-x-12'>
            <Link
              href='#products'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-slate-700'
            >
              Produtos
            </Link>
            <Link
              href='#features'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-slate-700'
            >
              Funcionalidades
            </Link>
            <Link
              href='#testimonials'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-slate-700'
            >
              Depoimentos
            </Link>
            <Link
              href='#pricing'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-slate-700'
            >
              Preços
            </Link>
            <Link
              href='#contact'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-slate-700'
            >
              Contato
            </Link>
          </div>

          <div className='hidden lg:flex lg:items-center lg:flex-1 lg:justify-end gap-x-4'>
            <Link
              href='/login'
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-slate-700'
            >
              Entrar
            </Link>
            {/* <Link
              href='/register'
              className='rounded-md bg-slate-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700'
            >
              Teste Grátis
            </Link> */}
          </div>
        </nav>

        {mobileMenuOpen && <MenuMobile setMobileMenuOpen={setMobileMenuOpen} />}
      </header>

      <div className='relative isolate overflow-hidden h-[calc(100vh-80px)] bg-gray-900 py-24 sm:py-32'>
        <Image
          src='/marmoraria-banner.webp'
          alt='Background image'
          layout='fill'
          objectFit='cover'
          className='absolute inset-0 -z-10 h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-gray-900 opacity-20' />
      </div>

      <div id='products' className='py-24 sm:py-32 bg-gray-50'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Conheça Alguns de nossos Produtos
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Trabalhamos com os melhores materiais do mercado para atender
              todas as suas necessidades.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
            {products.map((product, index) => (
              <div
                key={index}
                className='group relative overflow-hidden rounded-lg aspect-square bg-gray-200'
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                  onError={e => {
                    e.currentTarget.src = `https://source.unsplash.com/400x400/?stone,${product.name.toLowerCase()}`;
                  }}
                />

                {/* Overlay com animação slide-down */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                    <h3 className='text-white font-semibold text-lg'>
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Mobile: mostrar título sempre */}
                <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent md:hidden'>
                  <h3 className='text-white font-medium text-sm'>
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700 text-white sm:shrink-0'>
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
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white sm:shrink-0'>
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
                  className={`relative flex flex-col gap-6 sm:flex-row px-12 py-5 md:flex-col lg:flex-row ${plan.popular ? 'border-2 rounded-xl border-slate-700' : ''}`}
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 absolute -top-5 -left-5 text-white sm:shrink-0'>
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
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white sm:shrink-0'>
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
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white sm:shrink-0'>
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
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white sm:shrink-0'>
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
              &copy; 2025 ERP Marmoraria. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
