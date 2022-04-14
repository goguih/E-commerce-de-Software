import * as React from "react";
import { Stack, Rating, Typography } from "@mui/material";
import LinearProgressWithLabel from "./BarraDeProgresso";

export default function HalfRating() {
  return (
    <Stack width='112.9%'
      spacing={1}
      sx={{
        marginTop: "-40px",
        borderBottom:'1px solid gray',
        marginLeft: "-45px",
        padding:"0px 0px 10px 20px"
        
      }}
    >
      <Typography >
        <Rating
          name="read-only"
          readOnly
          value={0}
          sx={{
            top: "150px",
            left: "400px",
          }}
        >
        </Rating>
      </Typography>
      <Typography component="h5" > Avaliações{'(Qtd de avaliação)'} </Typography>
      <Typography display='flex'>
        {"5 estrelas"}
        <LinearProgressWithLabel />
      </Typography>
      <Typography display="flex">
        {"4 estrelas"}
        <LinearProgressWithLabel />
      </Typography>
      <Typography display="flex">
        {"3 estrelas  "}
        <LinearProgressWithLabel />
      </Typography>
      <Typography display="flex">
        {"2 estrelas"}
        <LinearProgressWithLabel />
      </Typography>
      <Typography display="flex">
        {"1 estrelas"}
        <LinearProgressWithLabel />
      </Typography>
    </Stack>
  );
}

