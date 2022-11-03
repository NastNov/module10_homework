const wsUri = "wss://echo-ws-service.herokuapp.com/";

function pageLoaded() {
  
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const geoBtn = document.querySelector(".geo");
  
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
  
  geoBtn.addEventListener("click", sendGeolocation);
  
  function sendGeolocation() {
    const geoHref = document.createElement("a");
    geoHref.href = "";
    geoHref.textContent = "";
    if (!navigator.geolocation) {
      infoOutput.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
      infoOutput.textContent = "Определение местоположения…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  
  const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    infoOutput.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    geoHref.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    geoHref.textContent = "Ссылка на карту";
    geoHref.target = "_blank";
    chatOutput.appendChild(geoHref);
  };
  
  const error = () => {
    infoOutput.textContent = "Невозможно получить ваше местоположение";
  };
  
};

document.addEventListener("DOMContentLoaded", pageLoaded);
