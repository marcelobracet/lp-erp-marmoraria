'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user' | 'manager';
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant='body2' color='text.secondary'>
          Verificando autenticação...
        </Typography>
      </Box>
    );
  }

  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Verificar permissões se necessário
  if (requiredRole && user?.role !== requiredRole) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <Typography variant='h4' color='error' gutterBottom>
          Acesso Negado
        </Typography>
        <Typography variant='body1' color='text.secondary' textAlign='center'>
          Você não tem permissão para acessar esta página.
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Role necessário: {requiredRole}
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
