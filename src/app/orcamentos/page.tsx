'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MainLayout from '@/components/layout/MainLayout';
import { Quote, Client, Product } from '@/types';

const quoteSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Produto é obrigatório'),
        quantity: z.number().min(0.1, 'Quantidade deve ser maior que zero'),
        price: z.number().min(0, 'Preço deve ser maior que zero'),
      })
    )
    .min(1, 'Pelo menos um item é obrigatório'),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    document: '123.456.789-00',
    documentType: 'cpf',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
  },
  {
    id: '2',
    name: 'Empresa ABC Ltda',
    email: 'contato@empresaabc.com',
    phone: '(11) 88888-8888',
    document: '12.345.678/0001-90',
    documentType: 'cnpj',
    address: {
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
    },
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mármore Branco Carrara',
    type: 'marble',
    description: 'Mármore branco de alta qualidade',
    price: 150.0,
    unit: 'm²',
    active: true,
  },
  {
    id: '2',
    name: 'Granito Preto Absoluto',
    type: 'granite',
    description: 'Granito preto para bancadas',
    price: 200.0,
    unit: 'm²',
    active: true,
  },
  {
    id: '3',
    name: 'Instalação de Pia',
    type: 'service',
    description: 'Serviço de instalação de pia',
    price: 80.0,
    unit: 'unit',
    active: true,
  },
];

const mockQuotes: Quote[] = [
  {
    id: '1',
    client: mockClients[0],
    items: [
      {
        product: mockProducts[0],
        quantity: 10,
        price: 150.0,
      },
      {
        product: mockProducts[2],
        quantity: 1,
        price: 80.0,
      },
    ],
    status: 'pending',
    total: 1580.0,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    validUntil: new Date('2024-02-15'),
    notes: 'Orçamento para cozinha',
  },
  {
    id: '2',
    client: mockClients[1],
    items: [
      {
        product: mockProducts[1],
        quantity: 15,
        price: 200.0,
      },
    ],
    status: 'approved',
    total: 3000.0,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    validUntil: new Date('2024-02-10'),
  },
];

const steps = ['Cliente', 'Produtos', 'Condições', 'Revisão'];

export default function OrcamentosPage() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState<
    Array<{
      productId: string;
      quantity: number;
      price: number;
    }>
  >([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setActiveStep(0);
    setSelectedItems([]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    setSelectedItems([]);
  };

  const handleAddItem = () => {
    setSelectedItems([
      ...selectedItems,
      { productId: '', quantity: 1, price: 0 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...selectedItems];
    newItems[index] = { ...newItems[index], [field]: value };

    // Auto-calculate price based on product
    if (field === 'productId') {
      const product = mockProducts.find(p => p.id === value);
      if (product) {
        newItems[index].price = product.price;
      }
    }

    setSelectedItems(newItems);
  };

  const onSubmit = (data: QuoteFormData) => {
    const selectedClient = mockClients.find(c => c.id === data.clientId);
    if (!selectedClient) return;

    const quoteItems = selectedItems.map(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      return {
        product: product!,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const total = quoteItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const newQuote: Quote = {
      id: Date.now().toString(),
      client: selectedClient,
      items: quoteItems,
      status: 'draft',
      total,
      createdAt: new Date(),
      updatedAt: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      notes: data.notes,
    };

    setQuotes([...quotes, newQuote]);
    handleCloseDialog();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Rascunho';
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl fullWidth error={!!errors.clientId}>
            <InputLabel>Cliente</InputLabel>
            <Select label='Cliente' {...register('clientId')} defaultValue=''>
              {mockClients.map(client => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name} - {client.document}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 1:
        return (
          <Box>
            <Button onClick={handleAddItem} variant='outlined' sx={{ mb: 2 }}>
              Adicionar Produto
            </Button>
            {selectedItems.map((item, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>Produto</InputLabel>
                        <Select
                          value={item.productId}
                          onChange={e =>
                            handleItemChange(index, 'productId', e.target.value)
                          }
                        >
                          {mockProducts.map(product => (
                            <MenuItem key={product.id} value={product.id}>
                              {product.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label='Quantidade'
                        type='number'
                        value={item.quantity}
                        onChange={e =>
                          handleItemChange(
                            index,
                            'quantity',
                            parseFloat(e.target.value)
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label='Preço Unitário'
                        type='number'
                        value={item.price}
                        onChange={e =>
                          handleItemChange(
                            index,
                            'price',
                            parseFloat(e.target.value)
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        onClick={() => handleRemoveItem(index)}
                        color='error'
                        variant='outlined'
                        fullWidth
                      >
                        Remover
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 2:
        return (
          <TextField
            label='Observações'
            multiline
            rows={4}
            fullWidth
            {...register('notes')}
          />
        );
      case 3:
        const selectedClient = mockClients.find(
          c => c.id === watch('clientId')
        );
        const total = selectedItems.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );

        return (
          <Box>
            <Typography variant='h6' gutterBottom>
              Resumo do Orçamento
            </Typography>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant='subtitle1' gutterBottom>
                  Cliente: {selectedClient?.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {selectedClient?.email} - {selectedClient?.phone}
                </Typography>
              </CardContent>
            </Card>

            <Typography variant='h6' gutterBottom>
              Itens
            </Typography>
            {selectedItems.map((item, index) => {
              const product = mockProducts.find(p => p.id === item.productId);
              return (
                <Card key={index} sx={{ mb: 1 }}>
                  <CardContent>
                    <Typography variant='body1'>
                      {product?.name} - {item.quantity} x R${' '}
                      {item.price.toFixed(2)} = R${' '}
                      {(item.quantity * item.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}

            <Divider sx={{ my: 2 }} />
            <Typography variant='h5' align='right'>
              Total: R$ {total.toFixed(2)}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant='h4'>Orçamentos</Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Novo Orçamento
          </Button>
        </Box>

        {/* Tabela */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Valor Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Validade</TableCell>
                <TableCell align='right'>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.map(quote => (
                <TableRow key={quote.id}>
                  <TableCell>{quote.client.name}</TableCell>
                  <TableCell>
                    R${' '}
                    {quote.total.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(quote.status)}
                      size='small'
                      color={getStatusColor(quote.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    {quote.createdAt.toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {quote.validUntil.toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton size='small'>
                      <ViewIcon />
                    </IconButton>
                    <IconButton size='small'>
                      <EditIcon />
                    </IconButton>
                    <IconButton size='small' color='error'>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth='md'
          fullWidth
        >
          <DialogTitle>Novo Orçamento</DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {renderStepContent(activeStep)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleSubmit(onSubmit)} variant='contained'>
                Salvar Orçamento
              </Button>
            ) : (
              <Button onClick={handleNext} variant='contained'>
                Próximo
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
}
