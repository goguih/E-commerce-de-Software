import * as React from 'react';
import { BrowserRouter as Router, useHistory, useLocation, Link } from 'react-router-dom';


import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalStorage from '../../../LocalStorage';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const toMyAds = () => history.push('/my-ads');
  const toMyShopping = () => history.push('/my-shopping');

  function handleLogout() {
    LocalStorage.clearToken()
    history.push('/sign-in');
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Detalhes da conta">
          <IconButton onClick={handleClick} size="large" sx={{ ml: 1, color: "black", marginTop: "6px" }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu backgroundColor="blue"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(2px 1px 2px #1976D2)',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 25,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={"/my-account"} style={{ textDecoration: 'none' }}>
          <MenuItem>
            <AccountCircleIcon fontSize="medium" sx={{ marginRight: "15px" }}></AccountCircleIcon>  Meu perfil
          </MenuItem>
        </Link>
        <MenuItem onClick={toMyAds}>
          <MonetizationOnIcon fontSize="medium" sx={{marginRight:"15px"}} /> Meus anúncios
        </MenuItem>
        <MenuItem onClick={toMyShopping}>
          <ShoppingBasketIcon fontSize="medium" sx={{marginRight:"15px"}} /> Minhas compras
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
      </Menu>
    </React.Fragment >
  );
}
