const messagesEl = document.querySelector('#chat-content');
const inputElement = document.querySelector('#inputMessage');
const inputName = document.querySelector('#inputName');
const sendMessageButton = document.querySelector('#sendMessageButton'); // Agregado

socket.emit('request-messages');

// Cambio en el título del chat
const chatTitle = document.querySelector('.card-title');
chatTitle.innerHTML = '<strong>Epic Game World Chat</strong>'; // Cambia el contenido del título
chatTitle.style.fontSize = '1.5rem'; // Cambia el tamaño de fuente
chatTitle.style.margin = '0'; // Elimina el margen superior

const appendMessageElement = (own, user, time, msg, isNewMessage) => {
  const div = document.createElement('div');
  div.classList.add('media');
  div.classList.add('media-chat');
  const style = own ? null : `style="background-color: ${isNewMessage ? 'pink' : 'powderblue'}"`;
  const formattedUser = user.toUpperCase(); // Convierte el nombre de usuario a mayúsculas
  div.innerHTML = `<div class="media-body">
                    <p ${style}><span class="text-dark user">${formattedUser}:</span> ${msg}</p>
                    <p class="meta"><time datetime="2018" class="message-time">${time}</time></p>
                  </div>`;

  messagesEl.appendChild(div);

  setTimeout(() => {
    messagesEl.scrollTo(0, messagesEl.scrollHeight);
  }, 250);
};

let currentMessages = [];

socket.on('all-messages', (messagesList) => {
  currentMessages = messagesList;
  currentMessages.forEach((element) => {
    appendMessageElement(false, element.user, element.datetime, element.text, false);
  });
});

socket.on('receive-message', (msg) => {
  appendMessageElement(false, msg.user, msg.datetime, msg.message, false);
});

// Agregado: escuchar el evento de clic del botón de enviar
sendMessageButton.addEventListener('click', () => {
  const inputValue = inputElement.value;
  const inputNameValue = inputName.value;

  if (inputNameValue && inputValue) {
    const fecha = new Date();
    const datetime = fecha.toLocaleTimeString('en-US');

    const msg = { user: inputNameValue, message: inputValue, datetime: datetime };

    socket.emit('send-message', msg);
    inputElement.value = ''; // Limpia el campo de mensaje
    appendMessageElement(true, inputNameValue, datetime, inputValue, true); // Nuevo mensaje en rosa
  }
});

inputElement.addEventListener('keyup', ({ key, target }) => {
  if (key !== 'Enter') {
    return;
  }

  const { value } = target;

  if (!value) {
    return;
  }

  const inputNameValue = inputName.value;

  if (inputNameValue) {
    const fecha = new Date();
    const datetime = fecha.toLocaleTimeString('en-US');

    const msg = { user: inputNameValue, message: value, datetime: datetime };

    socket.emit('send-message', msg);
    target.value = '';
    appendMessageElement(true, inputNameValue, datetime, value, true); // Nuevo mensaje en rosa
  }
});

// Estilos CSS en línea
const styles = `
.user {
  font-weight: bold;
  color: #6c757d;;
}

.media-body p {
  margin: 0;
}

.message-time {
  color: #888;
  font-size: 12px;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
