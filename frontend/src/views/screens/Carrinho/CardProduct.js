import React from 'react';
import {
  Typography,
  IconButton,
  Avatar,
  Grid,
  CardMedia,
  Rating
} from '@mui/material';
import Item from '@mui-treasury/components/flex/Item';
import Row from '@mui-treasury/components/flex/Row';
import Column from '@mui-treasury/components/flex/Column';
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import makeStyles from '@material-ui/styles/makeStyles';

const useBasicProfileStyles = makeStyles(({ palette }) => ({
  avatar: {
    borderRadius: 100,
    backgroundColor: '#C7BCBC',
  },
  overline: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#000000',
  },
  name: {
    fontSize: 14,
    fontWeight: 100,
    color: '#1976D2',
  },
}));

const BasicProfile = (props) => {
  const productInfo = props.productInfo;
  const styles = useBasicProfileStyles();
  return (
    <Row {...props}>
      <Item><Avatar className={styles.avatar} src="https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png"></Avatar></Item>
      <Item position={'middle'} pl={{ sm: 0.5, lg: 0.5 }}>
        <Typography className={styles.overline}>CRIADOR</Typography>
        <Typography className={styles.name}>{productInfo.advertiser.name}</Typography>
      </Item>
    </Row>
  );
};
const useCardHeaderStyles = makeStyles(() => ({
  root: { paddingBottom: 0 },
  title: {
    fontSize: '1.25rem',
    color: '#1976D2',
  },
  subheader: {
    fontSize: '0.75rem',
    color: '#1976D2',
  },
}));

const CardHeader = props => {
  const productInfo = props.productInfo

  const styles = useCardHeaderStyles();
  return (
    <Row {...props}>
      <Item position={'middle'}>
        <Typography className={styles.title}>
          {productInfo.name}
        </Typography>
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={productInfo.rating} readOnly />
      </Item>
      <Item position={'right'} mr={5}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Item>
      <Item position={'right'} mr={5}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            color: "#1976D2",
          }}
        >
          {"R$ " + productInfo.price.toFixed(2)}
          <LocalOfferIcon />
        </Typography>

      </Item>
    </Row>

  );
};

const useStyles = makeStyles(() => ({
  card: {
    border: '2px solid',
    borderColor: '#C3D2E0',
    borderRadius: 16,
    transition: '0.4s',
    '&:hover': {
      borderColor: '#5B9FED',
    },
  },
}));

export const ShowCardProduct = React.memo(function ShowcaseCard({ productInfo }) {
  const styles = useStyles();
  const gap = { xs: 1, sm: 1.5, lg: 2 }
  debugger;
  return (
    <Grid container spacing={4} justify={'center'}>
      <Grid item xs={12} sm={8} lg={7}>
        <Row className={styles.card} p={{ xs: 0.5, sm: 0.75, lg: 1 }} gap={gap}>
          <Item grow>
            <CardMedia
              component="img"
              height="130"
              image="https://cdn.pixabay.com/photo/2020/04/25/12/14/tech-5090539_960_720.jpg"
              alt={productInfo.name}
            />
          </Item>
          <Column>
            <CardHeader productInfo={productInfo} />
            <BasicProfile position={'bottom'} productInfo={productInfo} />
          </Column>
        </Row>
      </Grid>
    </Grid>
  );
});
export default ShowCardProduct


