package db

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

var (
	supabaseUrl string
	supabaseKey string
)

func InitSupabase() {
	supabaseUrl = os.Getenv("SUPABASE_URL")
	supabaseKey = os.Getenv("SUPABASE_API_KEY")

	if supabaseUrl == "" || supabaseKey == "" {
		log.Fatal("Missing SUPABASE_URL or SUPABASE_KEY environment variables")
	}
}

func InsertIdea(data map[string]interface{}) error {
	body, err := json.Marshal(data)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", supabaseUrl+"/rest/v1/ideas", bytes.NewReader(body))
	if err != nil {
		return err
	}

	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", "Bearer "+supabaseKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Prefer", "return=representation")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode >= 300 {
		respBody, _ := io.ReadAll(res.Body)
		return fmt.Errorf("supabase insert failed: %s", string(respBody))
	}

	return nil
}

func GetIdeas() ([]map[string]interface{}, error) {
	req, err := http.NewRequest("GET", supabaseUrl+"/rest/v1/ideas?select=*", nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", "Bearer "+supabaseKey)
	req.Header.Set("Accept", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var ideas []map[string]interface{}
	err = json.NewDecoder(res.Body).Decode(&ideas)
	return ideas, err
}
