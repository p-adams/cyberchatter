const socket = io();

socket.on("connect", () => {
  console.log("Connected to Socket.IO");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO");
});

// Handle form submission
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const messagesList = document.getElementById("message-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value;
  if (message.trim() !== "") {
    socket.emit("chat message", message);
    input.value = "";
  }
});

// Handle incoming messages
socket.on("chat message", (message) => {
  const li = document.createElement("li");
  li.textContent = message;
  messagesList.appendChild(li);
});
