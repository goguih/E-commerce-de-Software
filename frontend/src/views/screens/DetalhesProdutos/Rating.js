import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Simplesmente inútil',
  1: 'Terrível, nada do que eu esperava',
  1.5: 'Péssimo',
  2: 'Ruim',
  2.5: 'Médio',
  3: 'Ok, mas poderia ser melhor',
  3.5: 'Ok, está aceitável',
  4: 'Bom',
  4.5: 'Ótimo',
  5: 'Excelente, melhor impossível',
};

export default function HoverRating() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 500,
        display: 'flex',
        alignItems: 'center',
        marginTop:'5%',
        marginLeft:'37%'
      }}
    >
      <Rating 
        name="hover-feedback"
        size="large"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="large" />}
      />
      {value !== null && (
        <Box sx={{ ml: 1, color:'#000', fontWeight:'bold', marginTop:'-70px', marginLeft:'-170px'}}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
