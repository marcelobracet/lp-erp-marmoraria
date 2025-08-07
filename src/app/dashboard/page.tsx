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
import { DashboardMetrics } from '@/types';

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
    <MainLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h4' gutterBottom>
          Dashboard
        </Typography>

        {/* KPIs */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {kpiCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant='h6' color='text.secondary'>
                      {card.title}
                    </Typography>
                    {card.icon}
                  </Box>
                  <Typography variant='h4' component='div' color={card.color}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant='h6' gutterBottom>
                Vendas Mensais
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  dataset={monthlyData}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[{ dataKey: 'vendas', label: 'Vendas (R$)' }]}
                  height={300}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant='h6' gutterBottom>
                Resumo Rápido
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  Total de Clientes
                </Typography>
                <Typography variant='h4' color='primary'>
                  156
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  Produtos Cadastrados
                </Typography>
                <Typography variant='h4' color='secondary'>
                  42
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  Orçamentos Este Mês
                </Typography>
                <Typography variant='h4' color='success.main'>
                  23
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
