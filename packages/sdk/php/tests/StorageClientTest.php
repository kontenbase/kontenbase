<?php

namespace Kontenbase\Tests;

use Kontenbase\KontenbaseClient;
use PHPUnit\Framework\TestCase;

final class StorageClientTest extends TestCase
{
  public static KontenbaseClient $kontenbase;

  /**
   * @beforeClass
   */
  public static function setUpClient(): void
  {
    self::$kontenbase = new KontenbaseClient([
      'apiKey' => Config::API_KEY
    ]);

    self::$kontenbase->auth->login([
      'email' => Config::EMAIL,
      'password' => Config::PASSWORD
    ]);
  }

  public function testUpload()
  {
    $file = fopen(__DIR__ . '/icon.png', 'r');
    $res = self::$kontenbase->storage->upload($file);

    $this->assertEquals(200, $res['status']);
  }
}
