import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link as MUILink,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Alert,
  Modal
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import './Login.css';
import LocalStorage from "../../../LocalStorage";
import FooterMenu from "../Footer/Footer";

import * as sessionRoutes from '../../../services/session';
import * as userRoutes from '../../../services/user';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const location = useLocation();

  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [alert, setAlert] = useState(false);

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [openRecoverPasswordModal, setOpenRecoverPasswordModal] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('')
  const [recoverPasswordResponse, setRecoverPasswordResponse] = useState('')

  const timeout = (delay) => {
    return new Promise(res => setTimeout(res, delay));
  }

  useEffect(() => {
    async function showAlertAfterSignIn() {
      if (!!location.state) {
        switch (location.state.detail) {
          case 'signedUp':
            setAlertContent(location.state.alertContent)
            setAlertSeverity(location.state.alertSeverity)
            setAlert(true);

            await timeout(2500)
            setAlert(false);
            break;
          default:
            setAlertContent(location.state.alertContent)
            setAlertSeverity(location.state.alertSeverity)
            setAlert(true);
            break;
        }
      }
    }

    showAlertAfterSignIn()
  }, []);

  async function handleSubmit(event) {
    setDisableSubmitButton(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const signInForm = {
      email: data.get('email'),
      password: data.get('password')
    }

    await sessionRoutes.create(signInForm).catch(error => {
      if (!error.response) return

      if (error.response.data.message) {
        setAlertContent(error.response.data.message);
      } else {
        setAlertContent('CPF e/ou senha incorreto(s).');
      }

      setAlertSeverity('warning');
      setAlert(true);
      setDisableSubmitButton(false)
    }).then(response => {
      if (!response) return

      const { token } = response
      setAlertContent('Usuário autenticado!');
      setAlertSeverity('success');
      setAlert(true);

      LocalStorage.setToken(token);

      history.push(
        {
          // envia para home
          pathname: '/home',
        }
      );
    });
  };

  function handleOpenRecoverPasswordModal() {
    setOpenRecoverPasswordModal(true);
  }

  function handleCloseRecoverPasswordModal() {
    setOpenRecoverPasswordModal(false);
  }

  function handleChangeRecoverEmailField(event) {
    const data = event.target;

    if (data.id) {
      const { value } = event.target;

      setRecoverEmail(value);
    }
  }

  async function handleRecoverUserPassword(event) {
    event.preventDefault();

    const recoverPassword = { email: recoverEmail };

    await userRoutes.recoveryPassword(recoverPassword).catch(error => {
      if (!error.response) return

      if (error.response.data.message) {
        setAlertContent(error.response.data.message);
      } else {
        setAlertContent('Houve um erro ao tentar recuperar a senha.');
      }

      setAlertSeverity('warning');
      setAlert(true);
      setDisableSubmitButton(false)
    }).then(response => {
      if (!response) return
      
      if (response?.status === 200) {
        openRecoverPasswordModal(false)
        setRecoverPasswordResponse('Um e-mail de recuperação de senha foi enviado a você.')
      }
    });
  }

  const handleCadastreSeButton = () => history.push('/sign-up');

  return (
    <>
      <div id="alert">
        {alert ?
          <Alert
            severity={alertSeverity}
            onClose={() => { setAlert(false); }}
          >{alertContent}</Alert> : <></>}
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
              <LoginIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Endereço de e-mail'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Senha'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={disableSubmitButton}
              >
                Fazer login
              </Button>
              <Grid container>
                <Grid item xs>
                  <MUILink href='#' variant='body2' onClick={handleOpenRecoverPasswordModal}>
                    Esqueceu sua senha?
                  </MUILink>
                </Grid>
                <Grid item>
                  <MUILink
                    href='#'
                    variant='body2'
                    onClick={handleCadastreSeButton}
                  >
                    Cadastre-se aqui
                  </MUILink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* modal de recuperar a senha */}
          <Modal
            open={openRecoverPasswordModal}
            onClose={handleCloseRecoverPasswordModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Recuperar senha
              </Typography>
              <Typography id="modal-modal-description" component={'span'} sx={{ mt: 2 }}>
                <Box
                  component='form'
                  onSubmit={handleRecoverUserPassword}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='recoverEmail'
                    label='E-mail'
                    type='recoverEmail'
                    id='recoverEmail'
                    autoComplete='recoverEmail'
                    value={recoverEmail}
                    onChange={handleChangeRecoverEmailField}
                  />

                  {recoverPasswordResponse ?
                    <Typography id="modal-modal-title" component="h2">
                      Recuperar senha
                    </Typography> : <></>
                  }

                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >Confirmar recuperação de senha</Button>
                </Box>
              </Typography>
            </Box>
          </Modal>
        </Container>
      </ThemeProvider>
      <Box sx={{ marginTop: "331px" }}>
        <FooterMenu />
      </Box>
    </>
  );
}
