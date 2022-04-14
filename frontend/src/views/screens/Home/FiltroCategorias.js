import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Categorias = {
  1: "Banco de Dados",
  2: "Contabilidade",
  3: "Logística",
  4: "Marketing",
  5: "Produção",
  6: "Recursos Humanos",
  7: "Vendas",
}

export default function FiltroCategoriaMenu() {
  var [value, setValue] = React.useState(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const clearAll =  (event, newValue) => {
    setValue(-1);
  };

 

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
      
      <Tabs value={value} onChange={handleChange} centered>
        <IconButton onClick={clearAll}>
        <ClearIcon fontSize="large"/>
        </IconButton>
        <Tab label={Categorias[1]} />
        <Tab label={Categorias[2]} />
        <Tab label={Categorias[3]}/>
        <Tab label={Categorias[4]} />
        <Tab label={Categorias[5]}/>
        <Tab label={Categorias[6]} />
        <Tab label={Categorias[7]} />
      </Tabs>
    </Box>
  );
}
