const socket = io();

socket.on("connect", () => {
  console.log("Connected to Socket.IO");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO");
});

// Handle form submission
const form = document.getElementById("messageForm")!;
const input = document.getElementById("messageInput")!;
const messagesList = document.getElementById("message-list")!;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = (input as any).value;
  if (message.trim() !== "") {
    socket.emit("chat_message", {
      type: "message",
      data: { username: "John Smith", content: message, timestamp: new Date() },
    });
    (input as any).value = "";
  }
});

// Handle incoming messages
socket.on("broadcast", (message: any) => {
  const li = document.createElement("li");
  li.textContent = message.data.content;
  messagesList.appendChild(li);
});
