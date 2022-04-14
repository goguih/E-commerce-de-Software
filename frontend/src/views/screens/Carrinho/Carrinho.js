import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import {
  TextField,
  Box,
  Button,
  Typography
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShowCardProduct from "./CardProduct";
import DisableElevation from "./Meujs";
import FooterMenu from "../Footer/Footer";
import { deleteAllCart } from '../../../services/user';

import './Carrinho.css'

import * as userRoutes from '../../../services/user';
import * as sessionRoutes from '../../../services/session';

export default function Carrinho() {
  const history = useHistory();

  const [visiblePage, setVisiblePage] = useState(false)

  const [couponName, setCouponName] = useState('')

  const [productsInCart, setProductsInCart] = useState([])
  const [total, setTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0);
  const [cpf, setCpf] = useState('');
  // const [discountValue, setDiscountValue] = useState(0)

  useEffect(async () => {
    loadPage();
    const refresh = await sessionRoutes.refresh();
    setCpf(refresh);
  }, []);

  function loadPage() {
    getUserCpf().then((response) => {
      if (!response) {
        return
      }

      const { cpf } = response

      getUserCart(cpf).then(({ productsInCart }) => {
        setProductsInCart(productsInCart);
        console.log(productsInCart);

        calculateCart(cpf, couponName).then(({ total, subTotal, discountValue }) => {
          setSubTotal(subTotal)
          setTotal(total)

          setVisiblePage(true)
        })
      });
    });
  }

  async function getUserCpf() {
    return await sessionRoutes.refresh();
  }

  async function getUserCart(cpf) {
    return await userRoutes.getAllCart(cpf);
  }

  async function calculateCart(cpf, couponName) {
    return await userRoutes.calculateCart({ cpf, couponName });
  }

  function handleChangeCouponName(event) {
    const data = event.target;

    if (data.id) {
      const { value } = event.target;

      setCouponName(value);
    }
  }

  function handleCheckoutRedirect() {
    history.push({
      pathname: '/checkout',
      state: {
        subTotal: subTotal,
        total: total
      }
    });
  }

  async function deleteAllCartUser() {
    await deleteAllCart(cpf);
    setProductsInCart([]);
  }

  return (
    <>
      {
        visiblePage ? <>
          <Box
            sx={{
              width: 1300,
              height: 600,
              backgroundColor: "#FFFFFF",
              marginTop: 10,
              marginLeft: 50,
              border: "1px none #E7E6E6",
            }}
          >
            <Box
              sx={{
                width: 1300,
                height: 300,
                backgroundColor: "#FFFFFF",
                marginTop: 0,
                marginLeft: 0,
                border: "1px none #E7E6E6"

              }}
            >
              <Box display="flex">
                <h3>Carrinho de compras</h3>
              </Box>
              <Box display="flex">
                <p>{productsInCart.length} produtos no carrinho </p>
                <Button
                  sx={{
                    border: "none",
                    color: "#AAAAAA",
                    marginLeft: "30%"
                  }}
                  startIcon={<DeleteIcon />}
                  onClick={deleteAllCartUser}
                >
                  Esvaziar carrinho
                </Button>

              </Box>
              {productsInCart.map((value) => (
                <div id="card_product" key={value._id}>
                  <ShowCardProduct key={value._id} productInfo={value} />
                </div>
              ))}
              <Box sx={{ marginTop: "-240px", width: "1900px", marginLeft: "-400px" }}>
              </Box>

            </Box>
            <Box
              sx={{
                marginTop: "-17%",
                marginLeft: "70%",
                textAlign: "right"
              }}
            >
              <Typography
                gutterBottom
                variant="h7"
                //visibility="hidden"  
                visibility="visible"
                component="div"
              >
                {total !== subTotal ? <>
                  Total s/ desconto <br />
                  <s> R$ {subTotal.toFixed(2)}</s>
                </>
                  : <></>}

              </Typography>
              <Typography
                gutterBottom
                variant="h3"
                //visibility="hidden" 
                visibility="visible"
                component="div"
              >
                <Typography gutterBottom variant="h6" component="div">
                  TOTAL
                </Typography>
                R$ {total.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "990px",
                marginTop: "5%",
              }}
            >
              <TextField id="cupom" placeholder="Inserir cupom" size="small" onChange={handleChangeCouponName} onBlur={loadPage} />
              <DisableElevation />

              <Button
                sx={{ marginTop: 5, width: 303 }}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleCheckoutRedirect}
              >
                Continuar pagamento
              </Button>

            </Box>
          </Box>
          <FooterMenu/>
        </> : <></>
      }
    </>
  )
}
