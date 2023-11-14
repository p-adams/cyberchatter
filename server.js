const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const Ejs = require("ejs");
const SocketIO = require("socket.io");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Register Vision for template rendering
  await server.register(Vision);

  // Configure EJS as the template engine
  server.views({
    engines: { ejs: Ejs },
    relativeTo: __dirname,
    path: "views",
    layout: true,
    layoutPath: "views/layout",
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
  const io = SocketIO(server.listener);

  io.on("connection", (socket) => {
    console.log("User connected");

    // Handle chat messages
    socket.on("chat message", (message) => {
      console.log("Chat message:", message);
      io.emit("chat message", message); // Broadcast the message to all connected clients
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
      return h.view("index", { message: "Hello from Hapi.js!" });
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
