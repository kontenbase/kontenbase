package client

import (
	"bytes"
	"io"
	"mime/multipart"
	"os"
)

type StorageClient struct {
	url string

	httpClient *HTTPClient
	auth       *AuthClient
}

func NewStorageClient(url string, auth *AuthClient) *StorageClient {
	client := &StorageClient{
		url:  url,
		auth: auth,
	}

	client.httpClient = NewHTTPClient(client.url, nil)

	return client
}

func (s *StorageClient) getHeaders() map[string]string {
	headers := map[string]string{}
	authBearer := s.auth.Token()

	if authBearer != "" {
		headers["Authorization"] = "Bearer " + authBearer
	}

	return headers
}

func (s *StorageClient) Upload(file io.Reader) (*StorageSingleResponse, *KontenbaseError) {
	r, ok := file.(*os.File)
	if !ok {
		return nil, internalError("file is not supported")
	}

	b := bytes.NewBuffer(nil)
	w := multipart.NewWriter(b)

	fw, err := w.CreateFormFile("file", r.Name())
	if err != nil {
		return nil, internalError(err.Error())
	}

	if _, err = io.Copy(fw, file); err != nil {
		return nil, internalError(err.Error())
	}

	w.Close()

	headers := s.getHeaders()
	headers["Content-Type"] = w.FormDataContentType()

	resp, err2 := s.httpClient.Post("/storage/upload", b, headers)
	if err2 != nil {
		return nil, err2
	}

	data := resp.Data.(map[string]interface{})

	return &StorageSingleResponse{
		Status:     resp.StatusCode,
		StatusText: resp.StatusText,
		Data: Storage{
			FileName: data["fileName"].(string),
			MimeType: data["mimeType"].(string),
			Size:     int64(data["size"].(float64)),
			URL:      data["url"].(string),
		},
	}, nil
}

type Storage struct {
	FileName string `json:"fileName"`
	MimeType string `json:"mimeType"`
	Size     int64  `json:"size"`
	URL      string `json:"url"`
}

type StorageSingleResponse struct {
	Status     int     `json:"status"`
	StatusText string  `json:"statusText"`
	Data       Storage `json:"data"`
}
