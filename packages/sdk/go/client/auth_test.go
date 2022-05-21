package client

import (
	"fmt"
	"testing"
)

var token = "f4dc4b669eab4bbb1df59c082c101b69"
var apiKey = "e5a19548-f88c-40ff-a574-ca91db521474"

var authClient = NewAuthClient("https://api.kontenbase.com/query/api/v1/"+apiKey+"/auth", map[string]string{
	"Authorization": "Bearer " + token,
})

func TestLoginFailed(t *testing.T) {
	resp, err := authClient.Login(LoginParams{
		Email:    "user123@mail.com",
		Password: "user123",
	})

	if err == nil {
		t.Fatal(resp)
	}

	fmt.Println(err)
}

func TestLoginSuccess(t *testing.T) {
	resp, err := authClient.Login(LoginParams{
		Email:    "user@mail.com",
		Password: "user123",
	})

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestGetProfile(t *testing.T) {
	resp, err := authClient.User()
	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestUpdateProfile(t *testing.T) {
	resp, err := authClient.Update(map[string]interface{}{
		"lastName": "updated",
	})
	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}

func TestLogout(t *testing.T) {
	resp, err := authClient.Logout()
	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(resp)
}
