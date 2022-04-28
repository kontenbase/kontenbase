<?php

namespace Kontenbase\Tests;

use Kontenbase\KontenbaseClient;
use PHPUnit\Framework\TestCase;

final class AuthClientTest extends TestCase
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
  }

  public function testLoginError(): void
  {
    $res = self::$kontenbase->auth->login([
      'email' => Config::EMAIL,
      'password' => Config::PASSWORD . '1'
    ]);

    $token = self::$kontenbase->auth->token();

    $this->assertEquals(401, $res['status']);
    $this->assertEmpty($token);
  }

  public function testLoginSuccess(): void
  {
    $res = self::$kontenbase->auth->login([
      'email' => Config::EMAIL,
      'password' => Config::PASSWORD
    ]);

    $token = self::$kontenbase->auth->token();

    $this->assertEquals(200, $res['status']);
    $this->assertEquals(Config::EMAIL, $res['user']['email']);
    $this->assertEquals($token, $res['token']);
  }

  public function testToken(): void
  {
    $token = self::$kontenbase->auth->token();

    $this->assertNotNull($token);
  }

  public function testGetProfile(): void
  {
    $res = self::$kontenbase->auth->user();

    $this->assertEquals(200, $res['status']);
    $this->assertEquals(Config::EMAIL, $res['user']['email']);
  }

  public function testUpdateProfile(): void
  {
    $res = self::$kontenbase->auth->update([
      'lastName' => 'Tester'
    ]);

    $this->assertEquals(200, $res['status']);
    $this->assertEquals(Config::EMAIL, $res['user']['email']);
    $this->assertEquals('Tester', $res['user']['lastName']);
  }

  public function testLogout(): void
  {
    $token = self::$kontenbase->auth->token();
    $res = self::$kontenbase->auth->logout();

    $this->assertEquals(200, $res['status']);
    $this->assertEquals($token, $res['token']);
  }
}
