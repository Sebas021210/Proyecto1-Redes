import React, { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiEyeSettings } from '@mdi/js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import { styled } from '@mui/material/styles';
import { client, xml } from '@xmpp/client';

const CustomDialog = styled(Dialog)(({ theme, dialogheight }) => ({
    '& .MuiDialog-paper': {
        width: '600px',
        maxWidth: '80vw',
        height: dialogheight,
        transition: 'height 0.3s ease-in-out',
    },
}));

function DropdownStatus() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dialogheight, setdialogheight] = useState('300px');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const username = localStorage.getItem('user');
    const password = localStorage.getItem('password');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDropdownOpen(false);
    };

    const handleDropdownToggle = (isOpen) => {
        setDropdownOpen(isOpen);
    };

    useEffect(() => {
        if (dropdownOpen) {
            setdialogheight('430px');
        } else {
            setdialogheight('300px');
        }
    }, [dropdownOpen]);

    const handleConfirm = async () => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: username,
            password: password,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', async (address) => {
            console.log('🟢', 'online as', address.toString());

            const presence = xml(
                'presence',
                {},
                xml('show', {}, selectedStatus),
                xml('status', {}, statusMessage)
            );

            try {
                await xmppClient.send(presence);
                console.log('🟢 Status updated successfully');
                console.log('🟢', 'Presence:', presence.toString());
            } catch (err) {
                console.error('❌ Error sending presence:', err.toString());
            }
        });

        xmppClient.on('offline', () => {
            console.log('🔴 Disconnected from XMPP server');
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌ Error starting XMPP client:', err.toString());
        }
    };

    return (
        <div>
            <button className="iconButton" onClick={handleOpenDialog}>
                <Icon path={mdiEyeSettings} size={1.2} color="#7B8990" />
            </button>
            <CustomDialog
                open={openDialog}
                onClose={handleCloseDialog}
                dialogheight={dialogheight}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleConfirm();
                    },
                }}
            >
                <DialogTitle>Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecciona tu disponibilidad o escribe un mensaje de estado.
                    </DialogContentText>
                    <Dropdown
                        onToggle={handleDropdownToggle}
                        style={{ marginTop: '20px' }}
                    >
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            style={{ backgroundColor: 'transparent', color: '#000', borderColor: '#000', opacity: '0.8' }}
                        >
                            {selectedStatus === '' ? 'Seleccione un estado' : selectedStatus === 'chat' ? 'Disponible' : selectedStatus === 'away' ? 'Ausente' : selectedStatus === 'xa' ? 'No disponible' : 'Ocupado'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedStatus('chat')}>Disponible</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedStatus('away')}>Ausente</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedStatus('xa')}>No disponible</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedStatus('dnd')}>Ocupado</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="userStatus"
                        name="userStatus"
                        label="Mensaje de estado..."
                        type="text"
                        fullWidth
                        variant="standard"
                        value={statusMessage}
                        onChange={(e) => setStatusMessage(e.target.value)}
                        style={{
                            marginTop: dropdownOpen ? '150px' : '15px',
                            transition: 'margin-top 0.3s ease-in-out'
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} style={{ backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }}>Cancelar</Button>
                    <Button style={{ backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }} type="submit">Confirmar</Button>
                </DialogActions>
            </CustomDialog>
        </div>
    );
}

export default DropdownStatus;
