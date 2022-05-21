package utils

import (
	"fmt"
	"testing"
)

func TestOptions(t *testing.T) {
	q := map[string]interface{}{
		"name": "hehe",
		"number": map[string]interface{}{
			"$gte": 10,
		},
		"$select": []interface{}{"name", "notes"},
		"$limit":  "10",
	}

	qs, _ := Marshal(q)

	fmt.Println(qs)
}
