package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type HTTPClient struct {
	baseUrl string
	headers map[string]string
}

type HTTPResponse struct {
	StatusCode int
	StatusText string
	Data       interface{}
	Header     http.Header
}

func NewHTTPClient(baseUrl string, headers map[string]string) *HTTPClient {
	return &HTTPClient{
		baseUrl: baseUrl,
		headers: headers,
	}
}

func (h *HTTPClient) sendRequest(method string, url string, body io.Reader, headers map[string]string) (*HTTPResponse, *KontenbaseError) {
	client := http.Client{}

	req, err := http.NewRequest(method, h.baseUrl+url, body)
	if err != nil {
		return nil, internalError(err.Error())
	}

	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}

	for k, v := range h.headers {
		req.Header.Set(k, v)
	}

	for k, v := range headers {
		req.Header.Set(k, v)
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, internalError(err.Error())
	}

	defer resp.Body.Close()

	var res interface{}
	json.NewDecoder(resp.Body).Decode(&res)

	if resp.StatusCode >= http.StatusBadRequest {
		message := ""

		response, ok := res.(map[string]interface{})
		if ok {
			message = response["message"].(string)
		} else {
			message = fmt.Sprint(response)
		}

		err := &KontenbaseError{
			Status:     resp.StatusCode,
			StatusText: h.parseStatusText(resp.StatusCode, resp.Status),
			Message:    message,
		}

		return nil, err
	}

	response := &HTTPResponse{
		StatusCode: resp.StatusCode,
		StatusText: h.parseStatusText(resp.StatusCode, resp.Status),
		Header:     resp.Header,
		Data:       res,
	}

	return response, nil
}

func (h *HTTPClient) parseStatusText(code int, status string) string {
	return strings.Replace(status, fmt.Sprintf("%d ", code), "", 1)
}

func (h *HTTPClient) Get(path string, headers map[string]string) (*HTTPResponse, *KontenbaseError) {
	return h.sendRequest(http.MethodGet, path, nil, headers)
}

func (h *HTTPClient) Post(path string, rawBody interface{}, headers map[string]string) (*HTTPResponse, *KontenbaseError) {
	body := h.parseBody(rawBody, headers)
	return h.sendRequest(http.MethodPost, path, body, headers)
}

func (h *HTTPClient) Patch(path string, rawBody interface{}, headers map[string]string) (*HTTPResponse, *KontenbaseError) {
	body := h.parseBody(rawBody, headers)
	return h.sendRequest(http.MethodPatch, path, body, headers)
}

func (h *HTTPClient) Delete(path string, headers map[string]string) (*HTTPResponse, *KontenbaseError) {
	return h.sendRequest(http.MethodDelete, path, nil, headers)
}

func (h *HTTPClient) Send(method string, path string, rawBody interface{}, headers map[string]string) (*HTTPResponse, *KontenbaseError) {
	body := h.parseBody(rawBody, headers)
	return h.sendRequest(method, path, body, headers)
}

func (h *HTTPClient) parseBody(rawBody interface{}, headers map[string]string) io.Reader {
	if rawBody == nil {
		return nil
	}

	var body *bytes.Buffer
	isFile := headers != nil && strings.Contains(headers["Content-Type"], "multipart/form-data")

	if isFile {
		body = rawBody.(*bytes.Buffer)
	} else if rawBody != nil {
		jsonBody, _ := json.Marshal(rawBody)
		body = bytes.NewBuffer(jsonBody)
	}

	return body
}
