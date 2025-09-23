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
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
} from '@/services/api/types/clients';
import { clientsHandlers } from '@/services/api/handlers/clients';

const clientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  document: z.string().min(1, 'CPF/CNPJ é obrigatório'),
  document_type: z.enum(['CPF', 'CNPJ']),
  address: z.string().min(1, 'Endereço é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  zip_code: z.string().min(1, 'CEP é obrigatório'),
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function ClientesPage() {
  const theme = useTheme();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const loadClients = async () => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;

      const response = await clientsHandlers.getClients(limit, offset);

      const clientsData = response.clients || response.data || [];
      const totalCount = response.total || 0;

      setClients(clientsData);
      setTotalClients(totalCount);
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (error) {
      setError('Erro ao carregar clientes');
      setClients([]);
      setTotalClients(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, [page]);

  const handleOpenDialog = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      reset({
        name: client.name,
        email: client.email,
        phone: client.phone,
        document: client.document,
        document_type: client.document_type,
        address: client.address || '',
        city: client.city || '',
        state: client.state || '',
        zip_code: client.zip_code || '',
      });
    } else {
      setEditingClient(null);
      reset({
        name: '',
        email: '',
        phone: '',
        document: '',
        document_type: 'CPF',
        address: '',
        city: '',
        state: '',
        zip_code: '',
      });
    }
    setOpenDialog(true);
    setError(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClient(null);
    reset({});
    setError(null);
  };

  const onSubmit = async (data: ClientFormData) => {
    try {
      setSaving(true);
      setError(null);

      if (editingClient) {
        const updateData: UpdateClientRequest = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          document: data.document,
          document_type: data.document_type,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
        };

        const updatedClient = await clientsHandlers.updateClient(
          editingClient.id,
          updateData
        );

        setSuccess('Cliente atualizado com sucesso!');
      } else {
        // Criar novo cliente
        const createData: CreateClientRequest = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          document: data.document,
          document_type: data.document_type,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
        };

        await clientsHandlers.createClient(createData);
        setSuccess('Cliente criado com sucesso!');
      }

      handleCloseDialog();
      loadClients();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setError(
        error instanceof Error ? error.message : 'Erro ao salvar cliente'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
      return;
    }

    try {
      await clientsHandlers.deleteClient(id);
      setSuccess('Cliente excluído com sucesso!');
      loadClients();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setError(
        error instanceof Error ? error.message : 'Erro ao excluir cliente'
      );
    }
  };

  const filteredClients = (clients || []).filter(
    client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.document.includes(searchTerm)
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
            <Typography variant='h4'>Clientes</Typography>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Novo Cliente
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
              placeholder='Buscar por nome, email ou documento...'
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
                    <TableCell>E-mail</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Documento</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align='center' sx={{ py: 4 }}>
                        <Typography variant='body2' color='text.secondary'>
                          {loading
                            ? 'Carregando clientes...'
                            : searchTerm
                              ? 'Nenhum cliente encontrado para a busca.'
                              : 'Nenhum cliente cadastrado.'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map(client => (
                      <TableRow key={client.id}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.document}</TableCell>
                        <TableCell>
                          <Chip
                            label={client.document_type.toUpperCase()}
                            size='small'
                            color={
                              client.document_type === 'CPF'
                                ? 'primary'
                                : 'secondary'
                            }
                          />
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton
                            size='small'
                            onClick={() => handleOpenDialog(client)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleDelete(client.id)}
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
              {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
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
                  <TextField
                    label='E-mail'
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email')}
                  />
                  <TextField
                    label='Telefone'
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    {...register('phone')}
                  />
                  <TextField
                    label='CPF/CNPJ'
                    fullWidth
                    error={!!errors.document}
                    helperText={errors.document?.message}
                    {...register('document')}
                  />
                  <TextField
                    label='Endereço'
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    {...register('address')}
                    sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1' } }}
                  />
                  <TextField
                    label='Cidade'
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    {...register('city')}
                  />
                  <TextField
                    label='Estado'
                    fullWidth
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    {...register('state')}
                  />
                  <TextField
                    label='CEP'
                    fullWidth
                    error={!!errors.zip_code}
                    helperText={errors.zip_code?.message}
                    {...register('zip_code')}
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
                    : editingClient
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
