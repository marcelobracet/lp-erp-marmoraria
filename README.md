# ERP Marmoraria

Sistema ERP white-label para marmorarias, desenvolvido com Next.js, Material UI e React Hook Form.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Material UI (MUI)
- React Hook Form
- Zod
- MUI X (Charts e Data Grid)

## Estrutura do Projeto

```
src/
  ├── app/              # Rotas e páginas Next.js
  ├── components/       # Componentes reutilizáveis
  ├── config/          # Configurações (tema, cliente)
  ├── features/        # Funcionalidades específicas
  ├── hooks/           # Hooks customizados
  ├── services/        # Serviços e APIs
  ├── types/           # Tipos e interfaces
  └── utils/           # Funções utilitárias
```

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo `.env.example` para `.env.local` e configure as variáveis
4. Execute o projeto em desenvolvimento:
   ```bash
   npm run dev
   ```

## Personalização White-label

O sistema é projetado para ser facilmente personalizado para diferentes clientes:

1. Configure as informações do cliente em `src/config/client.ts`
2. Ajuste o tema em `src/config/theme.ts`
3. Atualize logos e assets em `public/`

## Funcionalidades

- Login e Autenticação
- Dashboard com KPIs
- Gestão de Clientes
- Orçamentos
- Catálogo de Produtos
- Configurações da Empresa

## Contribuição

1. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
2. Commit suas mudanças: `git commit -m 'feat: Adiciona nova feature'`
3. Push para a branch: `git push origin feature/nome-da-feature`
4. Abra um Pull Request

## Licença

Este projeto está sob a licença [MIT](LICENSE).
