package db

import "github.com/nedpals/supabase-go"

var Client *supabase.Client

func InitSupabase(url, key string) {
	Client = supabase.CreateClient(url, key)
}.
