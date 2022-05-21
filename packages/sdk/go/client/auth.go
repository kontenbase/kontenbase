package client

import (
	"github.com/kontenbase/kontenbase/options"
	"github.com/kontenbase/kontenbase/utils"
)

type AuthClient struct {
	url          string
	headers      map[string]string
	currentToken string

	httpClient *HTTPClient
}

func NewAuthClient(url string, headers map[string]string) *AuthClient {
	if headers == nil {
		headers = map[string]string{}
	}

	client := &AuthClient{
		url:          url,
		headers:      headers,
		currentToken: "",
	}

	client.httpClient = NewHTTPClient(client.url, nil)

	return client
}

func (a *AuthClient) getHeaders() map[string]string {
	headers := a.headers
	authBearer := a.Token()

	if authBearer != "" {
		headers["Authorization"] = "Bearer " + authBearer
	}

	return headers
}

func (a *AuthClient) Token() string {
	return a.currentToken
}

func (a *AuthClient) SaveToken(token string) {
	a.currentToken = token
}

func (a *AuthClient) filter(opts *options.UserOptions) string {
	filter := map[string]interface{}{}

	if opts.Lookup != nil {
		filter["$lookup"] = opts.Lookup
	}

	query, _ := utils.Marshal(filter)
	return query
}

type LoginParams struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func (a *AuthClient) Login(body LoginParams) (*AuthResponse, *KontenbaseError) {
	resp, err := a.httpClient.Post("/login", body, nil)
	if err != nil {
		return nil, err
	}

	data := resp.Data.(map[string]interface{})

	a.SaveToken(data["token"].(string))

	return &AuthResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		User:       data["user"].(map[string]interface{}),
		Token:      data["token"].(string),
	}, nil
}

type RegisterParams struct {
	Email     string `json:"email" validate:"required"`
	Password  string `json:"password" validate:"required"`
	FirstName string `json:"firstName" validate:"required"`
}

func (a *AuthClient) Register(body RegisterParams) (*AuthResponse, *KontenbaseError) {
	resp, err := a.httpClient.Post("/logout", body, nil)
	if err != nil {
		return nil, err
	}

	data := resp.Data.(map[string]interface{})

	a.SaveToken(data["token"].(string))

	return &AuthResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		User:       data["user"].(map[string]interface{}),
		Token:      data["token"].(string),
	}, nil
}

func (a *AuthClient) User(opts ...*options.UserOptions) (*ProfileResponse, *KontenbaseError) {
	query := ""

	for _, opt := range opts {
		query = "?" + a.filter(opt)
	}

	resp, err := a.httpClient.Get("/user"+query, a.getHeaders())
	if err != nil {
		return nil, err
	}

	return &ProfileResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		User:       resp.Data.(map[string]interface{}),
	}, nil
}

func (a *AuthClient) Update(body map[string]interface{}) (*ProfileResponse, *KontenbaseError) {
	resp, err := a.httpClient.Patch("/user", body, a.getHeaders())
	if err != nil {
		return nil, err
	}

	return &ProfileResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		User:       resp.Data.(map[string]interface{}),
	}, nil
}

func (a *AuthClient) Logout() (*AuthResponse, *KontenbaseError) {
	resp, err := a.httpClient.Post("/logout", nil, a.getHeaders())
	if err != nil {
		return nil, err
	}

	data := resp.Data.(map[string]interface{})

	return &AuthResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		User:       data["user"].(map[string]interface{}),
		Token:      data["token"].(string),
	}, nil
}

type AuthResponse struct {
	Status     int
	StatusText string
	User       map[string]interface{}
	Token      string
}

type ProfileResponse struct {
	Status     int
	StatusText string
	User       map[string]interface{}
}
