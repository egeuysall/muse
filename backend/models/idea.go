package models

// Purpose: Defines the Idea struct.

type Idea struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Category    []string `json:"category"`
	Id          int      `json:"id"`
	FirstName   string   `json:"firstName"`
	LastName    string   `json:"lastName"`
	Date        string   `json:"date"`
}
