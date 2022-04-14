import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import HoverRating from './Rating';
import { IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function NestedModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleOpen}>Deixar avaliação</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"

            >

                <Box sx={{ ...style, width: 730, height: 400 }}>
                    <Box display="flex">

                        <h2 id="parent-modal-title">Qual a sua avaliação para o aplicativo?</h2>
                        <IconButton sx={{ marginLeft: "8%" }} onClick={handleClose}> <CancelIcon fontSize="large" /></IconButton>
                    </Box>
                    <HoverRating />

                    <TextField sx={{ marginTop: '2%', marginLeft: '35%' }}
                        inputProps={{
                            maxLength: 100,
                        }}
                        id="outlined-multiline-static"
                        label="Deixe seu comentário"
                        multiline
                        rows={6}

                    />
                    <Button sx={{ marginTop: '31%', marginLeft: "-28%" }} variant="contained" onClick={handleClose}>Enviar Avaliação</Button>
                    <Button sx={{marginTop: '31%', marginLeft: "-65%"}}   variant="contained" color="error" onClick={handleClose}>Excluir</Button>
                </Box>
            </Modal>
        </Box>
    );
}
