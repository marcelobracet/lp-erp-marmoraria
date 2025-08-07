'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MainLayout from '@/components/layout/MainLayout';
import clientConfig from '@/config/client';

const settingsSchema = z.object({
  company: z.object({
    name: z.string().min(1, 'Nome da empresa é obrigatório'),
    legalName: z.string().min(1, 'Razão social é obrigatória'),
    cnpj: z.string().min(1, 'CNPJ é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.string().email('E-mail inválido'),
    address: z.object({
      street: z.string().min(1, 'Rua é obrigatória'),
      number: z.string().min(1, 'Número é obrigatório'),
      complement: z.string().optional(),
      neighborhood: z.string().min(1, 'Bairro é obrigatório'),
      city: z.string().min(1, 'Cidade é obrigatória'),
      state: z.string().min(1, 'Estado é obrigatório'),
      zipCode: z.string().min(1, 'CEP é obrigatório'),
    }),
  }),
  theme: z.object({
    primaryColor: z.string().min(1, 'Cor primária é obrigatória'),
    secondaryColor: z.string().min(1, 'Cor secundária é obrigatória'),
    logoUrl: z.string().optional(),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      company: {
        name: clientConfig.company.name,
        legalName: clientConfig.company.legalName,
        cnpj: clientConfig.company.cnpj,
        phone: clientConfig.company.phone,
        email: clientConfig.company.email,
        address: {
          street: clientConfig.company.address.street,
          number: clientConfig.company.address.number,
          complement: clientConfig.company.address.complement,
          neighborhood: clientConfig.company.address.neighborhood,
          city: clientConfig.company.address.city,
          state: clientConfig.company.address.state,
          zipCode: clientConfig.company.address.zipCode,
        },
      },
      theme: {
        primaryColor: clientConfig.theme.primaryColor,
        secondaryColor: clientConfig.theme.secondaryColor,
        logoUrl: clientConfig.theme.logoUrl,
      },
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    // TODO: Implementar salvamento das configurações
    console.log('Configurações salvas:', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h4' gutterBottom>
          Configurações
        </Typography>

        {saved && (
          <Alert severity='success' sx={{ mb: 3 }}>
            Configurações salvas com sucesso!
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Informações da Empresa */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    Informações da Empresa
                  </Typography>
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <TextField
                      label='Nome Fantasia'
                      fullWidth
                      error={!!errors.company?.name}
                      helperText={errors.company?.name?.message}
                      {...register('company.name')}
                    />
                    <TextField
                      label='Razão Social'
                      fullWidth
                      error={!!errors.company?.legalName}
                      helperText={errors.company?.legalName?.message}
                      {...register('company.legalName')}
                    />
                    <TextField
                      label='CNPJ'
                      fullWidth
                      error={!!errors.company?.cnpj}
                      helperText={errors.company?.cnpj?.message}
                      {...register('company.cnpj')}
                    />
                    <TextField
                      label='Telefone'
                      fullWidth
                      error={!!errors.company?.phone}
                      helperText={errors.company?.phone?.message}
                      {...register('company.phone')}
                    />
                    <TextField
                      label='E-mail'
                      fullWidth
                      error={!!errors.company?.email}
                      helperText={errors.company?.email?.message}
                      {...register('company.email')}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Endereço */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    Endereço
                  </Typography>
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <TextField
                      label='Rua'
                      fullWidth
                      error={!!errors.company?.address?.street}
                      helperText={errors.company?.address?.street?.message}
                      {...register('company.address.street')}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <TextField
                          label='Número'
                          fullWidth
                          error={!!errors.company?.address?.number}
                          helperText={errors.company?.address?.number?.message}
                          {...register('company.address.number')}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label='Complemento'
                          fullWidth
                          {...register('company.address.complement')}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      label='Bairro'
                      fullWidth
                      error={!!errors.company?.address?.neighborhood}
                      helperText={
                        errors.company?.address?.neighborhood?.message
                      }
                      {...register('company.address.neighborhood')}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <TextField
                          label='Cidade'
                          fullWidth
                          error={!!errors.company?.address?.city}
                          helperText={errors.company?.address?.city?.message}
                          {...register('company.address.city')}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label='Estado'
                          fullWidth
                          error={!!errors.company?.address?.state}
                          helperText={errors.company?.address?.state?.message}
                          {...register('company.address.state')}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      label='CEP'
                      fullWidth
                      error={!!errors.company?.address?.zipCode}
                      helperText={errors.company?.address?.zipCode?.message}
                      {...register('company.address.zipCode')}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Configurações de Tema */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    Personalização do Tema
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                  >
                    <TextField
                      label='Cor Primária'
                      type='color'
                      fullWidth
                      error={!!errors.theme?.primaryColor}
                      helperText={errors.theme?.primaryColor?.message}
                      {...register('theme.primaryColor')}
                      InputProps={{
                        style: { height: '56px' },
                      }}
                    />
                    <TextField
                      label='Cor Secundária'
                      type='color'
                      fullWidth
                      error={!!errors.theme?.secondaryColor}
                      helperText={errors.theme?.secondaryColor?.message}
                      {...register('theme.secondaryColor')}
                      InputProps={{
                        style: { height: '56px' },
                      }}
                    />
                    <TextField
                      label='URL do Logo'
                      fullWidth
                      error={!!errors.theme?.logoUrl}
                      helperText={errors.theme?.logoUrl?.message}
                      {...register('theme.logoUrl')}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Botões de Ação */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant='outlined' size='large'>
                  Cancelar
                </Button>
                <Button type='submit' variant='contained' size='large'>
                  Salvar Configurações
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </MainLayout>
  );
}
