import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Box, Grid, Alert } from '@mui/material/';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Rating,
  Link
} from '@mui/material/';
import FooterMenu from '../Footer/Footer'
import FiltroCategoriaMenu from "./FiltroCategorias.js";
import '../../../styles.css';

import { getAll } from '../../../services/product';
import LocalStorage from '../../../LocalStorage';

export default function SpacingGrid() {
  const history = useHistory();
  const location = useLocation();

  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [alert, setAlert] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function showAlertAfterSucessfulCheckout() {
      if (!!location.state) {
        switch (location.state.detail) {
          case 'checkoutSucess':
            setAlertContent(location.state.alertContent)
            setAlertSeverity(location.state.alertSeverity)
            setAlert(true);
            break;
          default:
            break;
        }
      }
    }

    async function getAllProducts() {
      const products = await getAll();
      setProducts(products);
    }

    getAllProducts();
    showAlertAfterSucessfulCheckout();
  }, []);

  const showProductDetails = (productId) => {
    LocalStorage.setProductDetails(productId);
    history.push('/detalhesProduto');
  };

  return (
    <>
      <FiltroCategoriaMenu />
      <div id="alert">
        {alert ?  
          <Alert
            severity={alertSeverity}
            onClose={() => { setAlert(false); }}
          >{alertContent}</Alert> : <></>}
      </div>
      <Box
        sx={{
          marginTop: 15,
          marginLeft: 20,
        }}
      >
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
                              {product.rating}
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
      <FooterMenu />
    </>
  );
}
