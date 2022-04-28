# Kontenbase

This is the Official PHP client for Kontenbase API.

Kontenbase is a no-code backend API platform or Backend as a Service (BaaS) that allows you to create a backend API as fast as possible. We make it easy for developers to build backend API without having to touch backend code at all.

Visit [Kontenbase](https://kontenbase.com/) for more information and see [our documentation](https://docs.kontenbase.com/) for more technical details.

## API Documentation

For API documentation, visit [Kontenbase API Reference](https://docs.kontenbase.com/).

## Installation

To install the SDK you can use Composer or directly download the source and extract to your directory. If you’re using Composer, run this following command:

```bash
composer require kontenbase/sdk
```

## Usage

Before you begin, you need to sign up on [Kontenbase Dashboard](https://app.kontenbase.com/) to retrieve an **API key** of your project.

### **Create a client**

```php
<?php

use Kontenbase\KontenbaseClient;

$kontenbase = new KontenbaseClient([
	'apiKey': 'YOUR_API_KEY' // Your API Key from app.kontenbase.com
]);
```

## Authentication

### **Register**

```php
$res = $kontenbase->auth->register([
	'firstName' => 'Ega',
	'lastName' => 'Radiegtya',
	'email' => 'user@mail.com',
	'password' => 'password'
]);

echo $res['user']; // The data of registered user
echo $res['token']; // The token of registered user
```

### **Login**

```php
$res = $kontenbase->auth->login([
	'email' => 'user@mail.com',
	'password' => 'password'
]);

echo $res['user']; // The data of logged-in user
echo $res['token']; // The token of logged-in user
```

### **Get user info**

```php
$res = $kontenbase->auth->user();

echo $res['user'];
```

### **Update user info**

```php
$res = $kontenbase->auth->update([
	'firstName' => 'Ega'
]);

echo $res['user'];
```

### **Logout**

```php
$res = $kontenbase->auth->logout();
```

## Database

### **Create a new record**

```php
$res = $kontenbase->service('posts')->create([
	'name' => 'Post 1',
	'notes' => 'Hello Kontenbase'
]);

echo $res['data'] // The data of the new record
```

### **Get a record by ID**

```php
$res = $kontenbase->service('posts')->getById('605a251d7b8678bf6811k3b1');

echo $res['data'] // The data of the record
```

### Find records

**Get all records**

```php
$res = $kontenbase->service('posts')->find();

echo $res['data'] // The data of all records
```

**Find records and modify the result**

```php
// limit
$res = $kontenbase->service('posts')->find([
	'limit' => 10
]);
```

```php
// sort
// ascending: 1
// descending: -1
$res = $kontenbase->service('posts')->find([
	'sort' => ['name' => 1]
]);
```

```php
// skip
$res = $kontenbase->service('posts')->find([
	'skip' => 10
]);
```

```php
// select
$res = $kontenbase->service('posts')->find([
	'select' => ['name', 'notes']
]);
```

```php
// lookup all fields
$res = $kontenbase->service('posts')->find([
	'lookup' => '*'
]);

// lookup spesific fields
$res = $kontenbase->service('posts')->find([
	'lookup' => ['categories']
]);

// lookup but only show ids
$res = $kontenbase->service('posts')->find([
	'lookup' => ['_id' => '*']
]);
```

**Find records with criteria**

```php
// equals
$res = $kontenbase->service('posts')->find([
	'where' => [
		'name' => 'Ega'
	]
]);
```

```php
// does not equal
$res = $kontenbase->service('posts')->find([
	'where' => [
		'name' => ['$ne' => 'Ega']
	]
]);
```

```php
// contains
$res = $kontenbase->service('posts')->find([
	'where' => [
		'notes' => ['$contains' => 'hello']
	]
]);
```

```php
// does not contain
$res = $kontenbase->service('posts')->find([
	'where' => [
		'notes' => ['$notContains' => 'hello']
	]
]);
```

```php
// matches any of
$res = $kontenbase->service('posts')->find([
	'where' => [
		'name' => ['$in' => ['Ega', 'Radiegtya']]
	]
]);
```

```php
// does not match any of
$res = $kontenbase->service('posts')->find([
	'where' => [
		'name' => ['$nin' => ['Ega', 'Radiegtya']]
	]
]);
```

```php
// less than
$res = $kontenbase->service('posts')->find([
	'where' => [
		'total' => ['$lt' => 10]
	]
]);
```

```php
// less than or equals
$res = $kontenbase->service('posts')->find([
	'where' => [
		'total' => ['$lte' => 10]
	]
]);
```

```php
// more than
$res = $kontenbase->service('posts')->find([
	'where' => [
		'total' => ['$gt' => 10]
	]
]);
```

```php
// more than or equals
$res = $kontenbase->service('posts')->find([
	'where' => [
		'total' => ['$gte' => 10]
	]
]);
```

### Update record

```php
$res = $kontenbase->service('posts')->updateById('605a251d7b8678bf6811k3b1', [
	'notes' => 'Hello world'
]);
```

### Delete record

```php
$res = $kontenbase->service('posts')->deleteById('605a251d7b8678bf6811k3b1');
```

### Link a record to create relation

```php
$res = $kontenbase->service('posts')->link('605a251d7b8678bf6811k3b1', [
	'categories' => '61d26e8e2adb12b85c33029c'
]);
```

### Unlink a record from its relation

```php
$res = $kontenbase->service('posts')->unlink('605a251d7b8678bf6811k3b1', [
	'categories' => '61d26e8e2adb12b85c33029c'
]);
```

### Count total records

**Count all records**

```php
$res = $kontenbase->service('posts')->count();
```

**Count records that match given criteria**

```php
$res = $kontenbase->service('posts')->find([
	'where' => [
		'name' => 'Ega'
	]
]);
```

## Storage

### Upload a file
```php
$file = fopen('/path/to/file', 'r');
$res = $kontenbase->storage->upload($file);

echo $res['data'] // The data of the uploaded file
```

## Feedback

Please use our [GitHub Issues](https://github.com/kontenbase/feedback) for high-level feedback. Also you can join our [Discord server](https://a.kontenbase.com/discord).