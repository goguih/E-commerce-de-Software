import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, Link, useHistory } from "react-router-dom";

import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Button
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import dados from '../Home/Produto'
import AccountMenu from './AvatarMenu'

import LocalStorage from '../../../LocalStorage'

import * as sessionRoutes from '../../../services/session';
import { getAllCart } from '../../../services/user';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "100px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',

  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

export default function Header() {
  let location = useLocation()
  let history = useHistory()

  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getUserCpf() {

    return await sessionRoutes.refresh()
    }

    async function getAllProducts() {
      const { cpf } = await getUserCpf();

      const productList = await getAllCart(cpf);
      setProduct(productList.productsInCart);
  } 

  getAllProducts();


    refreshAuthenticatedStatus()
  }, [product, location]);

  async function refreshAuthenticatedStatus() {
    if (LocalStorage.getToken() !== '') {
      await checkToken()
    } else {
      setAuthenticatedUser(false)
    }
  }

  async function checkToken() {
    await sessionRoutes.refresh().catch(error => {
      if (!error.response) return;
      if (error.response.status === 401) {
        if (authenticatedUser === true) {
          history.push(
            {
              pathname: '/sign-in',
              state: {
                detail: 'invalid-jwt',
                alertSeverity: 'warning',
                alertContent: 'Por favor, faça login novamente.'
              }
            }
          );
        }
      }
      LocalStorage.clearToken()
      setAuthenticatedUser(false);
    }).then(response => {
      if (!response) return;

      setAuthenticatedUser(true);
    });
  }

  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 1 }}
          >
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={"/home"}>
              <img
                src="https://i.imgur.com/dbIyC3T.png"
                height="80px"
                width="100px"
              />
            </Link>

          </Typography>
          <Search >
            <SearchIconWrapper >
              <SearchIcon color="action" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Procurar…"
              inputProps={{ 'aria-label': 'search' }}
            />

          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            {authenticatedUser ?
              <>

                <IconButton size="large" >
                  <Link to={"/cart"}>
                    <Badge badgeContent={product?.length} color="primary" sx={{ color: "black" }} >
                      <ShoppingCartIcon />
                    </Badge>
                  </Link>
                </IconButton>

              </> :
              <>
                <Link to={"/sign-in"}>
                  <Button
                    sx={{ color: "black", marginTop: "20px" }}
                  >
                    Login
                  </Button>
                </Link>

                <Link to={"/sign-up"} >
                  <Button
                    sx={{ color: "black", marginTop: "20px" }}
                  >
                    Cadastrar
                  </Button>
                </Link>
              </>
            }

            {authenticatedUser ?
              <AccountMenu /> : <> </>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
