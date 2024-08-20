import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiBell, mdiBellBadge } from '@mdi/js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { client, xml } from '@xmpp/client';

const DialogNotification = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '600px',
        maxWidth: '80vw',
        height: 'auto',
    },
}));

function Notification({ notifications, setNotifications }) {
    const [openDialog, setOpenDialog] = useState(false);
    const userConnected = localStorage.getItem('user');
    const passwordConnected = localStorage.getItem('password');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAccept = (index) => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: userConnected,
            password: passwordConnected,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', address => {
            const acceptPresence = xml('presence', { to: notifications[index].from, type: 'subscribed' });
            xmppClient.send(acceptPresence);
            console.log('Se ha aceptado la solicitud de amistad de', notifications[index].from);
        });

        try {
            xmppClient.start();
        } catch (err) {
            console.error('❌', err.toString());
        }
    };

    const handleReject = (index) => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: userConnected,
            password: passwordConnected,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', address => {
            const rejectPresence = xml('presence', { to: notifications[index].from, type: 'unsubscribed' });
            xmppClient.send(rejectPresence);
            console.log('Se ha rechazado la solicitud de amistad de', notifications[index].from);
        });

        try {
            xmppClient.start();
        } catch (err) {
            console.error('❌', err.toString());
        }
    };

    return (
        <div>
            <button className="iconButton" onClick={handleOpenDialog}>
                <Icon path={notifications.length > 0 ? mdiBellBadge : mdiBell} size={1.2} color="#7B8990" />
            </button>
            <DialogNotification open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Notificaciones</DialogTitle>
                <DialogContent>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <Card key={index} sx={{ maxWidth: 500 }} style={{marginBottom: '10px'}} >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {notification.from}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {notification.message}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" style={{ color: '#000' }} onClick={() => handleAccept(index)}>Aceptar</Button>
                                    <Button size="small" style={{ color: '#000' }} onClick={() => handleReject(index)}>Rechazar</Button>
                                </CardActions>
                            </Card>
                        ))
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
