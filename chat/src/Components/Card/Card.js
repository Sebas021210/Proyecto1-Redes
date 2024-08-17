import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@mdi/react';
import { mdiAccountEye } from '@mdi/js';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function ChatCard(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card >
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        {props.name}
                    </Typography>
                    <button onClick={handleClickOpen} style={{ backgroundColor: "transparent", border: "none" }} >
                        <Icon path={mdiAccountEye} size={1.2} color="#7B8990" />
                    </button>
                </div>
                <Typography variant="subtitle2" color="text.secondary">
                    {props.status}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {props.customStatus}
                </Typography>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    sx={{ '& .MuiDialog-paper': { width: '800px', height: '240px' } }}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Información del contacto
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Nombre de usuario: {props.name}
                        </Typography>
                        <Typography gutterBottom>
                            Identificador Jabber (JID): {props.jid}
                        </Typography>
                        <Typography gutterBottom>
                            Status: {props.status}
                        </Typography>
                        <Typography gutterBottom>
                            Mensaje de estado: {props.customStatus}
                        </Typography>
                    </DialogContent>
                </BootstrapDialog>
            </CardContent>
        </Card>
    );
}

export default ChatCard;
