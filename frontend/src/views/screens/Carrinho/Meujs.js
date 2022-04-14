import React, { useState } from "react";
import Button from "@mui/material/Button";
import Carrinho from "./Carrinho";
import { Alert } from "@mui/material";

export default function DisableElevation() {
  const [text, setText] = useState("Aplicar");
  const click = () => {
    if (text === "Aplicar") {
      setText("Remover");
      <Alert severity="success">Cupom adicionado com sucesso</Alert>
    } else {
      setText("Aplicar");
    }
  };

  return (
    <Button variant="contained" disableElevation onClick={click}>
      {text}
    </Button>
  );
}