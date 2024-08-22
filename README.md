# Chat App - React & XMPP.js

Este proyecto consiste en implementar un cliente de mensajería instanánea que soporte el protocolo XMPP, fue desarrollado en React utilizando la biblioteca XMPP.js.

## Características

- **Interfaz de Usuario**: Interfaz simple y fácil de usar, con una lista de contactos y un área de chat.
- **Lista de Contactos**: Agrega y visualiza contactos en tu lista con su información.
- **Mensajería en Tiempo Real**: Envía y recibe mensajes instantáneamente utilizando el protocolo XMPP.
- **Manejo de Estado de Presencia**: Actualiza y muestra el estado de presencia (disponible, ausente, ocupado, etc.) para cada contacto.
- **Envío de Archivos**: Permite el envío y recepción de archivos codificados en base64, con el tipo MIME especificado.
- **Notificaciones**: Notificaciones visuales y sonoras cuando se recibe un nuevo mensaje o una solicitud de contacto.
- **Manejo de Solicitudes de Contacto**: Permite aceptar o rechazar solicitudes de contacto y manejar múltiples notificaciones.

## Funcionalidades Implementadas

1. **Autenticación y Conexión**: Los usuarios pueden iniciar sesión en su cuenta XMPP y conectarse al servidor.
2. **Registro y Eliminación de Cuentas**: Crea y elimina cuentas de usuario.
3. **Gestión de Contactos**: Visualización de la lista de contactos con sus nombres y estados actuales.
4. **Envío de Mensajes**: Los usuarios pueden enviar mensajes de texto y ver los mensajes recibidos en tiempo real.
5. **Envío y Recepción de Archivos**: Soporte para el envío de archivos en formato base64 con identificación del tipo MIME.
6. **Notificaciones**: Sistema de notificaciones para alertar al usuario sobre nuevos mensajes o solicitudes de contacto.
7. **Estados de Presencia**: Los usuarios pueden cambiar su estado de presencia y ver el estado de otros usuarios.

## Requisitos

Antes de instalar y ejecutar la aplicación, asegúrate de tener lo siguiente:

- **Node.js**: Necesitas tener Node.js instalado en tu sistema. Puedes verificar si ya está instalado ejecutando `node -v` en tu terminal. Si no lo tienes, sigue las instrucciones en la [página oficial de Node.js](https://nodejs.org/) para instalarlo.

## Instalación

Sigue los pasos a continuación para instalar y ejecutar la aplicación en tu dispositivo:

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/Sebas021210/Proyecto1-Redes.git
   cd chat
   ```
2. **Instalar Dependencias**
    Una vez que tengas Node.js instalado, ejecuta el siguiente comando para instalar todas las dependencias del proyecto:
   ```bash
   npm install
   ```
3. **Iniciar la Aplicación**
   ```bash
   npm start
   ```

## Uso

- Iniciar Sesión: Introduce tu nombre de usuario y contraseña para conectarte al servidor XMPP.
- Registro Cuenta: Introduce tu nombre de usuario, nombre completo, correo electrónico y contraseña para crear tu usuario en el servidor XMPP.
- Cerrar Sesión y Eliminar Cuenta: Haz clic en el icono de configuraciones en la parte superior para cerrar sesión o eliminar la cuenta.
- Agregar Contacto: Haz clic en el icono de nuevo contacto e introduce el nombre de usuario.
- Información Contacto: Haz clic en el icono de opciones en la lista de contacto y se mostrará la información del contacto seleccionado.
- Enviar Mensajes: Selecciona un contacto de la lista y envía mensajes usando el cuadro de entrada.
- Enviar Archivos: Haz clic en el icono de clip para adjuntar y enviar un archivo.
- Cambiar Estado: Haz clic en el icono de configuración de estado y cambia tu estado de presencia usando el menú desplegable o agregando un mensaje de estado.
- Manejar Notificaciones: Responde a solicitudes de contacto directamente desde el icono de notificaciones.

## Autor
Sebastián José Solorzano Pérez
