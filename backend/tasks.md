# Use these values
- Title
- Description
- Category
- ID, Auto - `len(elements) + 1`
- First Name
- Last Name
- Date, Auto:
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	today := time.Now()
	formatted := today.Format("January 2, 2006") // Go uses this specific date as the formatting model
	fmt.Println(formatted) // e.g., "May 12, 2025"
}
```

[//]: # (TODO: Be sure you meet these)