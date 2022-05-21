<?php

namespace Kontenbase;

use Kontenbase\AuthClient;
use Kontenbase\QueryClient;
use Kontenbase\StorageClient;

class KontenbaseClient
{
  public $auth;
  public $storage;

  protected $apiKey;
  protected $queryUrl;
  protected $headers;

  public function __construct(array $options)
  {
    if (!isset($options["apiKey"])) {
      throw new \Exception("apiKey is required.");
    }

    $url = isset($options["url"]) ? $options["url"] : 'https://api.kontenbase.com/query/api/v1';

    $this->queryUrl = "$url/{$options['apiKey']}";
    $this->apiKey = $options["apiKey"];
    $this->headers = array();
    $this->auth = $this->_initAuth();
    $this->storage = new StorageClient("$this->queryUrl/storage", $this->auth);
  }

  private function _getHeaders(): array
  {
    $headers = $this->headers;
    $authBearer = $this->auth->token();
    if (isset($authBearer) && $authBearer != "") {
      $headers['Authorization'] = "Bearer $authBearer";
    }
    return $headers;
  }

  private function _initAuth(): AuthClient
  {
    return new AuthClient($this->queryUrl, [
      "headers" => $this->headers
    ]);
  }

  public function service($name): QueryClient
  {
    return new QueryClient("$this->queryUrl/$name", [
      'headers' => $this->_getHeaders()
    ]);
  }
}
