package api

import (
	"encoding/json"
	"fmt"
	"github.com/egeuysall/muse/db"
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

			data := map[string]interface{}{
				"title":       newIdea.Title,
				"description": newIdea.Description,
				"category":    newIdea.Category,
				"first_name":  newIdea.FirstName,
				"last_name":   newIdea.LastName,
				"date":        Formatted,
			}

			err = db.InsertIdea(data)
			if err != nil {
				http.Error(w, "Failed to insert idea: "+err.Error(), http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(newIdea)
		} else if r.Method == http.MethodGet {
			ideas, err := db.GetIdeas()
			if err != nil {
				http.Error(w, "Failed to fetch ideas: "+err.Error(), http.StatusInternalServerError)
				return
			}

			if len(ideas) == 0 {
				_, err := fmt.Fprintln(w, "API is currently empty. You can create a POST request with your API key.")
				if err != nil {
					fmt.Println("Failed to write response:", err)
					return
				}
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(ideas)
			}
		} else {
			http.Error(w, "Only POST and GET methods are allowed", http.StatusMethodNotAllowed)
		}
	}
}
