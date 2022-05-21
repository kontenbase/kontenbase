package client

import (
	"strconv"

	"github.com/kontenbase/kontenbase/options"
	"github.com/kontenbase/kontenbase/utils"
)

type QueryClient struct {
	url     string
	headers map[string]string

	httpClient *HTTPClient
}

func NewQueryClient(url string, headers map[string]string) *QueryClient {
	if headers == nil {
		headers = map[string]string{}
	}

	client := &QueryClient{
		url:     url,
		headers: headers,
	}

	client.httpClient = NewHTTPClient(client.url, client.headers)

	return client
}

func (q *QueryClient) filter(opts *options.FindOptions) string {
	filter := map[string]interface{}{}

	if opts.Or != nil {
		filter["$or"] = opts.Or
	}

	if opts.Limit != nil {
		filter["$limit"] = *opts.Limit
	}

	if opts.Lookup != nil {
		filter["$lookup"] = opts.Lookup
	}

	if opts.Select != nil {
		filter["$select"] = opts.Select
	}

	if opts.Skip != nil {
		filter["$skip"] = *opts.Skip
	}

	if opts.Sort != nil {
		filter["$sort"] = opts.Sort
	}

	if opts.Where != nil {
		for k, v := range opts.Where.(map[string]interface{}) {
			filter[k] = v
		}
	}

	query, _ := utils.Marshal(filter)
	return query
}

func (q *QueryClient) Find(opts ...*options.FindOptions) (*BulkResponse, *KontenbaseError) {
	query := ""

	for _, opt := range opts {
		query = "?" + q.filter(opt)
	}

	resp, err := q.httpClient.Get(""+query, nil)
	if err != nil {
		return nil, err
	}

	limit, _ := strconv.Atoi(resp.Header.Get("x-pagination-limit"))
	skip, _ := strconv.Atoi(resp.Header.Get("x-pagination-skip"))

	data := []map[string]interface{}{}

	for _, v := range resp.Data.([]interface{}) {
		data = append(data, v.(map[string]interface{}))
	}

	return &BulkResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       data,
		Limit:      limit,
		Skip:       skip,
	}, nil
}

func (q *QueryClient) GetByID(id string, opts ...*options.GetByIDOptions) (*SingleResponse, *KontenbaseError) {
	resp, err := q.httpClient.Get("/"+id, nil)
	if err != nil {
		return nil, err
	}

	return &SingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       resp.Data.(map[string]interface{}),
	}, nil
}

func (q *QueryClient) Create(body map[string]interface{}) (*SingleResponse, *KontenbaseError) {
	resp, err := q.httpClient.Post("", body, nil)
	if err != nil {
		return nil, err
	}

	return &SingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       resp.Data.(map[string]interface{}),
	}, nil
}

func (q *QueryClient) UpdateByID(id string, body map[string]interface{}) (*SingleResponse, *KontenbaseError) {
	resp, err := q.httpClient.Patch("/"+id, body, nil)
	if err != nil {
		return nil, err
	}

	return &SingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       resp.Data.(map[string]interface{}),
	}, nil
}

func (q *QueryClient) DeleteByID(id string) (*SingleResponse, *KontenbaseError) {
	resp, err := q.httpClient.Delete("/"+id, nil)
	if err != nil {
		return nil, err
	}

	return &SingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       resp.Data.(map[string]interface{}),
	}, nil
}

func (q *QueryClient) Link(id string, body map[string]interface{}) (*SingleResponse, *KontenbaseError) {
	resp, err := q.httpClient.Send("LINK", "/"+id, body, nil)
	if err != nil {
		return nil, err
	}

	return &SingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       resp.Data.(map[string]interface{}),
	}, nil
}

func (q *QueryClient) Unlink(id string, body map[string]interface{}) (*SingleResponse, *KontenbaseError) {
	resp, err := q.httpClient.Send("UNLINK", "/"+id, body, nil)
	if err != nil {
		return nil, err
	}

	return &SingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       resp.Data.(map[string]interface{}),
	}, nil
}

func (q *QueryClient) Count(opts ...*options.CountOptions) (*SingleResponse, *KontenbaseError) {
	query := ""

	for _, opt := range opts {
		query = "?" + q.filter(&options.FindOptions{
			Or:    opt.Or,
			Where: opt.Where,
		})
	}

	resp, err := q.httpClient.Get("/count"+query, nil)
	if err != nil {
		return nil, err
	}

	return &SingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data:       resp.Data.(map[string]interface{}),
	}, nil
}

type BulkResponse struct {
	Status     int                      `json:"status"`
	StatusText string                   `json:"statusText"`
	Data       []map[string]interface{} `json:"data"`
	Limit      int                      `json:"limit"`
	Skip       int                      `json:"skip"`
}

type SingleResponse struct {
	Status     int                    `json:"status"`
	StatusText string                 `json:"statusText"`
	Data       map[string]interface{} `json:"data"`
}
