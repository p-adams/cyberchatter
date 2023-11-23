"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const vision_1 = __importDefault(require("@hapi/vision"));
const inert_1 = __importDefault(require("@hapi/inert"));
const ejs_1 = __importDefault(require("ejs"));
const socket_io_1 = require("socket.io");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = hapi_1.default.server({
        port: 3000,
        host: "localhost",
    });
    // Register Vision for template rendering
    yield server.register(vision_1.default);
    // Configure EJS as the template engine
    server.views({
        engines: { ejs: ejs_1.default },
        relativeTo: __dirname,
        path: "views",
        layout: true,
        layoutPath: "views/layout",
    });
    yield server.register(inert_1.default);
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
    const io = new socket_io_1.Server(server.listener);
    io.on("connection", (socket) => {
        console.log("User connected");
        // TODO: implement authentication
        socket.on("authenticate", () => { });
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
            }
            catch (error) {
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
    yield server.start();
    console.log("Server running on %s", server.info.uri);
});
process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
});
init();
