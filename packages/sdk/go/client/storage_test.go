package client

import (
	"fmt"
	"os"
	"testing"
)

func TestUpload(t *testing.T) {
	client := NewStorageClient("https://api.kontenbase.com/query/api/v1/"+apiKey, authClient)

	file, err := os.Open("../test/icon.png")
	if err != nil {
		t.Fatal(err)
	}

	defer file.Close()

	resp, err2 := client.Upload(file)
	if err2 != nil {
		t.Fatal(err2)
	}

	fmt.Println(resp)
}
