const socket = new WebSocket("ws://localhost:8080/ws");

/**
 *  <script>
      const socket = new WebSocket("ws://localhost:8080/ws");

      socket.onmessage = function (event) {
        const chatbox = document.getElementById("chatbox");
        chatbox.value += event.data + "\n";
      };

      function sendMessage() {
        const messageInput = document.getElementById("message");
        const message = messageInput.value;
        socket.send(message);
        messageInput.value = "";
      }
    </script>
 */

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
    socket.send("chat_message", {
      type: "message",
      data: { username: "John Smith", content: message, timestamp: new Date() },
    });
    input.value = "";
  }
});

// Handle incoming messages
socket.onmessage = (message) => {
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
