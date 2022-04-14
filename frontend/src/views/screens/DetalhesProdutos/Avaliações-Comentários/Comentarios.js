import * as React from 'react';
import { useState } from "react";
import {
  IconButton,
  Rating,
  Badge,
  Typography,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
  styled
} from '@mui/material';
import { DataAtualDoSistema } from "../../../../globalFunction.js";
import { HoraAtualDoSistema } from "../../../../globalFunction.js";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

const text = "Limitado a 250 caracteres"

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 7,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function AlignItemsList() {
  var [countPositive, setCountPos] = useState(0);
  var [countNegative, setCountNeg] = useState(0);

  const positive = () => {
    if (countPositive === 0 && countNegative === 0)
      setCountPos(Math.min(countPositive + 1, 1));
    else
      setCountPos(0)
  }

  const negative = () => {
    if (countNegative === 0 && countPositive === 0)
      setCountNeg(Math.min(countNegative + 1, 1));
    else
      setCountNeg(0)
  }

  return (
    <List sx={{ width: '120%', maxWidth: 700, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Guilherme" src="https://i.imgur.com/JAJC3pJ.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Guilherme de Oliveira"

          secondary={
            <React.Fragment>

              <Typography
                sx={{ display: 'flex' }}
                component="body3"
                variant="body3"
                color="text.primary"
              >
                <DataAtualDoSistema /> -  <HoraAtualDoSistema />
              </Typography>
              <Typography sx={{ color: "#1d1f20", marginTop: "5%" }}>{text}</Typography>

              <Typography sx={{ display: 'flex', alignItems: "center", color: '#000', marginTop: "20px" }}>
                Este comentário foi útil?
                <StyledBadge badgeContent={countPositive} color="primary">
                  <IconButton label='increment'>
                    <ThumbUpAltOutlinedIcon onClick={positive} fontSize='small' />
                  </IconButton>
                </StyledBadge>
                <StyledBadge badgeContent={countNegative} color="primary">
                  <IconButton>
                    <ThumbDownOffAltOutlinedIcon onClick={negative}
                      fontSize='small' />
                  </IconButton>
                </StyledBadge>
              </Typography>

            </React.Fragment>
          }
        />
        <Rating sx={{ marginTop: "20px" }}
          name="read-only"
          readOnly
          value={0}>

        </Rating>
      </ListItem>
      <Divider variant="inset" component="li" />

    </List>
  );
}