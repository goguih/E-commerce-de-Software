import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button } from "@mui/material/";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "30%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ Width: 0 }}>
        <Button size="small"
          sx={{
            border: "1px solid gray",
            variant: "body2",
            color: "text.#1976D2"
          }}
        >{`${Math.round(props.value)}%`}</Button>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  return (
    <Box sx={{ width: '80%' }}>
      <LinearProgressWithLabel value={0} />
      {/*Value =  Média de avaliações em cada estrela! */}
    </Box>
  );
}
