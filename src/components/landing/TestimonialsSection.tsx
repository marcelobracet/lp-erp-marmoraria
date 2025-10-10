'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Carlos Silva',
      company: 'Marmoraria Silva & Filhos',
      location: 'São Paulo, SP',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'O sistema revolucionou nossa marmoraria! Antes perdíamos tempo com planilhas, agora temos tudo organizado. Nossas vendas aumentaram 60% no primeiro mês.',
      results: '+60% vendas',
    },
    {
      name: 'Maria Santos',
      company: 'Granitos do Sul',
      location: 'Porto Alegre, RS',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'A facilidade para criar orçamentos é impressionante. O cliente aprova na hora e já fica tudo registrado. Economizamos 3 horas por dia só nisso.',
      results: '3h/dia economizadas',
    },
    {
      name: 'João Oliveira',
      company: 'Mármores Premium',
      location: 'Rio de Janeiro, RJ',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'O controle de estoque mudou tudo. Agora sabemos exatamente o que temos, o que está acabando e conseguimos negociar melhor com fornecedores.',
      results: '30% economia em estoque',
    },
    {
      name: 'Ana Costa',
      company: 'Design em Pedra',
      location: 'Belo Horizonte, MG',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'Os relatórios financeiros são fantásticos. Finalmente conseguimos ver onde está o lucro e tomar decisões baseadas em dados reais.',
      results: '15% aumento no lucro',
    },
    {
      name: 'Roberto Lima',
      company: 'Lima Marmoraria',
      location: 'Salvador, BA',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'A implementação foi super rápida e o suporte é excelente. Em uma semana já estávamos usando o sistema 100%. Recomendo para qualquer marmoraria.',
      results: '1 semana implementação',
    },
    {
      name: 'Fernanda Rocha',
      company: 'Rocha Granitos',
      location: 'Curitiba, PR',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'O sistema mobile é perfeito. Posso acompanhar tudo da obra, criar orçamentos no local e o cliente aprova na hora. Isso fez toda diferença.',
      results: '+40% conversão',
    },
  ];

  const stats = [
    { number: '150+', label: 'Marmorarias ativas' },
    { number: '98%', label: 'Satisfação dos clientes' },
    { number: 'R$ 2.5M+', label: 'Vendas geradas' },
    { number: '4.9/5', label: 'Avaliação média' },
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
    <section
      id='gallery'
      className='py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800'
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
              Resultados Reais
            </span>
            <br />
            <span className='text-white'>de Nossos Clientes</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
          >
            Não somos nós que falamos sobre os resultados. São nossos clientes
            que mostram como o sistema transformou seus negócios.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10'
            >
              <div className='text-3xl md:text-4xl font-bold text-white mb-2'>
                {stat.number}
              </div>
              <div className='text-gray-300 text-sm'>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300'
            >
              {/* Quote Icon */}
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4'>
                <Quote size={20} className='text-white' />
              </div>

              {/* Rating */}
              <div className='flex items-center gap-1 mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className='text-yellow-400 fill-current'
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className='text-gray-300 leading-relaxed mb-6'>
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className='inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold mb-4'>
                {testimonial.results}
              </div>

              {/* Author Info */}
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold'>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className='text-white font-semibold'>
                    {testimonial.name}
                  </div>
                  <div className='text-gray-400 text-sm'>
                    {testimonial.company}
                  </div>
                  <div className='text-gray-500 text-xs'>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mt-16 text-center'
        >
          <motion.div
            variants={itemVariants}
            className='bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl p-8 md:p-12 border border-white/10'
          >
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Seja o próximo caso de sucesso!
            </h3>
            <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
              Junte-se a centenas de marmorarias que já transformaram seus
              negócios. Sua história de sucesso pode começar hoje.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300'
            >
              Começar Minha Transformação
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
