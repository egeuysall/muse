package routes

import (
	"fmt"
	"github.com/egeuysall/muse/api"
	"net/http"
)

// Purpose: Central place to bind URLs to handler functions.

func SetupRoutes(apiKey string) {
	http.HandleFunc("/", api.HandleRoot)
	http.HandleFunc("/share", api.HandleIdea(apiKey))

	fmt.Println("Server is running on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
		return
	}
}
