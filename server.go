// main.go
package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

/*
// TODO: port to Go
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("authenticate", () => {});


    socket.on("chat_message", (message: Message) => {
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


*/

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			return
		}
		fmt.Println(string(p))

		err = conn.WriteMessage(messageType, p)
		if err != nil {
			return
		}
	}
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})
	http.HandleFunc("/ws", handleConnections)
}

func main() {
	setupRoutes()
	fmt.Println("Server is running on :8080")
	http.ListenAndServe(":8080", nil)
}
