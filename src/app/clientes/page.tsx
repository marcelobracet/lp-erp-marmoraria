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
  useTheme,
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
import { Client } from '@/types';

const clientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  document: z.string().min(1, 'CPF/CNPJ é obrigatório'),
  documentType: z.enum(['cpf', 'cnpj']),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(1, 'Estado é obrigatório'),
    zipCode: z.string().min(1, 'CEP é obrigatório'),
  }),
});

type ClientFormData = z.infer<typeof clientSchema>;

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

export default function ClientesPage() {
  const theme = useTheme();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const handleOpenDialog = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      reset(client);
    } else {
      setEditingClient(null);
      reset({});
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClient(null);
    reset({});
  };

  const onSubmit = (data: ClientFormData) => {
    if (editingClient) {
      setClients(
        clients.map(client =>
          client.id === editingClient.id ? { ...client, ...data } : client
        )
      );
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        ...data,
      };
      setClients([...clients, newClient]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const filteredClients = clients.filter(
    client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.document.includes(searchTerm)
  );

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
          <Typography variant='h4'>Clientes</Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Novo Cliente
          </Button>
        </Box>

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
              {filteredClients.map(client => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.document}</TableCell>
                  <TableCell>
                    <Chip
                      label={client.documentType.toUpperCase()}
                      size='small'
                      color={
                        client.documentType === 'cpf' ? 'primary' : 'secondary'
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
          <DialogTitle>
            {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
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
                  label='Rua'
                  fullWidth
                  error={!!errors.address?.street}
                  helperText={errors.address?.street?.message}
                  {...register('address.street')}
                />
                <TextField
                  label='Número'
                  fullWidth
                  error={!!errors.address?.number}
                  helperText={errors.address?.number?.message}
                  {...register('address.number')}
                />
                <TextField
                  label='Complemento'
                  fullWidth
                  {...register('address.complement')}
                />
                <TextField
                  label='Bairro'
                  fullWidth
                  error={!!errors.address?.neighborhood}
                  helperText={errors.address?.neighborhood?.message}
                  {...register('address.neighborhood')}
                />
                <TextField
                  label='Cidade'
                  fullWidth
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                  {...register('address.city')}
                />
                <TextField
                  label='Estado'
                  fullWidth
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                  {...register('address.state')}
                />
                <TextField
                  label='CEP'
                  fullWidth
                  error={!!errors.address?.zipCode}
                  helperText={errors.address?.zipCode?.message}
                  {...register('address.zipCode')}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button type='submit' variant='contained'>
                {editingClient ? 'Salvar' : 'Cadastrar'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </MainLayout>
  );
}
