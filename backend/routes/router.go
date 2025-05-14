package routes

import (
	"fmt"
	"github.com/egeuysall/muse/api"
	"net/http"

	"github.com/egeuysall/muse/middleware"
)

// Purpose: Central place to bind URLs to handler functions.

func SetupRoutes(apiKey string) {
	http.HandleFunc("/", middleware.Cors(api.HandleRoot))
	http.HandleFunc("/share", middleware.Cors(api.HandleIdea(apiKey)))

	fmt.Println("Server is running on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
		return
	}
}
