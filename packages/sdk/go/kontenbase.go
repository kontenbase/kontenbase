package kontenbase

import "github.com/kontenbase/kontenbase/client"

type Client struct {
	apiKey   string
	queryUrl string
	headers  map[string]string

	Auth     *client.AuthClient
	Storage  *client.StorageClient
	Realtime *client.RealtimeClient
}

const defaultDomain = "https://api.kontenbase.com"

func DefaultURL() string {
	return defaultDomain + "/query/api/v1"
}

func NewClient(apiKey string, url string) *Client {

	if url != "" {
		url = DefaultURL()
	}

	c := &Client{
		apiKey:   apiKey,
		headers:  map[string]string{},
		queryUrl: url + "/" + apiKey,
	}

	c.Auth = client.NewAuthClient(c.queryUrl+"/auth", c.headers)
	c.Storage = client.NewStorageClient(c.queryUrl+"/storage", c.Auth)
	c.Realtime = client.NewRealtimeClient(defaultDomain+"/stream", c.apiKey, c.Auth)

	return c
}

func (c *Client) getHeaders() map[string]string {
	headers := c.headers
	authBearer := c.Auth.Token()

	if authBearer != "" {
		headers["Authorization"] = "Bearer " + authBearer
	}

	return headers
}

func (c *Client) Service(name string) *client.QueryClient {
	return client.NewQueryClient(c.queryUrl+"/"+name, c.getHeaders())
}
