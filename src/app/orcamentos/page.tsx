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
} from '@mui/icons-material';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import {
  UpdateQuoteRequest,
  CreateQuoteRequest,
} from '@/services/api/types/quote';
import { Quote, Product } from '@/types';
import { Client } from '@/services/api/types/clients';
import { quotesHandlers } from '@/services/api/handlers/quotes';
import { clientsHandlers } from '@/services/api/handlers/clients';
import { productsHandlers } from '@/services/api/handlers/products';

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

export default function OrcamentosPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuotes, setTotalQuotes] = useState(0);
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
      const response = await quotesHandlers.getQuotes(limit, offset);
      const quotesData = response.quotes || response.data || [];
      const totalCount = response.total || 0;

      const quotesWithClientNames = await Promise.all(
        quotesData.map(async (quote: any) => {
          try {
            if (quote.client.name) {
              return quote;
            }

            if (quote.client.id) {
              const client = await clientsHandlers.getClientById(
                quote.client.id
              );
              return {
                ...quote,
                client_name: client.name,
              };
            }

            return quote;
          } catch (error) {
            console.error(`Erro ao buscar cliente ${quote.client.id}:`, error);
            return {
              ...quote,
              client_name: 'Cliente não encontrado',
            };
          }
        })
      );

      const orcamentosComDadosUndefined = quotesWithClientNames.filter(
        (q: Quote) => !q.client.name || !q.id || !q.status || !q.createdAt
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

  const loadFormData = async () => {
    try {
      const [clientsResponse, productsResponse] = await Promise.all([
        clientsHandlers.getClients(100, 0),
        productsHandlers.getProducts(100, 0),
      ]);

      setClients(clientsResponse.clients || []);
      // setProducts(productsResponse.products || []);
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
        client_id: quote.client.id,
        notes: quote.notes || '',
        items: quote.items.map(item => ({
          product_id: item.product.id,
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

      if (editingQuote) {
        const updateData: UpdateQuoteRequest = {
          client_id: data.client_id,
          notes: data.notes || '',
          items: data.items,
        };

        await quotesHandlers.updateQuote(editingQuote.id, updateData);
        setSuccess('Orçamento atualizado com sucesso!');
      } else {
        const createData: CreateQuoteRequest = {
          client_id: data.client_id,
          notes: data.notes || '',
          items: data.items,
          date: '',
          valid_until: '',
        };

        await quotesHandlers.createQuote(createData);
        setSuccess('Orçamento criado com sucesso!');
      }

      handleCloseDialog();
      loadQuotes();
    } catch (error) {
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
      await quotesHandlers.deleteQuote(id);
      setSuccess('Orçamento excluído com sucesso!');
      loadQuotes();
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      setError(
        error instanceof Error ? error.message : 'Erro ao excluir orçamento'
      );
    }
  };

  const filteredQuotes = (quotes || []).filter(
    quote =>
      (quote.client.name || '')
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
                        <TableCell>{quote.client.name || '-'}</TableCell>
                        <TableCell>
                          R$ {(quote.total || 0).toLocaleString()}
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
                          {quote.createdAt
                            ? new Date(quote.createdAt).toLocaleDateString(
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
