import React from "react";
import Icon from '@mdi/react';
import { mdiMessageText } from '@mdi/js';
import { mdiContacts } from '@mdi/js';
import { mdiAccountGroup } from '@mdi/js';
import { mdiCog } from '@mdi/js';
import './Home.css';

function Home() {
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
                        <button className="iconButton">
                            <Icon path={mdiContacts} size={1.2} color="#7B8990" />
                        </button>
                    </div>
                    <div className="GroupsIcon">
                        <button className="iconButton">
                            <Icon path={mdiAccountGroup} size={1.2} color="#7B8990" />
                        </button>
                    </div>
                    <div className="SettingsIcon">
                        <button className="iconButton">
                            <Icon path={mdiCog} size={1.2} color="#7B8990" />
                        </button>
                    </div>
                </div>
                <div className="ChatMessages">
                    <h4>Chats</h4>
                </div>
            </div>
        </div>
    );
}

export default Home;
