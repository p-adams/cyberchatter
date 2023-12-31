const socket = new WebSocket("ws://localhost:8080/ws");

socket.onopen = () => {
  console.log("Connected to Socket.IO");
};

socket.onclose = () => {
  console.log("Disconnected from Socket.IO");
};

socket.onerror = () => {
  console.log("Error from Socket.IO");
};

// Handle form submission
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const messagesList = document.getElementById("message-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value;
  if (message.trim() !== "") {
    socket.send(
      JSON.stringify({
        type: "message",
        data: {
          username: "John Smith",
          content: message,
          timestamp: new Date(),
        },
      })
    );
    input.value = "";
  }
});

// Handle incoming messages
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const li = document.createElement("li");
  li.textContent = message.data.content;
  messagesList.appendChild(li);
};

const authBtn = document.getElementById("authBtn");
const authDialog = document.getElementById("authDialog");
const authDialogClose = document.getElementById("authDialogClose");

authBtn.addEventListener("click", () => {
  authDialog.open = true;
});

authDialogClose.addEventListener("click", () => {
  authDialog.open = false;
});
