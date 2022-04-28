<?php

namespace Kontenbase;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Kontenbase\Exception\ResponseException;

class QueryClient
{
  protected $url;
  protected $headers;
  protected $httpClient;

  public function __construct($url, $options)
  {
    $this->url = $url;
    $this->headers = $options["headers"];
    $this->httpClient = new Client([
      'headers' => $this->headers
    ]);
  }

  private function _filter($options): array
  {
    $filter = [];

    if (isset($options['skip'])) {
      $filter['$skip'] = $options['skip'];
    }

    if (isset($options['limit'])) {
      $filter['$limit'] = $options['limit'];
    }

    if (isset($options['sort'])) {
      $filter['$sort'] = $options['sort'];
    }

    if (isset($options['select'])) {
      $filter['$select'] = $options['select'];
    }

    if (isset($options['lookup'])) {
      $filter['$lookup'] = $options['lookup'];
    }

    if (isset($options['or'])) {
      $filter['$or'] = $options['or'];
    }

    if (isset($options['where'])) {
      $filter = array_merge($filter, $options['where']);
    }

    return $filter;
  }

  public function find(?array $options = [])
  {
    try {
      $query = $this->_filter($options);
      $response = $this->httpClient->get($this->url, ['query' => $query]);

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase(),
        'limit' => (int)$response->getHeader('x-pagination-limit')[0],
        'skip' => (int)$response->getHeader('x-pagination-skip')[0],
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function getById(string $id, ?array $options = [])
  {
    try {
      $query = $this->_filter($options);
      $response = $this->httpClient->get("$this->url/$id", ['query' => $query]);

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function create(array $body)
  {
    try {
      if (sizeof($body) == 0) {
        throw new \Exception('body cannot be empty');
      }

      $response = $this->httpClient->post("$this->url", ['json' => $body]);

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function updateById(string $id, array $body)
  {
    try {
      $response = $this->httpClient->patch("$this->url/$id", ['json' => $body]);

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function deleteById(string $id)
  {
    try {
      $response = $this->httpClient->delete("$this->url/$id");

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function link(string $id, array $body)
  {
    try {
      $response = $this->httpClient->send(new Request("LINK", "$this->url/$id"), ['json' => $body]);

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function unlink(string $id, array $body)
  {
    try {
      $response = $this->httpClient->send(new Request("UNLINK", "$this->url/$id"), ['json' => $body]);

      return [
        'data' => json_decode((string)$response->getBody(), true),
        'status' => $response->getStatusCode(),
        'statusText' => $response->getReasonPhrase()
      ];
    } catch (\Exception $exception) {
      return ResponseException::_error($exception);
    }
  }

  public function count(?array $options = [])
  {
    try {
      $query = $this->_filter($options);
      $response = $this->httpClient->get("$this->url/count", ['query' => $query]);

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
