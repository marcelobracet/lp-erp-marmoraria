# 🏢 ERP Marmoraria - Sistema White-Label

Sistema ERP completo para marmorarias com arquitetura white-label, permitindo fácil customização para diferentes clientes.

## 🚀 Tecnologias

- **Frontend**: Next.js 15 + React 18 + TypeScript
- **UI Framework**: Material-UI (MUI) v6
- **Formulários**: React Hook Form + Zod
- **Gráficos**: MUI X Charts
- **HTTP Client**: Axios
- **Autenticação**: JWT
- **Formatação**: Prettier + ESLint

## 📋 Funcionalidades

### ✅ Implementadas

- ✅ **Autenticação JWT** com refresh token automático
- ✅ **Dashboard** com KPIs e gráficos responsivos
- ✅ **Gestão de Clientes** (CRUD completo)
- ✅ **Gestão de Produtos** (CRUD completo)
- ✅ **Gestão de Orçamentos** (formulário multi-etapas)
- ✅ **Configurações** (empresa e tema)
- ✅ **Layout Responsivo** (mobile-first)
- ✅ **White-label** (customização por cliente)
- ✅ **Validação de Formulários** (Zod)
- ✅ **Rotas Protegidas** com controle de permissões

### 🔄 Em Desenvolvimento

- 🔄 Integração com backend real
- 🔄 Relatórios avançados
- 🔄 Notificações em tempo real
- 🔄 Backup automático

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd erp-marmoraria
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# Environment
NEXT_PUBLIC_ENVIRONMENT=development
```

### 4. Execute o projeto

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

## 🔐 Autenticação

O sistema utiliza autenticação JWT com as seguintes funcionalidades:

- **Login/Logout** automático
- **Refresh Token** automático
- **Rotas Protegidas** com verificação de permissões
- **Persistência** de sessão
- **Interceptadores** para requisições HTTP

### Credenciais de Teste

```
Email: admin@erp.com
Senha: admin123
```

## 🎨 White-Label

### Configuração por Cliente

Edite o arquivo `src/config/client.ts` para customizar:

```typescript
const clientConfig: ClientConfig = {
  company: {
    name: 'Marmoraria Exemplo',
    legalName: 'Marmoraria Exemplo Ltda',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 99999-9999',
    email: 'contato@marmoraria.com',
    address: {
      street: 'Rua das Marmorarias',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
  },
  theme: {
    primaryColor: '#1976d2',
    secondaryColor: '#9c27b0',
    logoUrl: '/api/placeholder/200/80',
    favicon: '/favicon.ico',
  },
  system: {
    name: 'ERP Marmoraria',
    version: '1.0.0',
    copyrightText: '© 2024 ERP Marmoraria. Todos os direitos reservados.',
  },
};
```

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Mobile**: < 600px
- **Tablet**: 600px - 1200px
- **Desktop**: > 1200px

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint

# Formatação de código
npm run format

# Verificar formatação
npm run format:check
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js 13+
│   ├── dashboard/         # Dashboard principal
│   ├── clientes/          # Gestão de clientes
│   ├── produtos/          # Gestão de produtos
│   ├── orcamentos/        # Gestão de orçamentos
│   ├── configuracoes/     # Configurações do sistema
│   └── login/             # Página de login
├── components/            # Componentes reutilizáveis
│   ├── auth/             # Componentes de autenticação
│   ├── layout/           # Layout principal
│   └── providers/        # Providers (Theme, etc.)
├── contexts/             # Contextos React
│   └── AuthContext.tsx   # Contexto de autenticação
├── features/             # Funcionalidades específicas
│   └── auth/            # Schemas de autenticação
├── services/             # Serviços e APIs
│   └── api.ts           # Cliente Axios
├── types/               # Tipos TypeScript
│   └── index.ts         # Interfaces principais
└── config/              # Configurações
    ├── client.ts        # Configuração white-label
    └── theme.ts         # Tema Material-UI
```

## 🔒 Segurança

- **JWT Tokens** com expiração
- **Refresh Token** automático
- **Interceptadores** para requisições
- **Validação** de formulários
- **Rotas Protegidas** com verificação de permissões

## 🎯 Funcionalidades Principais

### Dashboard

- KPIs em tempo real
- Gráficos interativos
- Layout responsivo
- Cards com hover effects

### Gestão de Clientes

- Listagem com busca
- Formulário completo
- Validação de dados
- CRUD completo

### Gestão de Produtos

- Catálogo de produtos
- Categorização
- Preços e estoque
- Status ativo/inativo

### Orçamentos

- Formulário multi-etapas
- Seleção de produtos
- Cálculo automático
- Histórico completo

### Configurações

- Dados da empresa
- Customização de tema
- Logo e cores
- Informações de contato

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
vercel --prod
```

### Outros

```bash
npm run build
npm run start
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para marmorarias**
