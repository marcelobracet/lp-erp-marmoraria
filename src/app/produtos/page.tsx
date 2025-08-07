'use client';

import { useState } from 'react';
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
import MainLayout from '@/components/layout/MainLayout';
import { Product } from '@/types';

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['marble', 'granite', 'service']),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.number().min(0, 'Preço deve ser maior que zero'),
  unit: z.enum(['m²', 'unit']),
  active: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

// Mock data
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

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      active: true,
    },
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      reset(product);
    } else {
      setEditingProduct(null);
      reset({ active: true });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    reset({ active: true });
  };

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      setProducts(
        products.map(product =>
          product.id === editingProduct.id ? { ...product, ...data } : product
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...data,
      };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setProducts(
      products.map(product =>
        product.id === id ? { ...product, active: !product.active } : product
      )
    );
  };

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'marble':
        return 'primary';
      case 'granite':
        return 'secondary';
      case 'service':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'marble':
        return 'Mármore';
      case 'granite':
        return 'Granito';
      case 'service':
        return 'Serviço';
      default:
        return type;
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
          <Typography variant='h4'>Produtos</Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Novo Produto
          </Button>
        </Box>

        {/* Busca */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder='Buscar por nome ou descrição...'
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Unidade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='right'>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeLabel(product.type)}
                      size='small'
                      color={getTypeColor(product.type) as any}
                    />
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    R${' '}
                    {product.price.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.active ? 'Ativo' : 'Inativo'}
                      size='small'
                      color={product.active ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      size='small'
                      onClick={() => handleToggleActive(product.id)}
                    >
                      <Switch
                        checked={product.active}
                        size='small'
                        onChange={() => handleToggleActive(product.id)}
                      />
                    </IconButton>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog de Cadastro/Edição */}
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
                sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}
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
                  <Select label='Tipo' {...register('type')} defaultValue=''>
                    <MenuItem value='marble'>Mármore</MenuItem>
                    <MenuItem value='granite'>Granito</MenuItem>
                    <MenuItem value='service'>Serviço</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label='Descrição'
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  {...register('description')}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label='Preço'
                  fullWidth
                  type='number'
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  {...register('price', { valueAsNumber: true })}
                />
                <FormControl fullWidth error={!!errors.unit}>
                  <InputLabel>Unidade</InputLabel>
                  <Select label='Unidade' {...register('unit')} defaultValue=''>
                    <MenuItem value='m²'>m²</MenuItem>
                    <MenuItem value='unit'>Unidade</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={watch('active')}
                      onChange={e => setValue('active', e.target.checked)}
                    />
                  }
                  label='Ativo'
                  sx={{ gridColumn: 'span 2' }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button type='submit' variant='contained'>
                {editingProduct ? 'Salvar' : 'Cadastrar'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </MainLayout>
  );
}
