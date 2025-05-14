package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatal("No .env.local file found or failed to load.")
	}
}

func GetAPIKey() string {
	return os.Getenv("MUSE_API_KEY")
}
