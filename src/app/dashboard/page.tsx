'use client';

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Description,
  AccountBalance,
} from '@mui/icons-material';
import { BarChart } from '@mui/x-charts/BarChart';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DashboardMetrics } from '@/types';

// Mock data para demonstração
const mockMetrics: DashboardMetrics = {
  dailySales: 12500,
  openQuotes: 8,
  cashBalance: 45000,
  monthlyRevenue: 180000,
};

const monthlyData = [
  { month: 'Jan', vendas: 15000 },
  { month: 'Fev', vendas: 18000 },
  { month: 'Mar', vendas: 22000 },
  { month: 'Abr', vendas: 19000 },
  { month: 'Mai', vendas: 25000 },
  { month: 'Jun', vendas: 28000 },
];

export default function DashboardPage() {
  const theme = useTheme();

  const kpiCards = [
    {
      title: 'Vendas do Dia',
      value: `R$ ${mockMetrics.dailySales.toLocaleString()}`,
      icon: <TrendingUp color='primary' />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Orçamentos Abertos',
      value: mockMetrics.openQuotes.toString(),
      icon: <Description color='secondary' />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Saldo em Caixa',
      value: `R$ ${mockMetrics.cashBalance.toLocaleString()}`,
      icon: <AccountBalance color='success' />,
      color: theme.palette.success.main,
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${mockMetrics.monthlyRevenue.toLocaleString()}`,
      icon: <People color='info' />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <ProtectedRoute>
      <MainLayout>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h4' gutterBottom>
            Dashboard
          </Typography>

          {/* KPIs - Cards com tamanho fixo */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {kpiCards.map((card, index) => (
              <Grid
                key={index}
                sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}
              >
                <Card
                  sx={{
                    height: 140,
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant='h6'
                        color='text.secondary'
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {card.title}
                      </Typography>
                      {card.icon}
                    </Box>
                    <Typography
                      variant='h4'
                      component='div'
                      color={card.color}
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        mt: 'auto',
                      }}
                    >
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Gráficos - Ocupando toda a largura disponível */}
          <Grid container spacing={3}>
            <Grid sx={{ width: { xs: '100%', lg: '66.666667%' } }}>
              <Paper
                sx={{
                  p: 3,
                  height: { xs: 300, md: 400 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant='h6' gutterBottom>
                  Vendas Mensais
                </Typography>
                <Box
                  sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
                >
                  <BarChart
                    dataset={monthlyData}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[{ dataKey: 'vendas', label: 'Vendas (R$)' }]}
                    height={250}
                    sx={{
                      '.MuiChartsAxis-line': {
                        stroke: theme.palette.divider,
                      },
                      '.MuiChartsAxis-tick': {
                        stroke: theme.palette.divider,
                      },
                      '.MuiChartsAxis-label': {
                        fill: theme.palette.text.secondary,
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid sx={{ width: { xs: '100%', lg: '33.333333%' } }}>
              <Paper
                sx={{
                  p: 3,
                  height: { xs: 300, md: 400 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant='h6' gutterBottom>
                  Resumo Rápido
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                    >
                      Total de Clientes
                    </Typography>
                    <Typography
                      variant='h4'
                      color='primary'
                      sx={{ fontWeight: 'bold' }}
                    >
                      156
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                    >
                      Produtos Cadastrados
                    </Typography>
                    <Typography
                      variant='h4'
                      color='secondary'
                      sx={{ fontWeight: 'bold' }}
                    >
                      42
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                    >
                      Orçamentos Este Mês
                    </Typography>
                    <Typography
                      variant='h4'
                      color='success.main'
                      sx={{ fontWeight: 'bold' }}
                    >
                      23
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                    >
                      Taxa de Conversão
                    </Typography>
                    <Typography
                      variant='h4'
                      color='info.main'
                      sx={{ fontWeight: 'bold' }}
                    >
                      68%
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </MainLayout>
    </ProtectedRoute>
  );
}
