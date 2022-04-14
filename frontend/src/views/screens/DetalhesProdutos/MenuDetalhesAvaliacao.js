import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HalfRating from "./Avaliações-Comentários/Avaliacoes"
import AlignItemsList from './Avaliações-Comentários/Comentarios'
import StandardImageList from './Prototipo';
import InformacoesGerais from './InformacoesGerais'
import LocalStorage from '../../../LocalStorage';
function TabPanel(props) {
  const { children, value, index, height, ...other } = props;

  return (
    <Typography
      height={height}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 5 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}
export default function FloatingActionButtonZoom({ productId }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 700,
        position: 'sticky',
        minHeight: 100,
        marginTop: "360px",
        left: "50%",
        transform: "translate(-50%,-50%)"

      }}
    >
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"

        >
          <Tab label="Informações gerais" {...a11yProps(0)} />
          <Tab label="Avaliações(3)" {...a11yProps(1)} />
          <Tab label="Protótipos" {...a11yProps(2)} />

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel  height={650}  value={value} index={0} dir={theme.direction} >
          <Box sx={{ marginLeft: "0px", marginTop:'-30px', width: '100%' }}>
        <InformacoesGerais
          productId={LocalStorage.getProductDetails()}
        />
          </Box>
        </TabPanel>
        <TabPanel  height={650}  value={value} index={1} dir={theme.direction} >
          <HalfRating />
          <Box sx={{ marginLeft: "-55px", marginTop: "10px", width: '100%' }}>
            <AlignItemsList />
          </Box>
        </TabPanel>
        <TabPanel height={650}  value={value} index={2} dir={theme.direction}>
        <Typography>
          <StandardImageList/>
          </Typography>
        </TabPanel>
      </SwipeableViews>

    </Box>
  );
}
