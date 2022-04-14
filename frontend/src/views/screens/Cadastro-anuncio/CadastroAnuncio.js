import * as React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import * as Product from '../../../services/product';
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

export default function CadastroAnuncio() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const cpf = await getUserCpf();
    console.log(cpf)
    const registrationForm = {
      "name": data.get('name'),
      "description": data.get('description'),
      "price": parseInt(data.get('price')),
      "category": parseInt(data.get('category')),
      "licenseType": parseInt(data.get('license')),
      "advertiser": cpf.cpf
    }
    console.log(registrationForm);
    const response = await Product.create(registrationForm);

    console.log(response);
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
              <AddCircleIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Cadastrar Produto
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='name'
                    required
                    fullWidth
                    id='name'
                    label='Nome'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='description'
                    label='Descrição'
                    name='description'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="category_label">Categoria</InputLabel>
                    <Select
                      label='Categoria'
                      labelId="category_label"
                      required
                      fullWidth
                      id='category'
                      name='category'
                    >
                      <MenuItem value="1">Mobile</MenuItem>
                      <MenuItem value="2">Desktop</MenuItem>
                      <MenuItem value="3">Banco de dados</MenuItem>
                      <MenuItem value="4">Backend</MenuItem>
                      <MenuItem value="5">Design</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="licenca_label">Licença</InputLabel>
                    <Select
                      label='Licença'
                      labelId="licenca_label"
                      required
                      fullWidth
                      id='license'
                      name='license'
                    >
                      <MenuItem value='1'>EULA</MenuItem>
                      <MenuItem value='2'>Software Proprietário</MenuItem>
                      <MenuItem value='3'>Software Livre</MenuItem>
                      <MenuItem value='4'>Software Comercial</MenuItem>
                      <MenuItem value='5'>Open Source</MenuItem>
                      <MenuItem value='6'>GNU GPL</MenuItem>
                      <MenuItem value='7'>Software Gratuito</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='price'
                    label='Preço'
                    id='price'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value='agreeTOS' color='primary' />}
                    label='Concordo com os termos de serviço.'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar produto
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>

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