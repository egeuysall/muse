package main

import (
	"fmt"
	"github.com/egeuysall/muse/config"
	"github.com/egeuysall/muse/routes"
)

func main() {
	config.LoadEnv()
	apiKey := config.GetAPIKey()
	if apiKey == "" {
		fmt.Println("API key is missing.")
		return
	}

	routes.SetupRoutes(apiKey)
}
