import * as React from 'react';
import { useHistory } from 'react-router-dom';

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from '@mui/material';

import FormularioPagamento from './FormularioPagamento';

const steps = ['Detalhes de pagamento'];

const theme = createTheme();

export default function Pagamento() {
  const [activeStep, setActiveStep] = React.useState(0);

  const history = useHistory();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormularioPagamento />;
      default:
        throw new Error('Unknown step');
    }
  }

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleHome = () => {
    history.push(
      {
        pathname: '/home',
      }
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
        </AppBar>

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Pagamento
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Compra realizada.
                  </Typography>
                  <Button onClick={handleHome} sx={{ mt: 3, ml: 1 }}>
                    Retornar para home
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Voltar
                      </Button>
                    )}

                    {/* <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Confirmar compra' : 'Continuar'}
                    </Button> */}
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
}