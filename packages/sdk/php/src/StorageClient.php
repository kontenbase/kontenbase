<?php

namespace Kontenbase;

use GuzzleHttp\Client;
use Kontenbase\Exception\ResponseException;

class StorageClient
{
  protected $url;
  protected $auth;
  protected $httpClient;

  public function __construct(string $url, AuthClient $auth)
  {
    $this->url = $url;
    $this->auth = $auth;
    $this->httpClient = new Client();
  }

  private function _getHeaders(): array
  {
    $headers = [];
    $authBearer = $this->auth->token();
    if (isset($authBearer) && $authBearer != "") {
      $headers['Authorization'] = "Bearer $authBearer";
    }
    return $headers;
  }

  public function upload($file)
  {
    try {
      $response = $this->httpClient->post("$this->url/upload", [
        'multipart' => [
          [
            'name' => 'file',
            'contents' => $file
          ]
        ],
        'headers' => $this->_getHeaders()
      ]);

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }
}
