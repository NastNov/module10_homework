const wsUri = "wss://echo-ws-service.herokuapp.com/";

function pageLoaded() {
  
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const geo = document.querySelector(".geo");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  };
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  };
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  };
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  };
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  };
  
};

document.addEventListener("DOMContentLoaded", pageLoaded);
