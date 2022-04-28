<?php

namespace Kontenbase\Exception;

use GuzzleHttp\Exception\BadResponseException;

class ResponseException
{
  public static function _error($exception): array
  {
    if ($exception instanceof BadResponseException) {
      $error = $exception->getResponse();
      $resp = json_decode((string)$error->getBody(), true);
      return [
        'error' => [
          'message' => $resp['message']
        ],
        'status' => $error->getStatusCode(),
        'statusText' => $error->getReasonPhrase()
      ];
    }

    var_dump($exception->getMessage());

    return [
      'error' => [
        'message' => 'Failed'
      ],
      'status' => 500,
      'statusText' => 'FAILED'
    ];
  }
}
