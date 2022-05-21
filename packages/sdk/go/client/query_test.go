package client

import (
	"fmt"
	"testing"

	"github.com/kontenbase/kontenbase/options"
)

var queryClient = NewQueryClient("https://api.kontenbase.com/query/api/v1/"+apiKey+"/Movies", map[string]string{
	"Authorization": "Bearer " + token,
})

func TestFind(t *testing.T) {
	resp, err := queryClient.Find()

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestGetByID(t *testing.T) {
	resp, err := queryClient.GetByID("626a08adf0abea5167c24437")
	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestCreate(t *testing.T) {
	resp, err := queryClient.Create(map[string]interface{}{
		"name":  "create from sdk",
		"notes": "hehe",
	})

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestUpdate(t *testing.T) {
	resp, err := queryClient.UpdateByID("6285bb745150307f850c7ef4", map[string]interface{}{
		"name": "update from sdk",
	})

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestDelete(t *testing.T) {
	resp, err := queryClient.DeleteByID("6285bb745150307f850c7ef4")

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestCount(t *testing.T) {
	resp, err := queryClient.Count()

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestBuildQuery(t *testing.T) {
	opts := options.Find().SetLimit(10).SetSelect([]interface{}{"name", "notes"}).SetSkip(2).SetWhere(map[string]interface{}{
		"name": "hehe",
		"number": map[string]interface{}{
			"$gte": 10,
		},
	})

	client := NewQueryClient("", nil)
	fmt.Println(client.filter(opts))
}
