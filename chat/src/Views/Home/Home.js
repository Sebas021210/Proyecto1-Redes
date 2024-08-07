import React from "react";
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <div className="Navbar"></div>
            <div className="Chat">
                <div className="ChatNavbar"></div>
                <div className="ChatMessages">
                    <h4>Chats</h4>
                </div>
            </div>
        </div>
    );
}

export default Home;
