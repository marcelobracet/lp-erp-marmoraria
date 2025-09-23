'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  useTheme,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { z } from 'zod';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import clientConfig from '@/config/client';

const configSchema = z.object({
  nomeFantasia: z.string().min(1, 'Nome fantasia é obrigatório'),
  razaoSocial: z.string().min(1, 'Razão social é obrigatória'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().email('E-mail inválido'),

  rua: z.string().min(1, 'Rua é obrigatória'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(1, 'Estado é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),

  corPrimaria: z.string().min(1, 'Cor primária é obrigatória'),
  corSecundaria: z.string().min(1, 'Cor secundária é obrigatória'),
});

type ConfigFormData = z.infer<typeof configSchema>;

export default function ConfiguracoesPage() {
  const theme = useTheme();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      nomeFantasia: clientConfig.company.name,
      razaoSocial: clientConfig.company.legalName,
      cnpj: clientConfig.company.cnpj,
      telefone: clientConfig.company.phone,
      email: clientConfig.company.email,
      rua: clientConfig.company.address.street,
      numero: clientConfig.company.address.number,
      complemento: clientConfig.company.address.complement || '',
      bairro: clientConfig.company.address.neighborhood,
      cidade: clientConfig.company.address.city,
      estado: clientConfig.company.address.state,
      cep: clientConfig.company.address.zipCode,
      corPrimaria: clientConfig.theme.primaryColor,
      corSecundaria: clientConfig.theme.secondaryColor,
    },
  });

  const watchedPrimaryColor = watch('corPrimaria');
  const watchedSecondaryColor = watch('corSecundaria');

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = e => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const onSubmit = async (data: ConfigFormData) => {
    try {
      // Simular salvamento

      await new Promise(resolve => setTimeout(resolve, 1000));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h4' gutterBottom>
            Configurações
          </Typography>

          {saveSuccess && (
            <Alert severity='success' sx={{ mb: 3 }}>
              Configurações salvas com sucesso!
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Informações da Empresa
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid>
                        <TextField
                          label='Nome Fantasia'
                          fullWidth
                          error={!!errors.nomeFantasia}
                          helperText={errors.nomeFantasia?.message}
                          {...register('nomeFantasia')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='Razão Social'
                          fullWidth
                          error={!!errors.razaoSocial}
                          helperText={errors.razaoSocial?.message}
                          {...register('razaoSocial')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='CNPJ'
                          fullWidth
                          error={!!errors.cnpj}
                          helperText={errors.cnpj?.message}
                          {...register('cnpj')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='Telefone'
                          fullWidth
                          error={!!errors.telefone}
                          helperText={errors.telefone?.message}
                          {...register('telefone')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='E-mail'
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          {...register('email')}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Endereço
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid>
                        <TextField
                          label='Rua'
                          fullWidth
                          error={!!errors.rua}
                          helperText={errors.rua?.message}
                          {...register('rua')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='Número'
                          fullWidth
                          error={!!errors.numero}
                          helperText={errors.numero?.message}
                          {...register('numero')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='Complemento'
                          fullWidth
                          {...register('complemento')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='Bairro'
                          fullWidth
                          error={!!errors.bairro}
                          helperText={errors.bairro?.message}
                          {...register('bairro')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='Cidade'
                          fullWidth
                          error={!!errors.cidade}
                          helperText={errors.cidade?.message}
                          {...register('cidade')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='Estado'
                          fullWidth
                          error={!!errors.estado}
                          helperText={errors.estado?.message}
                          {...register('estado')}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          label='CEP'
                          fullWidth
                          error={!!errors.cep}
                          helperText={errors.cep?.message}
                          {...register('cep')}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Personalização do Tema
                    </Typography>
                    <Grid container spacing={3}>
                      {/* Upload de Logo */}
                      <Grid>
                        <Typography variant='subtitle2' gutterBottom>
                          Logo da Empresa
                        </Typography>

                        {/* Preview do Logo */}
                        {logoPreview && (
                          <Box sx={{ mb: 2, textAlign: 'center' }}>
                            <img
                              src={logoPreview}
                              alt='Logo preview'
                              style={{
                                maxWidth: '200px',
                                maxHeight: '100px',
                                objectFit: 'contain',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '8px',
                              }}
                            />
                          </Box>
                        )}

                        {/* Botões de Upload */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant='outlined'
                            component='label'
                            startIcon={<UploadIcon />}
                            sx={{ flex: 1 }}
                          >
                            Upload Logo
                            <input
                              type='file'
                              hidden
                              accept='image/*'
                              onChange={handleLogoUpload}
                            />
                          </Button>

                          {logoFile && (
                            <IconButton
                              color='error'
                              onClick={handleRemoveLogo}
                              title='Remover logo'
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>

                        <Typography
                          variant='caption'
                          color='text.secondary'
                          sx={{ mt: 1, display: 'block' }}
                        >
                          Formatos aceitos: JPG, PNG, SVG. Tamanho máximo: 2MB
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                mt: 3,
              }}
            >
              <Button variant='outlined' type='button'>
                Cancelar
              </Button>
              <Button
                variant='contained'
                type='submit'
                startIcon={<SaveIcon />}
              >
                Salvar Configurações
              </Button>
            </Box>
          </form>
        </Box>
      </MainLayout>
    </ProtectedRoute>
  );
}
