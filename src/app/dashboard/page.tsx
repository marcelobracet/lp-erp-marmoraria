'use client';

import { Box, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <Typography variant='body1'>Bem-vindo ao ERP Marmoraria!</Typography>
    </Box>
  );
}
