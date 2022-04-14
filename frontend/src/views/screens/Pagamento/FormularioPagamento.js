import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Typography, Grid, TextField, Box, Button, Alert, Modal, DialogActions } from '@mui/material';
import * as paymentRoutes from '../../../services/payment';
import * as sessionRoutes from '../../../services/session';
import * as userRoutes from '../../../services/user';
import { useHistory, useLocation } from 'react-router';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FormularioPagamento() {
  const history = useHistory();
  const location = useLocation();

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [visiblePage, setVisiblePage] = useState(false);

  const [productsInCart, setProductsInCart] = useState([]);

  const [openConfirmCheckoutModal, setOpenConfirmCheckoutModal] = useState(false);

  const [disableButton, setDisableButton] = useState(false);

  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!!location.state) {
      if (location.state.total) setTotal(location.state.total)
      if (location.state.subTotal) setSubTotal(location.state.subTotal)
    }
  }, []);

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    // {
    //   cardName: '',
    //   cardNumber: '',
    //   cpf: '',
    //   exp_date: '',
    //   cvv: '',
    // }
    {
      cardName: 'Matheus',
      cardNumber: '123',
      cpf: '123',
      expDate: '123',
      cvv: '123',
    }
  );

  function handleChangeField(event) {
    const data = event.target;

    if (data.id) {
      const { id, value } = event.target;

      setInputValues({ ...inputValues, [id]: value });
    }
  }

  function handleSubmit(event) {
    setDisableButton(true)
    event.preventDefault();

    const cardForm = {
      name: inputValues.cardName,
      cpf: inputValues.cpf,
      number: inputValues.cardNumber,
      exp_date: inputValues.expDate,
      cvv: inputValues.cvv,
    }

    checkCard(cardForm).catch(error => {
      if (!error.response) return

      if (error.response.data.message) {
        setAlertContent(error.response.data.message);
      } else {
        setAlertContent('Cartão inválido!');
      }

      setAlertSeverity('warning');
      setAlert(true);

    }).then(response => {
      if (!response) return

      setOpenConfirmCheckoutModal(true)
      getUserCartItens()

      setDisableButton(false)
    });
  };

  async function checkCard(cardForm) {
    return await paymentRoutes.getCard(cardForm)
  }

  async function getUserCartItens() {
    await getUserCpf().then(({ cpf }) => {
      getUserCart(cpf).then(({ productsInCart }) => {
        setProductsInCart(productsInCart)

        setVisiblePage(true)
      });
    });
  };

  async function getUserCpf() {
    return await sessionRoutes.refresh()
  }

  async function getUserCart(cpf) {
    return await userRoutes.getAllCart(cpf)
  }

  function handleCloseConfirmCheckoutModal() {
    setOpenConfirmCheckoutModal(false)
  }

  async function handleConfirmCheckout() {
    let userCpf = '';
    await sessionRoutes.refresh().catch(async (error) => {
      if (!error.response) return

      if (error.response.data.message) {
        setAlertContent(error.response.data.message);
      } else {
        setAlertContent('Houve um erro ao receber dados do usuário.');
      }

      setAlertSeverity('warning');
      setAlert(true);

      handleCloseConfirmCheckoutModal()
    }).then((response) => {
      if (response) {
        const { cpf } = response
        userCpf = cpf
      }
    });

    const createPaymentBody = {
      cpf: userCpf,
      cardNumber: inputValues.cardNumber,
      total: total
    }

    await paymentRoutes.create(createPaymentBody).catch(async (error) => {
      if (!error.response) return

      if (error.response.data.message) {
        setAlertContent(error.response.data.message);
      } else {
        setAlertContent('Houve um erro ao finalizar a compra.');
      }

      setAlertSeverity('warning');
      setAlert(true);

      handleCloseConfirmCheckoutModal()
    }).then(response => {
      if (!response) return
      handleCloseConfirmCheckoutModal()
      history.push(
        {
          pathname: '/home',
          state: {
            detail: 'checkoutSucess',
            alertSeverity: 'success',
            alertContent: 'Compra realizada com sucesso!'
          }
        }
      );
    }
    );
  }

  return (
    <>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Método de pagamento
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="cardName"
                label="Nome no cartão"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                value={inputValues.cardName}
                onChange={handleChangeField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Número do cartão"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
                value={inputValues.cardNumber}
                onChange={handleChangeField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cpf"
                label="CPF do titular"
                fullWidth
                autoComplete="cpf"
                variant="standard"
                value={inputValues.cpf}
                onChange={handleChangeField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Data de expiração"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
                value={inputValues.expDate}
                onChange={handleChangeField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Os três dígitos do lado de trás do cartão"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
                value={inputValues.cvv}
                onChange={handleChangeField}
              />
            </Grid>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, ml: 50 }}
              disabled={disableButton}
            >
              Continuar
            </Button>
          </Grid>
          <div id="alert">
            {alert ?
              <Alert
                severity={alertSeverity}
                onClose={() => { setAlert(false); }}
              >{alertContent}</Alert> : <></>}
          </div>
        </Box>

        {visiblePage ?
          <Modal
            open={openConfirmCheckoutModal}
            onClose={handleCloseConfirmCheckoutModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirmar compra
              </Typography>
              <Typography id="modal-modal-description" component={'span'} sx={{ mt: 2 }}>
                Deseja finalizar a compra? <br />

                {productsInCart.map((value) => (
                  <>
                    <li id="lista_produtos" key={value._id}>{value.name} - R$ {value.price.toFixed(2)}</li>
                  </>
                ))}

                <div id="total">
                  <br />
                  {subTotal !== total ? <><li id="sem_desconto"><b>Sem desconto</b>: <s>R$ {subTotal.toFixed(2)}</s></li></> : <></>}
                  <li><b>Total</b>: R$ {total.toFixed(2)}</li>
                </div>

              </Typography>


              <DialogActions>
                <Button color="primary" variant="contained" onClick={handleConfirmCheckout}>
                  Confirmar compra
                </Button>
                <Button color="secondary" variant="contained" onClick={handleCloseConfirmCheckoutModal}>
                  Cancelar
                </Button>
              </DialogActions>
            </Box>
          </Modal>
          : <></>}
      </React.Fragment>
    </>
  );
}