import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiBell, mdiBellBadge } from '@mdi/js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//import { client, xml } from '@xmpp/client';

const DialogNotification = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '600px',
        maxWidth: '80vw',
        height: 'auto',
    },
}));

function Notification() {
    const [openDialog, setOpenDialog] = useState(false);
    const [hasNotifications, /*setHasNotifications*/] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <button className="iconButton" onClick={handleOpenDialog}>
                <Icon path={hasNotifications ? mdiBellBadge : mdiBell} size={1.2} color="#7B8990" />
            </button>
            <DialogNotification
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Notificaciones</DialogTitle>
                <DialogContent>
                    {hasNotifications ? (
                        <Card sx={{ maxWidth: 500 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    sol21826-test1
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    sol21826-test1 quiere agregarte como contacto.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" style={{ color: '#000' }}>Aceptar</Button>
                                <Button size="small" style={{ color: '#000' }}>Rechazar</Button>
                            </CardActions>
                        </Card>
                    ) : (
                        <DialogContentText>
                            No hay notificaciones por el momento.
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} style={{ backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }}>
                        Cerrar
                    </Button>
                </DialogActions>
            </DialogNotification>
        </div>
    );
}

export default Notification;
