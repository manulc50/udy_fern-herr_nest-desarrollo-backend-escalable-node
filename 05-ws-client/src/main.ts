import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>WebSocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token">
    <button id="btn-connect">Connect</button>
    <br>

    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input id="message-input" type="text" placeholder="message">
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`;

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!); // Viene por defecto con Vite
//connectToServer();
const jwtTokenInput = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  const jwtToken = jwtTokenInput.value.trim();
  if(jwtToken.length === 0)
    return alert('Enter a valid JWT!');

  connectToServer(jwtToken);

  jwtTokenInput.value = '';
});