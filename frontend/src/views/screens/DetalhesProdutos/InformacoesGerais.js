import { useState, useEffect } from 'react';
import { Button, Typography, Box } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { getById } from '../../../services/product';

export default function InformacoesGerais({ productId }) {
    const [product, setProduct] = useState({});

    useEffect(() => {
      async function getProductById() {      
        const productNew = await getById(productId);
        setProduct(productNew);
      }

      getProductById();
    }, []);

    return (
        <Box>
            <Button startIcon={<ChatIcon/>}    >
                Entrar em contato
                
            </Button>
            <Button endIcon={<PermIdentityIcon/>}>
                Visitar perfil
            </Button>
            <Typography sx={{ marginTop: '10px', marginRight: '20px' }}>
                {product.description}
            </Typography>
        </Box>
    );
}
