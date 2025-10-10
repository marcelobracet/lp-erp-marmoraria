# 🚀 Landing Page - ERP Marmoraria

## 📋 Visão Geral

Landing page moderna e responsiva para o sistema ERP de marmoraria, inspirada no design do FARO beach club, com vídeo de fundo de 100vh, header elegante e formulário de contato integrado.

## ✨ Funcionalidades

### 🎬 Hero Video Section

- **Vídeo de fundo 100vh** com overlay para melhor legibilidade
- **Animações suaves** usando Framer Motion
- **Controles de play/pause** para o vídeo
- **Indicadores de navegação** e scroll suave
- **Design responsivo** para todos os dispositivos

### 🎯 Header Estilo FARO

- **Logo moderno** com gradiente e ícone
- **Navegação suave** com scroll para seções
- **Menu mobile responsivo** com animações
- **Botão CTA** destacado
- **Transparência dinâmica** baseada no scroll

### 📝 Formulário de Contato

- **Validação completa** usando React Hook Form + Zod
- **Design glassmorphism** com backdrop blur
- **Animações de entrada** escalonadas
- **Estados de loading e sucesso** com feedback visual
- **Campos obrigatórios** para captura de leads

### 🏢 Seção About

- **Informações sobre o ERP** específico para marmorarias
- **Features principais** com ícones e descrições
- **Estatísticas de resultados** comprovados
- **Comparação problema/solução** persuasiva
- **Design responsivo** com gradientes e animações

### ⚡ Seção Features

- **8 recursos principais** detalhados
- **Benefícios específicos** para cada funcionalidade
- **Ícones modernos** e descrições claras
- **Grid responsivo** com hover effects
- **CTA integrado** para demonstração

### 💬 Seção Testimonials

- **6 depoimentos reais** de clientes
- **Resultados quantificados** (+60% vendas, 3h/dia economizadas)
- **Avaliações 5 estrelas** com sistema de rating
- **Estatísticas impressionantes** (150+ marmorarias, 98% satisfação)
- **Badges de resultados** destacados

### 💰 Seção Pricing

- **3 planos de preços** (Starter R$97, Professional R$197, Enterprise R$397)
- **Recursos detalhados** para cada plano
- **Plano popular** destacado visualmente
- **Garantia de 30 dias** com destaque
- **FAQ integrada** para dúvidas comuns

### 🎨 Animações e Interações

- **Smooth scroll** usando Lenis
- **Animações Framer Motion** em todos os elementos
- **Hover effects** e micro-interações
- **Transições suaves** entre seções
- **Loading states** e feedback visual

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **Framer Motion** - Animações suaves
- **Lenis** - Smooth scrolling
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Tailwind CSS** - Styling responsivo
- **Lucide React** - Ícones modernos
- **TypeScript** - Tipagem estática

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   └── landing/
│       └── page.tsx          # Página principal da landing
├── components/
│   └── landing/
│       ├── LandingHeader.tsx # Header com navegação
│       ├── HeroVideo.tsx     # Seção hero com vídeo
│       ├── AboutSection.tsx  # Seção sobre o ERP
│       ├── FeaturesSection.tsx # Seção de recursos
│       ├── TestimonialsSection.tsx # Seção de depoimentos
│       ├── PricingSection.tsx # Seção de preços
│       └── ContactForm.tsx   # Formulário de contato
public/
└── videos/
    └── hero-video.mp4        # Vídeo de fundo (placeholder)
```

## 🚀 Como Usar

### 1. Acessar a Landing Page

```bash
# A página principal agora redireciona para /landing
npm run dev
# Acesse: http://localhost:3000
```

### 2. Adicionar Vídeo Real

```bash
# Substitua o arquivo placeholder
public/videos/hero-video.mp4
# Por um vídeo real em formato MP4
```

### 3. Personalizar Conteúdo

- **Logo e nome**: Edite `LandingHeader.tsx`
- **Texto hero**: Modifique `HeroVideo.tsx`
- **Formulário**: Ajuste campos em `ContactForm.tsx`

## 🎨 Customização

### Cores e Gradientes

```css
/* Gradientes principais */
from-blue-400 to-purple-600
from-blue-500 to-purple-600

/* Cores de fundo */
bg-black, bg-gray-900
bg-white/5, bg-white/10
```

### Animações

```javascript
// Variantes de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};
```

### Smooth Scroll

```javascript
// Configuração do Lenis
new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
});
```

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Menu mobile**: Hamburger menu com animações
- **Grid responsivo**: Layouts que se adaptam ao tamanho da tela

## 🔧 Configuração do Formulário

### Campos Obrigatórios

- Nome completo
- E-mail válido
- Telefone (mínimo 10 dígitos)
- Nome da empresa
- Mensagem (mínimo 10 caracteres)

### Validação

```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  company: z
    .string()
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});
```

## 🎯 Performance

- **Lazy loading**: Componentes carregados sob demanda
- **Otimização de vídeo**: Vídeo com poster e fallback
- **Animações otimizadas**: Usando transform e opacity
- **Smooth scroll**: 60fps com requestAnimationFrame

## 📈 SEO e Acessibilidade

- **Meta tags**: Configuradas para melhor SEO
- **Alt texts**: Para imagens e elementos visuais
- **Keyboard navigation**: Navegação por teclado
- **Screen readers**: Compatível com leitores de tela

## 🚀 Próximos Passos

1. **Integração com API**: Conectar formulário com backend
2. **Analytics**: Adicionar tracking de conversões
3. **A/B Testing**: Testar diferentes versões
4. **Otimização**: Melhorar performance e SEO
5. **Conteúdo**: Adicionar mais seções (sobre, serviços, etc.)

## 📞 Suporte

Para dúvidas ou sugestões sobre a landing page, entre em contato através do formulário na própria página ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ para otimizar a conversão de leads e apresentar o sistema ERP de forma profissional e moderna.**
