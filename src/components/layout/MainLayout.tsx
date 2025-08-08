'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Description,
  Inventory,
  Settings,
  AccountCircle,
  ChevronLeft,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import clientConfig from '@/config/client';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Clientes', icon: <People />, path: '/clientes' },
  { text: 'Orçamentos', icon: <Description />, path: '/orcamentos' },
  { text: 'Produtos', icon: <Inventory />, path: '/produtos' },
  { text: 'Configurações', icon: <Settings />, path: '/configuracoes' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Verificar se estamos no cliente para evitar problemas de hidratação
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleNavigation = (path: string) => {
    console.log('Navegando para:', path);
    router.push(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            {clientConfig.company.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant='body2'
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {user?.name}
            </Typography>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenuClick}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                  {user?.email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Typography variant='body2' color='text.secondary'>
                  Role: {user?.role}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
            <Typography variant='h6' sx={{ flexGrow: 1, ml: 1 }}>
              {clientConfig.system.name}
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeft />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {menuItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
            <Typography variant='h6' sx={{ flexGrow: 1, ml: 1 }}>
              {clientConfig.system.name}
            </Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
