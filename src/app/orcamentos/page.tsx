'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import {
  apiClient,
  Client,
  Product,
  Quote,
  CreateQuoteRequest,
  UpdateQuoteRequest,
} from '@/services/api';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const quoteSchema = z.object({
  client_id: z.string().min(1, 'Cliente é obrigatório'),
  notes: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
  items: z
    .array(
      z.object({
        product_id: z.string().min(1, 'Produto é obrigatório'),
        quantity: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
      })
    )
    .min(1, 'Pelo menos um item é obrigatório'),
  valid_until: z.string().refine(val => !val || !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
  date: z.string().refine(val => !val || !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
});

type QuoteFormData = z.infer<typeof quoteSchema>;
const mockQuotes: Quote[] = [
  {
    id: '1',
    client_id: 'c3011a54-97b4-453a-8377-f569f4229316',
    client_name: 'João Silva',
    total_value: 1500.0,
    is_active: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    status: 'pending',
    date: '2024-01-15T10:30:00Z',
    valid_until: '2024-01-15T10:30:00Z',
    notes: 'Orçamento para bancada de cozinha',
    items: [
      {
        product_id: '1',
        product_name: 'Mármore Branco Carrara',
        quantity: 5,
        unit_price: 150.0,
        total: 750.0,
      },
      {
        product_id: '3',
        product_name: 'Instalação de Pia',
        quantity: 1,
        unit_price: 80.0,
        total: 80.0,
      },
    ],
  },
];

export default function OrcamentosPage() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuotes, setTotalQuotes] = useState(mockQuotes.length);
  const [activeStep, setActiveStep] = useState(0);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      console.log('Carregando orçamentos - página:', page, 'offset:', offset);

      const response = await apiClient.getQuotes(limit, offset);
      console.log('Resposta da API de orçamentos:', response);

      const quotesData = response.quotes || response.data || [];
      const totalCount = response.total || 0;

      console.log('Dados de orçamentos extraídos:', quotesData);
      console.log('Total extraído:', totalCount);

      // Buscar nomes dos clientes para os orçamentos
      const quotesWithClientNames = await Promise.all(
        quotesData.map(async quote => {
          try {
            // Se o orçamento já tem client_name, usar ele
            if (quote.client_name) {
              return quote;
            }

            // Se não tem, buscar o cliente pelo ID
            if (quote.client_id) {
              const client = await apiClient.getClientById(quote.client_id);
              return {
                ...quote,
                client_name: client.name,
              };
            }

            return quote;
          } catch (error) {
            console.error(`Erro ao buscar cliente ${quote.client_id}:`, error);
            return {
              ...quote,
              client_name: 'Cliente não encontrado',
            };
          }
        })
      );

      quotesWithClientNames.forEach((quote, index) => {
        console.log(`Orçamento ${index + 1}:`, {
          id: quote.id,
          client_id: quote.client_id,
          client_name: quote.client_name,
          total_value: quote.total_value,
          status: quote.status,
          created_at: quote.created_at,
        });
      });

      const orcamentosComDadosUndefined = quotesWithClientNames.filter(
        q => !q.client_name || !q.id || !q.status || !q.created_at
      );
      if (orcamentosComDadosUndefined.length > 0) {
        console.warn(
          'Orçamentos com dados undefined:',
          orcamentosComDadosUndefined
        );
      }

      setQuotes(quotesWithClientNames);
      setTotalQuotes(totalCount);
      setTotalPages(Math.ceil(totalCount / limit));

      console.log('Orçamentos carregados:', quotesWithClientNames);
      console.log('Total de orçamentos:', response.total);
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
      setError('Erro ao carregar orçamentos');
      setQuotes([]);
      setTotalQuotes(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Carregar clientes e produtos para o formulário
  const loadFormData = async () => {
    try {
      const [clientsResponse, productsResponse] = await Promise.all([
        apiClient.getClients(100, 0), // Buscar todos os clientes
        apiClient.getProducts(100, 0), // Buscar todos os produtos
      ]);

      setClients(clientsResponse.clients || []);
      setProducts(productsResponse.products || []);
    } catch (error) {
      console.error('Erro ao carregar dados do formulário:', error);
    }
  };

  useEffect(() => {
    loadFormData();
    loadQuotes();
  }, [page]);

  const handleOpenDialog = (quote?: Quote) => {
    if (quote) {
      setEditingQuote(quote);
      reset({
        client_id: quote.client_id,
        notes: quote.notes || '',
        items: quote.items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      });
    } else {
      setEditingQuote(null);
      reset({
        client_id: '',
        notes: '',
        items: [{ product_id: '', quantity: 1 }],
      });
    }
    setOpenDialog(true);
    setActiveStep(0);
    setError(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingQuote(null);
    setActiveStep(0);
    reset({});
    setError(null);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setSaving(true);
      setError(null);

      console.log('Dados do orçamento:', data);
      console.log('Orçamento sendo editado:', editingQuote);

      if (editingQuote) {
        const updateData: UpdateQuoteRequest = {
          client_id: data.client_id,
          notes: data.notes,
          items: data.items,
        };

        console.log('Dados para atualização:', updateData);
        await apiClient.updateQuote(editingQuote.id, updateData);
        setSuccess('Orçamento atualizado com sucesso!');
      } else {
        const createData: CreateQuoteRequest = {
          client_id: data.client_id,
          notes: data.notes,
          items: data.items,
        };

        console.log('Criando orçamento com dados:', createData);
        await apiClient.createQuote(createData);
        setSuccess('Orçamento criado com sucesso!');
      }

      handleCloseDialog();
      loadQuotes(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
      setError(
        error instanceof Error ? error.message : 'Erro ao salvar orçamento'
      );
    } finally {
      setSaving(false);
    }
  };

  const calculateTotal = (
    items: { product_id: string; quantity: number }[]
  ) => {
    return items.reduce((total, item) => {
      const product = products.find(p => p.id === item.product_id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este orçamento?')) {
      return;
    }

    try {
      await apiClient.deleteQuote(id);
      setSuccess('Orçamento excluído com sucesso!');
      loadQuotes(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      setError(
        error instanceof Error ? error.message : 'Erro ao excluir orçamento'
      );
    }
  };

  const filteredQuotes = (quotes || []).filter(
    quote =>
      (quote.client_name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (quote.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quote.status || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Limpar mensagens de sucesso após 3 segundos
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  const steps = ['Cliente', 'Produtos', 'Condições', 'Revisão'];

  return (
    <ProtectedRoute>
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
              onClick={() => handleOpenDialog()}
            >
              Novo Orçamento
            </Button>
          </Box>

          {error && (
            <Alert
              severity='error'
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              severity='success'
              sx={{ mb: 3 }}
              onClose={() => setSuccess(null)}
            >
              {success}
            </Alert>
          )}

          {/* Busca */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder='Buscar por cliente, ID ou status...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Paper>

          {/* Tabela */}
          <TableContainer component={Paper}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredQuotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align='center' sx={{ py: 4 }}>
                        <Typography variant='body2' color='text.secondary'>
                          {loading
                            ? 'Carregando orçamentos...'
                            : searchTerm
                              ? 'Nenhum orçamento encontrado para a busca.'
                              : 'Nenhum orçamento cadastrado.'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredQuotes.map(quote => (
                      <TableRow key={quote.id}>
                        <TableCell>{quote.id || '-'}</TableCell>
                        <TableCell>{quote.client_name || '-'}</TableCell>
                        <TableCell>
                          R$ {(quote.total_value || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(quote.status || 'pending')}
                            size='small'
                            color={
                              getStatusColor(quote.status || 'pending') as any
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {quote.created_at
                            ? new Date(quote.created_at).toLocaleDateString(
                                'pt-BR'
                              )
                            : '-'}
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton
                            size='small'
                            onClick={() => handleOpenDialog(quote)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleDelete(quote.id || '')}
                            color='error'
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color='primary'
              />
            </Box>
          )}

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth='md'
            fullWidth
          >
            <DialogTitle>
              {editingQuote ? 'Editar Orçamento' : 'Novo Orçamento'}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {activeStep === 0 && (
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <FormControl fullWidth error={!!errors.client_id}>
                      <InputLabel>Cliente</InputLabel>
                      <Select label='Cliente' {...register('client_id')}>
                        {clients.map(client => (
                          <MenuItem key={client.id} value={client.id}>
                            {client.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label='Observações'
                      fullWidth
                      multiline
                      rows={3}
                      {...register('notes')}
                    />
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <Typography variant='h6' gutterBottom>
                      Produtos do Orçamento
                    </Typography>
                    {watch('items')?.map((item, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                          <Box
                            sx={{
                              display: 'grid',
                              gap: 2,
                              gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
                            }}
                          >
                            <FormControl fullWidth>
                              <InputLabel>Produto</InputLabel>
                              <Select
                                label='Produto'
                                value={item.product_id}
                                onChange={e => {
                                  const newItems = [...watch('items')];
                                  newItems[index].product_id = e.target.value;
                                  setValue('items', newItems);
                                }}
                              >
                                {products.map(product => (
                                  <MenuItem key={product.id} value={product.id}>
                                    {product.name} - R${' '}
                                    {(product.price || 0).toLocaleString()}/
                                    {product.unit}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <TextField
                              label='Quantidade'
                              fullWidth
                              type='number'
                              value={item.quantity}
                              onChange={e => {
                                const newItems = [...watch('items')];
                                newItems[index].quantity =
                                  parseFloat(e.target.value) || 0;
                                setValue('items', newItems);
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant='outlined'
                      onClick={() => {
                        const newItems = [
                          ...watch('items'),
                          { product_id: '', quantity: 1 },
                        ];
                        setValue('items', newItems);
                      }}
                    >
                      Adicionar Produto
                    </Button>
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <Typography variant='h6' gutterBottom>
                      Condições do Orçamento
                    </Typography>
                    <TextField
                      label='Observações Adicionais'
                      fullWidth
                      multiline
                      rows={4}
                      {...register('notes')}
                    />
                  </Box>
                )}

                {activeStep === 3 && (
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <Typography variant='h6' gutterBottom>
                      Revisão do Orçamento
                    </Typography>
                    <Card>
                      <CardContent>
                        <Typography variant='subtitle1' gutterBottom>
                          Cliente:{' '}
                          {clients.find(c => c.id === watch('client_id'))?.name}
                        </Typography>
                        <Typography variant='subtitle1' gutterBottom>
                          Total: R${' '}
                          {calculateTotal(
                            watch('items') || []
                          ).toLocaleString()}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {watch('notes')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} disabled={saving}>
                  Cancelar
                </Button>
                {activeStep > 0 && <Button onClick={handleBack}>Voltar</Button>}
                {activeStep < steps.length - 1 ? (
                  <Button onClick={handleNext} variant='contained'>
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={saving}
                    startIcon={
                      saving ? <CircularProgress size={20} /> : undefined
                    }
                  >
                    {saving ? 'Salvando...' : editingQuote ? 'Salvar' : 'Criar'}
                  </Button>
                )}
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      </MainLayout>
    </ProtectedRoute>
  );
}
