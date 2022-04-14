import React, { useState, useEffect } from 'react';
import {
    Typography,
    IconButton,
    Avatar,
    Grid,
    CardMedia,
    Rating,
    Box,
    Button
} from '@mui/material';
import Item from '@mui-treasury/components/flex/Item';
import Row from '@mui-treasury/components/flex/Row';
import Column from '@mui-treasury/components/flex/Column';
import makeStyles from '@material-ui/styles/makeStyles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NestedModal from './ModalAvaliacao';
import { getById } from '../../../services/product';

import * as userRoutes from '../../../services/user';
import * as sessionRoutes from '../../../services/session';

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
        color: '#000',
    },
}));

const BasicProfile = props => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        async function getProductById() {
            const productNew = await getById(props.productId);
            setProduct(productNew);
        }

      getProductById();
    }, []);

    async function getUserCpf() {

        return await sessionRoutes.refresh()
      }

    async function addProductToCart() {
        const { cpf } = await getUserCpf();

        const response = await userRoutes.addCart({"cpf":cpf , "productId": product?._id});
    };

    const styles = useBasicProfileStyles();
    return (
        <Row {...props}>
            <Item marginBottom="20%"><Avatar className={styles.avatar} src="https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png"></Avatar></Item>
            <Item marginBottom="20%" position={'middle'} pl={{ sm: 1.5, lg: 0.5 }}>
                <Typography className={styles.overline}>CRIADOR</Typography>
                <Typography className={styles.name}>{product.advertiser?.name}</Typography>
            </Item>
            <Item marginTop="20%" marginLeft="-20%" position={'left'} mr={1}>
                <Button variant="contained">Comprar</Button>
            </Item>
            <Item marginTop="20%" marginLeft="3%" position={'right'} mr={-4}>
                <Button variant="contained" onClick={addProductToCart()}>Adicionar ao carrinho</Button>
            </Item>
            <Item marginTop="18%" marginLeft="9%">
                <IconButton><FavoriteBorderIcon color="primary" fontSize='large' /></IconButton>
            </Item>
        </Row>
    );
};
const useCardHeaderStyles = makeStyles(() => ({
    root: { paddingBottom: 0 },
    title: {
        fontSize: '1.2rem',
        color: '#000',
        marginLeft: '5%'
    },
    subheader: {
        fontSize: '1rem',
        color: '#343637',
        display: "flex"
    },
}));

const CardHeader = props => {
    const [product, setProduct] = useState({});
    const styles = useCardHeaderStyles();

    useEffect(() => {
        async function getProductById() {      
            const productNew = await getById(props.productId);
            setProduct(productNew);
        }

      getProductById();
    }, []);

    return (
        <Row {...props}>
            <Item position={'middle'}>
                <Typography className={styles.title}>
                    {product.name}
                </Typography>
                <Item position={'center'} className={styles.subheader} component="legend">
                    <Typography marginLeft="5%" >
                        0 avaliações
                    </Typography>
                    <Typography marginLeft="10%">
                        0 pedidos
                    </Typography>
                </Item>
                <Box display="flex">
                    <Rating witdh="10%" name="read-only" value={0} readOnly />
                    <Typography color="#e0ab1a" marginTop="1%"></Typography>
                </Box>
            </Item>

            <Item position={'middle'} mr={8}>

            </Item>
            <Item position={'right'} mr={10}>
                <Typography sx={{ color: "#000" }}
                    variant="h4"
                    component="div">

                    R$ {product.price},00
                </Typography>
                <NestedModal/>
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
        marginRight: '45%',
        marginTop: '5%',

        '&:hover': {
            borderColor: '#5B9FED',

        },
    },
}));

export const ShowCardProduct = ({ productId }) => {
    const styles = useStyles();
    const gap = { xs: 1, sm: 1.5, lg: 2 }

    return (
        <Grid container spacing={4} justify={'center'} marginLeft="30%">
            <Grid item xs={12} sm={8} lg={8.1}>
                <Row className={styles.card} p={{ xs: 0.5, sm: 0.75, lg: 1 }} gap={gap}>
                    <Item grow>
                        <CardMedia
                            component="img"
                            height="280"
                            image='https://cdn.pixabay.com/photo/2020/04/25/12/14/tech-5090539_960_720.jpg'
                            alt="Product"
                        />
                    </Item>
                    <Column>
                        <CardHeader productId={productId} />
                        <BasicProfile position={'bottom'} productId={productId} />
                    </Column>
                </Row>
            </Grid>
        </Grid>
    );
}