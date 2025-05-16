package api

import (
	"encoding/json"
	"fmt"
	"github.com/egeuysall/muse/db"
	"github.com/egeuysall/muse/models"
	"net/http"
	"strconv"
)

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed. Only GET is allowed for /", http.StatusMethodNotAllowed)
		return
	}

	_, err := fmt.Fprintln(w, "Welcome to the Muse API. Use /ideas to post or get ideas, /categories to list categories, /recents for latest ideas, and ?limit= to control results.")
	if err != nil {
		fmt.Println("Failed to write response:", err)
	}
}

func HandleCategories(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed. Only GET is allowed for /categories.", http.StatusMethodNotAllowed)
		return
	}

	categoryIDs := []string{
		"creative", "tech", "health", "business", "education", "entertainment",
		"design", "lifestyle", "travel", "science", "food", "community", "culture",
		"innovation", "sports", "arts", "fashion", "gaming", "nature", "adventure",
		"photography", "finance", "startups", "motivation",
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(categoryIDs); err != nil {
		http.Error(w, "Failed to encode categories", http.StatusInternalServerError)
	}
}

func HandleRecents(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed. Only GET is allowed for /recents.", http.StatusMethodNotAllowed)
		return
	}

	ideas, err := db.GetIdeas()
	if err != nil {
		http.Error(w, "Failed to fetch ideas: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if len(ideas) > 10 {
		ideas = ideas[:10]
	}

	if len(ideas) == 0 {
		w.WriteHeader(http.StatusOK)
		_, err := fmt.Fprintln(w, "No recent ideas found. Create some ideas to get started!")
		if err != nil {
			fmt.Println("Failed to write response:", err)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(ideas); err != nil {
		http.Error(w, "Failed to encode ideas", http.StatusInternalServerError)
	}
}

func HandleIdea(apiKey string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		switch r.Method {
		case http.MethodPost:
			auth := r.Header.Get("Authorization")
			if auth != "Bearer "+apiKey {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			var newIdea models.Idea
			if err := json.NewDecoder(r.Body).Decode(&newIdea); err != nil {
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

			if err := db.InsertIdea(data); err != nil {
				http.Error(w, "Failed to insert idea: "+err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusCreated)
			if err := json.NewEncoder(w).Encode(newIdea); err != nil {
				http.Error(w, "Failed to encode response", http.StatusInternalServerError)
			}

		case http.MethodGet:
			ideas, err := db.GetIdeas()
			if err != nil {
				http.Error(w, "Failed to fetch ideas: "+err.Error(), http.StatusInternalServerError)
				return
			}

			limitStr := r.URL.Query().Get("limit")
			if limitStr != "" {
				limit, err := strconv.Atoi(limitStr)
				if err != nil || limit <= 0 {
					http.Error(w, "Limit must be a positive integer", http.StatusBadRequest)
					return
				}
				if limit < len(ideas) {
					ideas = ideas[:limit]
				}
			}

			if len(ideas) == 0 {
				w.WriteHeader(http.StatusOK)
				_, err := fmt.Fprintln(w, "API is currently empty. You can create a POST request with your API key.")
				if err != nil {
					fmt.Println("Failed to write response:", err)
				}
				return
			}

			w.Header().Set("Content-Type", "application/json")
			if err := json.NewEncoder(w).Encode(ideas); err != nil {
				http.Error(w, "Failed to encode ideas", http.StatusInternalServerError)
			}

		default:
			http.Error(w, "Only POST and GET methods are allowed", http.StatusMethodNotAllowed)
		}
	}
}
