import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getMyShopping } from '../../../services/user';
import LocalStorage from '../../../LocalStorage';
import FooterMenu from "../Footer/Footer";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Rating,
} from '@mui/material/';
import * as sessionRoutes from '../../../services/session';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        SoftBear
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function MinhasCompras() {

  const history = useHistory();
  const location = useLocation();

  // const [alertContent, setAlertContent] = useState('');
  // const [alertSeverity, setAlertSeverity] = useState('info');
  // const [alert, setAlert] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function showAlertAfterSucessfulCheckout() {
      if (!!location.state) {
        switch (location.state.detail) {
          case 'checkoutSucess':
            // setAlertContent(location.state.alertContent)
            // setAlertSeverity(location.state.alertSeverity)
            // setAlert(true);
            break;
          default:
            break;
        }
      }
    }

    async function getAllProducts() {
      const user = await getUserCpf();
      const products = await getMyShopping(user.cpf);
      setProducts(products.myShopping);
    }

    getAllProducts();
    showAlertAfterSucessfulCheckout();
  }, []);

  const showProductDetails = (productId) => {
    LocalStorage.setProductDetails(productId);
    history.push('/detalhesProduto');
  };

  async function getUserCpf() {
    return await sessionRoutes.refresh()
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AttachMoneyIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Minhas Compras
            </Typography>
            <Grid sx={{ flexGrow: 1 }} container spacing={1} >
                <Grid item xs={11} >
                  <Grid container justifyContent="center" spacing={0}>
                    {products.map((product) => (
                      <Grid key={product} item>
                        <Link 
                          href='#'
                          variant='body2'
                          className="nav-link" 
                          onClick={() => showProductDetails(product._id)}
                        >
                          <Card>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="130"
                                image="https://cdn.pixabay.com/photo/2020/04/25/12/14/tech-5090539_960_720.jpg"
                                alt=""
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                  {product.name}
                                </Typography>
                                <Typography display="flex" variant="body2" color="text.secondary">
                                  <Typography sx={{color:"#e0ab1a"}}>
                                    {product.rating},0
                                  </Typography>
                                  <Rating
                                    name="read-only"
                                    value={product.rating}
                                    readOnly
                                  />
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {product.advertiser?.name}
                                </Typography>
                                <Typography variant="h5" color="text.primary">
                                  R${product.price}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={11}></Grid>
              </Grid>
            
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
      <FooterMenu />

      {/* <div className='auth-wrapper'>
        <div className='auth-inner'>
          <Switch>
            <Route path='/new-announcement' component={CadastroAnuncio} />
          </Switch>
        </div>
      </div> */}
    </>
  );
}