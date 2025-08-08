'use client';

import { useState } from 'react';
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
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  LoginFormData,
  loginSchema,
} from '@/features/auth/schemas/login.schema';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import clientConfig from '@/config/client';

export default function LoginPage() {
  const theme = useTheme();
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        p: 2,
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
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

          <Typography
            component='h2'
            variant='h5'
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Acesso ao Sistema
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%' }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='E-mail'
              autoComplete='email'
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
              {...register('email')}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Senha'
              type='password'
              id='password'
              autoComplete='current-password'
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
              {...register('password')}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color='inherit' />
                  Entrando...
                </Box>
              ) : (
                'Entrar'
              )}
            </Button>
          </Box>
        </Paper>

        <Typography
          variant='body2'
          color='text.secondary'
          align='center'
          sx={{ mt: 2, opacity: 0.8 }}
        >
          {clientConfig.system.copyrightText}
        </Typography>
      </Container>
    </Box>
  );
}
