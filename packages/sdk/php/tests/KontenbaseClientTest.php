<?php

namespace Kontenbase\Tests;

use Kontenbase\KontenbaseClient;
use PHPUnit\Framework\TestCase;

final class KontenbaseClientTest extends TestCase
{
  public function testCreateClientError(): void
  {
    $this->expectException(\Exception::class);

    $kontenbase = new KontenbaseClient([]);
    $this->assertNull($kontenbase);
  }

  public function testCreateClientSuccess(): void
  {
    $kontenbase = new KontenbaseClient([
      'apiKey' => Config::API_KEY
    ]);

    $this->assertNotNull($kontenbase);
    $this->assertInstanceOf(KontenbaseClient::class, $kontenbase);
  }
}
