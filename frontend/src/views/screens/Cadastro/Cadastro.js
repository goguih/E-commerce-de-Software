import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import FooterMenu from "../Footer/Footer";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Alert,
  Modal
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Copyright } from "../../../globalFunction";
import * as userRoutes from '../../../services/user';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TermosDeServiço = [
  'Respeitar e convívio saudável com os outros usuários',
  'Não divulgar software ilegal, pirateado ou fazer uso indevido de algum programa',
  'Dados e informações básicas serão coletadas para fins estatísticos e de pesquisa'
]

const theme = createTheme();

export default function Cadastro() {
  const history = useHistory();

  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [alert, setAlert] = useState(false);

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [openTOSModal, setOpenTOSModal] = useState(false);

  const handleLoginButton = () => history.push('/sign-in');

  const handleSubmit = async (event) => {
    setDisableSubmitButton(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const signUpForm = {
      name: data.get('name'),
      last_name: data.get('last_name'),
      cpf: data.get('cpf'),
      email: data.get('email'),
      password: data.get('password'),
      phone: data.get('phone'),
      birth_date: data.get('birth_date')
    }

    await userRoutes.create(signUpForm).catch(error => {
      if (!error.response) return

      if (error.response.data.message) {
        setAlertContent(error.response.data.message);
      } else {
        setAlertContent('Houve um erro ao realizar o cadastro.');
      }
      
      setAlertSeverity('error');
      setAlert(true);
      setDisableSubmitButton(false)
    }).then(response => {
      if (!response) return;
  
      history.push(
        {
          pathname: '/sign-in',
          state: {
            detail: 'signedUp',
            alertSeverity: 'success',
            alertContent: 'Usuário cadastrado com sucesso!'
          }
        }
      )
    });
  };

  function handleOpenTOSModal() {
    setOpenTOSModal(true);
  }

  function handleCloseTOSModal() {
    setOpenTOSModal(false);
  }

  return (
    <>
      <div id="alert">
        {alert ? <Alert severity={alertSeverity} onClose={() => { setAlert(false); }}>{alertContent}</Alert> : <></>}
      </div>
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
              <PersonAddIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Cadastro
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='last_name'
                    label='Sobrenome'
                    name='last_name'
                    autoComplete='last_name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='E-mail'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='phone'
                    label='Telefone'
                    name='phone'
                    autoComplete='phone'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='cpf'
                    label='CPF'
                    name='cpf'
                    autoComplete='cpf'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Senha'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  // onChange={validatePassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='birth_date'
                    label='Data de nascimento'
                    type='date'
                    id='birth_date'
                    autoComplete='birth_date'
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value='agreeTOS' color='primary' />}
                    label='Concordo com os Termos de Serviço.'
                    onClick={handleOpenTOSModal}
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleOpenTOSModal}
                  >
                    Mostrar Termos de Serviço
                  </Button>
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={disableSubmitButton}
              >
                Cadastrar
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link
                    href='#'
                    variant='body2'
                    className='nav-link'
                    onClick={handleLoginButton}
                  >
                    Já possui uma conta? Entre aqui
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />

          <Modal
            open={openTOSModal}
            onClose={handleCloseTOSModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Termos de Serviço - 2022
              </Typography>
              <Typography id="modal-modal-description" component={'span'} sx={{ mt: 2 }}>
                Ao usar o sistema SoftBear, você concorda com nossos Termos de Serviço:

                {TermosDeServiço.map((termo, i) => <li key={i}>{termo}</li>)}

              </Typography>

              <Button
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCloseTOSModal}
              >Fechar</Button>
            </Box>
          </Modal>
        </Container >
      </ThemeProvider >
      <FooterMenu />
    </>
  );
}
