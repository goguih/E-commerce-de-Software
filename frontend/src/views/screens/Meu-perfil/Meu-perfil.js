import React, { useEffect, useState, useReducer } from "react";

import {
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Alert,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
  Modal,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import * as userRoutes from '../../../services/user';
import * as sessionRoutes from '../../../services/session';

const theme = createTheme();

const defaultInputLabelProps = {
  'shrink': true
}

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

let userCpf = '';

export default function MeuPerfil() {
  const [visiblePage, setVisiblePage] = useState(false);

  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [alert, setAlert] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      last_name: '',
      phone: '',
      birth_date: ''
    }
  );

  const [inputPasswordValues, setInputPasswordValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: '',
      confirmPassword: '',
    }
  );

  const defaultFieldProps = {
    'disabled': !editMode
  }

  useEffect(() => {
    loadUserData()
  }, []);

  async function handleChangeSwitch() {
    setEditMode(!editMode)

    if (editMode) {
      await loadUserData()
    }
  }

  async function loadUserData() {
    setVisiblePage(false)

    await sessionRoutes.refresh().catch((error) => {
      console.log('catch')
      if (error.response) {
        setAlertContent(error.response.data.message);
        setAlertSeverity('warning');
        setAlert(true);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }).then(res => {
      if (!res) return

      const { cpf } = res;
      userCpf = cpf
    });

    await userRoutes.get(userCpf).catch((error) => {
      if (!error.response) return

      if (error.response.data.message) {
        setAlertContent(error.response.data.message);
      } else {
        setAlertContent('Houve um erro ao atualizar o seu perfil.');
      }

      setAlertSeverity('warning');
      setAlert(true);
    }).then(response => {
      if (!response) return
      
      const user = response;

      setInputValues({'name': user.name, 'last_name': user.last_name, 'phone': user.phone, 'birth_date': user.birth_date });
      setVisiblePage(true)
    })
  };

  function handleChangeField(event) {
    const data = event.target;

    if (data.id) {
      const { name, value } = event.target;

      setInputValues({ ...inputValues, [name]: value });
    }
  }

  function handleChangePasswordField(event) {
    const data = event.target;

    if (data.id) {
      const { name, value } = event.target;

      setInputPasswordValues({ ...inputPasswordValues, [name]: value });
    }
  }

  async function handleUpdateUser(event) {
    event.preventDefault();

    const updateUserForm = {
      name: inputValues.name,
      last_name: inputValues.last_name,
      phone: inputValues.phone,
      birth_date: inputValues.birth_date,
    }

    await userRoutes.update(userCpf, updateUserForm).catch((error) => {
      if (error.response) {
        console.log(error)
        setAlertContent(error.response.data.message);
        setAlertSeverity('warning');
        setAlert(true);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }).then(res => {
      if (!res) return

      setAlertContent('Dados atualizados com sucesso!');
      setAlertSeverity('success');
      setAlert(true);

      setEditMode(false);
      handleChangeSwitch()
    })
  }

  async function handleUpdateUserPassword(event) {
    event.preventDefault();

    const updateUserPasswordForm = {
      password: inputPasswordValues.password,
      confirmPassword: inputPasswordValues.confirmPassword,
    }

    await userRoutes.updatePassword(userCpf, updateUserPasswordForm).catch((error) => {
      if (error.response) {
        console.log(error)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }).then(res => {
      if (!res) return

      setAlertContent('Senha atualizada com sucesso!');
      setAlertSeverity('success');
      setAlert(true);

      setOpenChangePasswordModal(false)
    });
  }

  function handleOpenChangePasswordModal() {
    setOpenChangePasswordModal(true);
  }

  function handleCloseChangePasswordModal() {
    setOpenChangePasswordModal(false);
  }

  return (
    <>
      <div id="alert">
        {alert ? <Alert severity={alertSeverity} onClose={() => { setAlert(false); }}>{alertContent}</Alert> : <></>}
      </div>
      <ThemeProvider theme={theme}>
        {visiblePage ? <Container component='main' maxWidth='xs'>
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
              <PersonIcon />
            </Avatar>

            <Typography component='h1' variant='h5'>
              Seu perfil
            </Typography>

            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                onChange={handleChangeSwitch}
                label="Editar dados?"
              />
            </FormGroup>

            <Box
              component='form'
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleUpdateUser}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='name'
                    fullWidth
                    id='name'
                    label='Nome'
                    autoFocus
                    value={inputValues.name}
                    onChange={handleChangeField}
                    InputLabelProps={
                      defaultInputLabelProps
                    }
                    inputProps={
                      defaultFieldProps
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id='last_name'
                    label='Sobrenome'
                    name='last_name'
                    autoComplete='last_name'
                    value={inputValues.last_name}
                    onChange={handleChangeField}
                    InputLabelProps={
                      defaultInputLabelProps
                    }
                    inputProps={
                      defaultFieldProps
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id='phone'
                    label='Telefone'
                    name='phone'
                    autoComplete='phone'
                    value={inputValues.phone}
                    onChange={handleChangeField}
                    InputLabelProps={
                      defaultInputLabelProps
                    }
                    inputProps={
                      defaultFieldProps
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='birth_date'
                    label='Data de nascimento'
                    type='date'
                    id='birth_date'
                    autoComplete='birth_date'
                    value={inputValues.birth_date}
                    onChange={handleChangeField}
                    InputLabelProps={
                      defaultInputLabelProps
                    }
                    inputProps={
                      defaultFieldProps
                    }
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Button id="change_password" variant="outlined" onClick={handleOpenChangePasswordModal}>Alterar senha</Button>
                </Grid>

                {editMode ?
                  <Grid item xs={12} sm={6}>
                    <Button id="salvar" variant="contained" type='submit'>Salvar</Button>
                  </Grid> : <></>
                }

              </Grid>
            </Box>
            <Modal
              open={openChangePasswordModal}
              onClose={handleCloseChangePasswordModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Alterar a senha
                </Typography>
                <Typography id="modal-modal-description" component={'span'} sx={{ mt: 2 }}>
                  <Box
                    component='form'
                    onSubmit={handleUpdateUserPassword}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='password'
                      label='Senha'
                      type='password'
                      id='password'
                      autoComplete='current-password'
                      value={inputValues.password}
                      onChange={handleChangePasswordField}
                    />
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='confirmPassword'
                      label='Confirmar senha'
                      type='password'
                      id='confirmPassword'
                      autoComplete='confirmPassword'
                      value={inputValues.confirmPassword}
                      onChange={handleChangePasswordField}
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                    >Confirmar</Button>
                  </Box>
                </Typography>
              </Box>
            </Modal>
          </Box>
        </Container>
          : <></>}
      </ThemeProvider>
    </>
  );
}
