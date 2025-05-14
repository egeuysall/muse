package api

import (
	"encoding/json"
	"fmt"
	"github.com/egeuysall/muse/models"
	"net/http"
)

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintln(w, "Welcome to the Muse API. Please go to /share to POST or GET!")
	if err != nil {
		fmt.Println("Failed to write response:", err)
		return
	}
}

func HandleIdea(apiKey string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method == http.MethodPost {
			auth := r.Header.Get("Authorization")
			if auth != "Bearer "+apiKey {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			var newIdea models.Idea
			err := json.NewDecoder(r.Body).Decode(&newIdea)
			if err != nil {
				http.Error(w, "Invalid JSON", http.StatusBadRequest)
				return
			}

			newIdea.Id = len(Ideas) + 1
			newIdea.Date = Formatted
			Ideas = append(Ideas, newIdea)

			w.WriteHeader(http.StatusCreated)
			err = json.NewEncoder(w).Encode(Ideas)
			if err != nil {
				http.Error(w, "Error encoding response", http.StatusInternalServerError)
				return
			}
		} else if r.Method == http.MethodGet {
			w.WriteHeader(http.StatusOK)

			if len(Ideas) != 0 {
				err := json.NewEncoder(w).Encode(Ideas)
				if err != nil {
					http.Error(w, "Error encoding response", http.StatusInternalServerError)
					return
				}
			} else {
				_, err := fmt.Fprintln(w, "API is currently empty. You can create a POST request with your API key.")
				if err != nil {
					fmt.Println("Failed to write response:", err)
					return
				}
			}
		} else {
			http.Error(w, "Only POST and GET methods are allowed", http.StatusMethodNotAllowed)
		}
	}
}
