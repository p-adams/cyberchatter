import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Ejs from "ejs";
import { Server } from "socket.io";
import Path from "path";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Register Vision for template rendering
  await server.register(Vision);
  console.log("dir: ", Path.join(__dirname, "views"));
  // Configure EJS as the template engine
  server.views({
    engines: { ejs: Ejs },
    relativeTo: Path.join(__dirname, "views"),
    path: "./",
    layout: true,
    layoutPath: "./layout",
  });

  await server.register(Inert);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true,
      },
    },
  });

  // Socket.IO setup
  const io = new Server(server.listener);

  io.on("connection", (socket) => {
    console.log("User connected");
    // TODO: implement authentication
    socket.on("authenticate", () => {});

    // Handle chat messages
    // Protocol Definitions:
    /** Message Types
     * {
        "type": "message",
        "data": {
          "username": string,
          "content": string
          "timestamp": Date
        }
      }
     */
    socket.on("chat_message", (message) => {
      try {
        // TODO: Handle different message types
        switch (message.type) {
          case "message":
            console.log("Chat message:", message);
            io.emit("broadcast", message); // Broadcast the message to all connected clients
            break;
          default:
            console.log("Unknown message type");
            break;
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Route for SSR HTML page
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.view("index", { message: "Welcome to CyberChatter" });
    },
  });

  // Start the server
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
