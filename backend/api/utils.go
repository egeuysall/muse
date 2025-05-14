package api

import (
	"github.com/egeuysall/muse/models"
	"time"
)

// Purpose: Helper functions used in handlers.

var Ideas = []models.Idea{}

var today = time.Now()
var Formatted = today.Format("January 2, 2006")
