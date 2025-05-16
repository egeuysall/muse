package routes

import (
	"fmt"
	"github.com/egeuysall/muse/api"
	"net/http"

	"github.com/egeuysall/muse/middleware"
)

// Purpose: Central place to bind URLs to handler functions.

func SetupRoutes(apiKey string) {
	rateLimiter := middleware.NewRateLimiter(1, 3)

	http.HandleFunc("/", middleware.Cors(rateLimiter.Limit(api.HandleRoot)))
	http.HandleFunc("/ideas", middleware.Cors(rateLimiter.Limit(api.HandleIdea(apiKey))))
	http.HandleFunc("/categories", middleware.Cors(rateLimiter.Limit(api.HandleCategories)))
	http.HandleFunc("/recents", middleware.Cors(rateLimiter.Limit(api.HandleRecents)))

	fmt.Println("Server is running on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
		return
	}
}
