export interface ClientConfig {
  company: {
    name: string;
    legalName: string;
    cnpj: string;
    phone: string;
    email: string;
    address: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    favicon: string;
  };
  system: {
    name: string;
    version: string;
    copyrightText: string;
  };
}

const clientConfig: ClientConfig = {
  company: {
    name: 'Marmoraria Exemplo',
    legalName: 'Marmoraria Exemplo LTDA',
    cnpj: '00.000.000/0000-00',
    phone: '(00) 0000-0000',
    email: 'contato@marmorariaexemplo.com.br',
    address: {
      street: 'Rua Exemplo',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '00000-000',
    },
  },
  theme: {
    primaryColor: '#1976d2',
    secondaryColor: '#9c27b0',
    logoUrl: '/api/placeholder/200/80',
    favicon: '/favicon.ico',
  },
  system: {
    name: 'Marmoraria Landing',
    version: '1.0.0',
    copyrightText: '© 2024 Marmoraria Landing. Todos os direitos reservados.',
  },
};

export default clientConfig;
