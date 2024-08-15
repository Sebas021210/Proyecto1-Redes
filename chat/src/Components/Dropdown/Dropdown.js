import React, { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiEyeSettings } from '@mdi/js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import { styled } from '@mui/material/styles';

const CustomDialog = styled(Dialog)(({ theme, dialogHeight }) => ({
    '& .MuiDialog-paper': {
        width: '600px',
        maxWidth: '80vw',
        height: dialogHeight,
        transition: 'height 0.3s ease-in-out',
    },
}));

function DropdownStatus() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dialogHeight, setDialogHeight] = useState('300px');

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
            setDialogHeight('430px');
        } else {
            setDialogHeight('300px');
        }
    }, [dropdownOpen]);

    return (
        <div>
            <button className="iconButton" onClick={handleOpenDialog}>
                <Icon path={mdiEyeSettings} size={1.2} color="#7B8990" />
            </button>
            <CustomDialog
                open={openDialog}
                onClose={handleCloseDialog}
                dialogHeight={dialogHeight}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleCloseDialog();
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
                            Disponibilidad
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Disponible</Dropdown.Item>
                            <Dropdown.Item>Ausente</Dropdown.Item>
                            <Dropdown.Item>No disponible</Dropdown.Item>
                            <Dropdown.Item>Ocupado</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="userStatus"
                        name="userStatus"
                        label="Mensaje de estado..."
                        type="name"
                        fullWidth
                        variant="standard"
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
