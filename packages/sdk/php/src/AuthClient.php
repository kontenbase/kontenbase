<?php

namespace Kontenbase;

use GuzzleHttp\Client;
use Kontenbase\Exception\ResponseException;

class AuthClient
{
  protected $url;
  protected $headers;
  protected $currentToken;
  protected $httpClient;

  public function __construct(string $url, array $options)
  {
    $this->url = $url;
    $this->headers = $options['headers'];
    $this->currentToken = null;
    $this->httpClient = new Client();
    $this->_initToken();
  }

  private function _getHeaders(): array
  {
    $headers = $this->headers;
    $authBearer = $this->token();
    if (isset($authBearer) && $authBearer != "") {
      $headers['Authorization'] = "Bearer $authBearer";
    }
    return $headers;
  }

  private function _initToken()
  {
    $this->currentToken = "";
  }

  public function token()
  {
    return $this->currentToken;
  }

  public function saveToken(string $token)
  {
    $this->currentToken = $token;
  }

  private function _filter(?array $options)
  {
    $filter = [];
    if (isset($options['lookup'])) {
      $filter['$lookup'] = $options['lookup'];
    }

    return $filter;
  }

  public function login(array $body)
  {
    try {
      $response = $this->httpClient->post("$this->url/auth/login", ['json' => $body]);

      $data = json_decode((string)$response->getBody(), true);

      $this->saveToken($data['token']);

      return [
        'user' => $data['user'],
        'token' => $data['token'],
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function register(array $body)
  {
    try {
      $response = $this->httpClient->post("$this->url/auth/register", ['json' => $body]);

      $data = json_decode((string)$response->getBody(), true);

      $this->saveToken($data['token']);

      return [
        'user' => $data['user'],
        'token' => $data['token'],
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function user(?array $options = [])
  {
    try {
      $query = $this->_filter($options);
      $response = $this->httpClient->get("$this->url/auth/user", ['query' => $query, 'headers' => $this->_getHeaders()]);

      $data = json_decode((string)$response->getBody(), true);

      return [
        'user' => $data,
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function update(array $body)
  {
    try {
      $response = $this->httpClient->patch("$this->url/auth/user", ['json' => $body, 'headers' => $this->_getHeaders()]);

      $data = json_decode((string)$response->getBody(), true);

      return [
        'user' => $data,
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function logout()
  {
    try {
      $response = $this->httpClient->post("$this->url/auth/logout", ['headers' => $this->_getHeaders()]);

      $data = json_decode((string)$response->getBody(), true);

      return [
        'user' => $data['user'],
        'token' => $data['token'],
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }
}
