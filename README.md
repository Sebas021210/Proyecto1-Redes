# Chat App - React & XMPP.js

This project involves implementing an instant messaging client that supports the XMPP protocol. It was developed in React using the XMPP.js library.

## Features

- **User Interface**: Simple and user-friendly interface, with a contact list and a chat area.
- **Contact List**: Add and view contacts in your list with their information.
- **Real-Time Messaging**: Send and receive messages instantly using the XMPP protocol.
- **Presence State Management**: Update and display presence status (available, away, busy, etc.) for each contact.
- **File Transfer**: Supports sending and receiving files encoded in base64, with the specified MIME type.
- **Notifications**: Visual and sound notifications when a new message or contact request is received.
- **Contact Request Management**: Accept or reject contact requests and handle multiple notifications.

## Implemented Functionalities

1. **Authentication and Connection**: Users can log in to their XMPP account and connect to the server.
2. **Account Registration and Deletion**: Create and delete user accounts.
3. **Contact Management**: View the contact list with their names and current statuses.
4. **Message Sending**: Users can send text messages and see messages received in real-time.
5. **File Transfer**: Support for sending files in base64 format with MIME type identification.
6. **Notifications**: Notification system to alert the user about new messages or contact requests.
7. **Presence States**: Users can change their presence state and see the state of other users.

## Requirements

Before installing and running the application, make sure you have the following:

- **Node.js**: You need to have Node.js installed on your system. You can check if it is installed by running `node -v` in your terminal. If you don't have it, follow the instructions on the [official Node.js page](https://nodejs.org/) to install it.

## Installation

Follow the steps below to install and run the application on your device:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sebas021210/Proyecto1-Redes.git
   cd chat
   ```
2. **Install Dependencies**
   Once you have Node.js installed, run the following command to install all project dependencies:
   ```bash
   npm install
   ```
3. **Start the Application**
   ```bash
   npm start
   ```

## Usage

- Log In: Enter your username and password to connect to the XMPP server.
- Account Registration: Enter your username, full name, email, and password to create your user on the XMPP server.
- Log Out and Delete Account: Click on the settings icon at the top to log out or delete the account.
- Add Contact: Click on the new contact icon and enter the username.
- Contact Information: Click on the options icon in the contact list to view the selected contact's information.
- Send Messages: Select a contact from the list and send messages using the input box.
- Send Files: Click on the clip icon to attach and send a file.
- Change Status: Click on the status settings icon and change your presence status using the dropdown menu or by adding a status message.
- Manage Notifications: Respond to contact requests directly from the notifications icon.

## Author
Sebastián José Solorzano Pérez
