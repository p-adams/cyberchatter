// main.go
package main

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/gorilla/websocket"
)

type PageVariables struct {
	Title string
}

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

// HomePage handles requests to the home page.
func HomePage(w http.ResponseWriter, r *http.Request) {
	// Load HTML template
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Variables to be used in the template
	var pageVariables PageVariables
	pageVariables.Title = "CyberChatter"

	// Execute the template
	err = tmpl.Execute(w, pageVariables)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func setupRoutes() {
	http.HandleFunc("/", HomePage)
	// Serve static files
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/ws", handleConnections)
}

func main() {
	setupRoutes()
	fmt.Println("Server is running on :8080")
	http.ListenAndServe(":8080", nil)
}
