'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
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
  useTheme,
  Alert,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UpdateProductRequest,
  CreateProductRequest,
} from '@/services/api/types/products';
import { Product } from '@/types';
import { productsHandlers } from '@/services/api/handlers/products';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  type: z.enum(['Mármore', 'Granito', 'Serviço']),
  price: z.number().min(0, 'Preço deve ser maior que zero'),
  unit: z.string().min(1, 'Unidade é obrigatória'),
  is_active: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

const mapProductTypeToForm = (
  type: string
): 'Mármore' | 'Granito' | 'Serviço' => {
  switch (type) {
    case 'marble':
      return 'Mármore';
    case 'granite':
      return 'Granito';
    case 'service':
      return 'Serviço';
    default:
      return 'Mármore';
  }
};

export default function ProdutosPage() {
  const theme = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;

      const response = await productsHandlers.getProducts(limit, offset);

      // const productsData = response.products || response.data || [];
      const totalCount = response.total || 0;

      // setProducts(productsData);
      setTotalProducts(totalCount);
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Erro ao carregar produtos');
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      reset({
        name: product.name,
        type: mapProductTypeToForm(product.type),
        description: product.description || '',
        price: product.price || 0,
        unit: product.unit,
        is_active: product.active || true,
      });
    } else {
      setEditingProduct(null);
      reset({
        name: '',
        type: 'Mármore',
        description: '',
        price: 0,
        unit: 'm²',
      });
    }
    setOpenDialog(true);
    setError(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    reset({});
    setError(null);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setSaving(true);
      setError(null);

      if (editingProduct) {
        const updateData: UpdateProductRequest = {
          name: data.name,
          type: data.type,
          description: data.description,
          price: data.price,
          unit: data.unit,
        };

        await productsHandlers.updateProduct(editingProduct.id, updateData);
        setSuccess('Produto atualizado com sucesso!');
      } else {
        const createData: CreateProductRequest = {
          name: data.name,
          type: data.type,
          description: data.description,
          price: data.price,
          unit: data.unit,
        };

        await productsHandlers.createProduct(createData);
        setSuccess('Produto criado com sucesso!');
      }

      handleCloseDialog();
      loadProducts();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setError(
        error instanceof Error ? error.message : 'Erro ao salvar produto'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      await productsHandlers.deleteProduct(id);
      setSuccess('Produto excluído com sucesso!');
      loadProducts(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setError(
        error instanceof Error ? error.message : 'Erro ao excluir produto'
      );
    }
  };

  const filteredProducts = (products || []).filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Typography variant='h4'>Produtos</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Novo Produto
              </Button>
            </Box>
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
              placeholder='Buscar por nome, descrição ou tipo...'
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
                    <TableCell>Nome</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Preço Unitário</TableCell>
                    <TableCell>Unidade</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align='center' sx={{ py: 4 }}>
                        <Typography variant='body2' color='text.secondary'>
                          {loading
                            ? 'Carregando produtos...'
                            : searchTerm
                              ? 'Nenhum produto encontrado para a busca.'
                              : 'Nenhum produto cadastrado.'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.type.toUpperCase()}
                            size='small'
                            color={
                              product.type === 'marble'
                                ? 'primary'
                                : product.type === 'granite'
                                  ? 'secondary'
                                  : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>{product.description || '-'}</TableCell>
                        <TableCell>
                          R$ {(product.price || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>{product.unit.toUpperCase()}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.active ? 'Ativo' : 'Inativo'}
                            size='small'
                            color={product.active ? 'success' : 'error'}
                          />
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton
                            size='small'
                            onClick={() => handleOpenDialog(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleDelete(product.id)}
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
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  }}
                >
                  <TextField
                    label='Nome'
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register('name')}
                  />
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                      label='Tipo'
                      {...register('type')}
                      defaultValue='Mármore'
                    >
                      <MenuItem value='Mármore'>Mármore</MenuItem>
                      <MenuItem value='Granito'>Granito</MenuItem>
                      <MenuItem value='Serviço'>Serviço</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label='Descrição'
                    fullWidth
                    multiline
                    rows={3}
                    {...register('description')}
                    sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1' } }}
                  />
                  <TextField
                    label='Preço Unitário'
                    fullWidth
                    type='number'
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    {...register('price', { valueAsNumber: true })}
                  />
                  <FormControl fullWidth error={!!errors.unit}>
                    <InputLabel>Unidade</InputLabel>
                    <Select
                      label='Unidade'
                      {...register('unit')}
                      defaultValue='m2'
                    >
                      <MenuItem value='m2'>m²</MenuItem>
                      <MenuItem value='ml'>ml</MenuItem>
                      <MenuItem value='un'>un</MenuItem>
                      <MenuItem value='kg'>kg</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Switch {...register('is_active')} defaultChecked />
                    }
                    label='Produto Ativo'
                    sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1' } }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} disabled={saving}>
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={saving}
                  startIcon={
                    saving ? <CircularProgress size={20} /> : undefined
                  }
                >
                  {saving
                    ? 'Salvando...'
                    : editingProduct
                      ? 'Salvar'
                      : 'Cadastrar'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      </MainLayout>
    </ProtectedRoute>
  );
}
