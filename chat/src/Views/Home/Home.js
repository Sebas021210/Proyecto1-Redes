import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "../../Components/Card/Card";
import DropdownStatus from "../../Components/Dropdown/Dropdown";
import Notification from "../../Components/Notification/Notification";
import Icon from '@mdi/react';
import { Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { mdiMessageText, mdiContacts, mdiAccountGroup, mdiCog, mdiAccountStar, mdiClose, mdiSend, mdiPaperclip } from '@mdi/js';
import { client, xml } from '@xmpp/client';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [rotateCog, setRotateCog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const open = Boolean(anchorEl);

    const userConnected = localStorage.getItem('user');
    const passwordConnected = localStorage.getItem('password');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setRotateCog(!rotateCog);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setRotateCog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleCardClick = (contact) => {
        setSelectedContact(contact);
    }

    const handleCardClose = () => {
        setSelectedContact(null);
    }

    const handleLogout = () => {
        const xmppClient = client();
        xmppClient.stop();
        console.log('🔴', 'offline');
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        console.log('xmppClient:', xmppClient);
        navigate('/', { replace: true });
    }

    const handleDeleteAccount = async () => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: userConnected,
            password: passwordConnected,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', async () => {
            console.log('🟢', 'online as', xmppClient.jid.toString());

            try {
                const deleteIQ = xml(
                    'iq',
                    { type: 'set', id: 'delete1' },
                    xml('query', { xmlns: 'jabber:iq:register' }, xml('remove'))
                );

                const response = await xmppClient.send(deleteIQ);

                if (response) {
                    console.log('🟢 Respuesta del servidor:', response.toString());
                } else {
                    console.warn('⚠️ No se recibió respuesta del servidor o respuesta vacía');
                }

                xmppClient.stop();
                console.log('🔴 Cliente desconectado');
                navigate('/', { replace: true });
            } catch (err) {
                console.error('❌ Error al eliminar la cuenta:', err.toString());
            }
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌ Error al iniciar el cliente XMPP:', err.toString());
        }
    };

    const addContact = async (username) => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: userConnected,
            password: passwordConnected,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', async () => {
            console.log('🟢', 'online as', xmppClient.jid.toString());

            try {
                const addContactIQ = xml(
                    'iq',
                    { type: 'set', id: 'addContact1' },
                    xml('query', { xmlns: 'jabber:iq:roster' },
                        xml('item', { jid: `${username}@alumchat.lol`, name: username })
                    )
                );

                await xmppClient.send(addContactIQ);
                const subscribePresence = xml(
                    'presence',
                    { type: 'subscribe', to: `${username}@alumchat.lol` }
                );

                await xmppClient.send(subscribePresence);
                console.log('🟢 Contacto agregado:', username);
                fetchData();
            } catch (err) {
                console.error('❌ Error al agregar contacto:', err.toString());
            } finally {
                xmppClient.stop();
            }
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌ Error al iniciar el cliente XMPP:', err.toString());
        }
    }

    const fetchData = useCallback(async () => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: userConnected,
            password: passwordConnected,
        });

        xmppClient.on('error', err => {
            console.error('❌ Error en XMPP client:', err.toString());
        });

        xmppClient.on('stanza', stanza => {
            console.log('🔄 Stanza recibida:', stanza.toString());

            if (stanza.is('message')) {
                console.log('📩 Stanza de tipo mensaje recibida');
                
                if (!stanza.attrs.type || stanza.attrs.type === 'chat' || stanza.attrs.type === 'normal') {
                    const from = stanza.attrs.from;
                    const body = stanza.getChildText('body');
                    const omemoEvent = stanza.getChild('event', 'http://jabber.org/protocol/pubsub#event');
        
                    if (body) {
                        console.log('🟢 Mensaje de chat recibido:', body);
                        console.log('De:', from);
                        console.log('Cuerpo del mensaje:', body);
                        addMessageToChat(from, body, 'received');
                    } else if (omemoEvent) {
                        console.log('🔒 Mensaje OMEMO recibido');
                        console.log('De:', from);
                        addMessageToChat(from, 'Mensaje OMEMO', 'received');
                    } else {
                        console.log('❌ Mensaje de chat recibido sin cuerpo');
                        addMessageToChat(from, 'Mensaje vacío', 'received');
                    }
                } else {
                    console.log('Mensaje recibido de tipo:', stanza.attrs.type);
                }
            } else if (stanza.is('iq') && stanza.attrs.id === 'getRoster1' && stanza.attrs.type === 'result') {
                const query = stanza.getChild('query', 'jabber:iq:roster');
                if (!query) {
                    console.error('❌ No se encontró el elemento <query> en la respuesta.');
                    return;
                }

                const contactsList = query.getChildren('item').map(item => ({
                    name: item.attrs.name || item.attrs.jid.split('@')[0],
                    jid: item.attrs.jid,
                    status: 'Offline'
                }));

                setContacts(contactsList);
            }
        });

        xmppClient.on('online', async () => {
            console.log('🟢 Conectado como', xmppClient.jid.toString());
            await xmppClient.send(xml('presence'));

            const getRosterIQ = xml(
                'iq',
                { type: 'get', id: 'getRoster1' },
                xml('query', { xmlns: 'jabber:iq:roster' })
            );

            await xmppClient.send(getRosterIQ);
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌ Error al iniciar el cliente XMPP:', err.toString());
        }

        return () => {
            xmppClient.stop()
        }
    }, [userConnected, passwordConnected]);

    useEffect(() => {
        const cleanup = fetchData();
        return () => {
            if (cleanup && typeof cleanup === 'function') {
                cleanup();
            }
        };
    }, [fetchData]);

    const handleAddContact = async (event) => {
        event.preventDefault();
        const username = event.target.usernameContact.value;
        await addContact(username);
        handleCloseDialog();
    }

    const sendMessages = async (message) => {
        if (!selectedContact) return;

        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: userConnected,
            password: passwordConnected,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', async () => {
            try {
                const messageStanza = xml(
                    'message',
                    { type: 'chat', to: selectedContact.jid },
                    xml('body', {}, message)
                );

                await xmppClient.send(messageStanza);
                console.log('🟢 Mensaje enviado:', message);
                addMessageToChat(selectedContact.jid, message, 'sent');
            } catch (err) {
                console.error('❌ Error al enviar mensaje:', err.toString());
            } finally {
                xmppClient.stop();
            }
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌ Error al iniciar el cliente XMPP:', err.toString());
        }
    };

    const addMessageToChat = (jid, message, direction) => {
        setMessages(prevMessages => [...prevMessages, { jid, message, direction }]);
    };

    const handleSendMessage = () => {
        sendMessages(newMessage);
        setNewMessage('');
    };

    return (
        <div className="Home">
            <div className="Navbar"></div>
            <div className="Chat">
                <div className="ChatNavbar">
                    <div className="ChatIcon" style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <button className="iconButton">
                            <Icon path={mdiMessageText} size={1.2} color="#7B8990" />
                        </button>
                    </div>
                    <div className="ContactsIcon">
                        <button className="iconButton" onClick={handleOpenDialog} >
                            <Icon path={mdiContacts} size={1.2} color="#7B8990" />
                        </button>
                        <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            PaperProps={{ component: 'form', onSubmit: handleAddContact, }}
                        >
                            <DialogTitle>Contactos</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Para agregar un contacto, ingresa su nombre de usuario.
                                </DialogContentText>
                                <TextField autoFocus required margin="dense" id="usernameContact" name="usernameContact" label="User Name" type="name" fullWidth variant="standard" />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog} style={{ backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }} >Cancelar</Button>
                                <Button style={{ backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }} type="submit">Agregar contacto</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className="GroupsIcon">
                        <button className="iconButton">
                            <Icon path={mdiAccountGroup} size={1.2} color="#7B8990" />
                        </button>
                    </div>
                    <div className="NotificationIcon">
                        <Notification />
                    </div>
                    <div className="SettingsIcon">
                        <button className="iconButton" onClick={handleClick} style={{ transform: rotateCog ? 'rotate(60deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} >
                            <Icon path={mdiCog} size={1.2} color="#7B8990" />
                        </button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{ 'aria-labelledby': 'basic-button', }}
                            style={{ marginLeft: '40px' }}
                        >
                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                            <MenuItem onClick={handleDeleteAccount}>Eliminar cuenta</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="ChatMessages">
                    <h4>Chats</h4>
                    <div className="ChatInfo">
                        <p> <Icon path={mdiAccountStar} size={1} color="#7B8990" /> {userConnected}</p>
                        <DropdownStatus />
                    </div>
                    <div className="ChatList">
                        {/*{console.log('Contacts:', contacts)}*/}
                        {contacts.length > 0 ? contacts.map(contact => (
                            <div className="ContainerCard" key={contact.jid} onClick={() => handleCardClick(contact)} >
                                <div className="Card">
                                    <ChatCard
                                        name={contact.name}
                                        status={contact.status}
                                        jid={contact.jid}
                                    />
                                </div>
                            </div>
                        )) : <p>No se encontraron contactos...</p>}
                    </div>
                    {selectedContact && (
                        <div className="ChatBox">
                            <div className="ChatBoxHeader">
                                <h5>{selectedContact.name}</h5>
                                <button onClick={handleCardClose}>
                                    <Icon path={mdiClose} size={1} />
                                </button>
                            </div>
                            <div className="ChatBoxMessages">
                                {messages.length > 0 ? messages.filter(message => message.jid === selectedContact.jid).map((message, index) => (
                                    <div key={index} className={message.direction === 'sent' ? 'ChatMessageSent' : 'ChatMessageReceived'}>
                                        <p style={{ position: 'relative', top: '40px', left: '20px' }} >{message.message}</p>
                                    </div>
                                )) : <p style={{ position: 'relative', top: '40px', left: '20px' }} >No hay mensajes...</p>}
                            </div>
                            <div className="ChatBoxInput">
                                <button className="buttonClip" >
                                    <Icon path={mdiPaperclip} size={1} />
                                </button>
                                <textarea placeholder="Escribe tu mensaje aquí..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                                <button className="buttonSend" onClick={handleSendMessage} >
                                    <Icon path={mdiSend} size={1} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
