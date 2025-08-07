'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  LoginFormData,
  loginSchema,
} from '@/features/auth/schemas/login.schema';
import clientConfig from '@/config/client';

export default function LoginPage() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Mock login - aceita qualquer credencial
      console.log('Login mock com:', data);

      // Simula um delay para parecer mais real
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redireciona para o dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant='h4'
              component='h1'
              color='primary'
              gutterBottom
            >
              {clientConfig.company.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {clientConfig.system.name}
            </Typography>
          </Box>

          <Typography component='h2' variant='h5' sx={{ mb: 3 }}>
            Acesso ao Sistema
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%' }}
          >
            <TextField
              margin='normal'
              fullWidth
              label='E-mail'
              autoComplete='email'
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />

            <TextField
              margin='normal'
              fullWidth
              label='Senha'
              type='password'
              autoComplete='current-password'
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='large'
              disabled={isSubmitting}
              sx={{ mt: 3 }}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </Box>
        </Paper>

        <Typography
          variant='body2'
          color='text.secondary'
          align='center'
          sx={{ mt: 4 }}
        >
          {clientConfig.system.copyrightText}
        </Typography>
      </Container>
    </Box>
  );
}
