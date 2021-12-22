# Kontenbase SDK

This is the Official Node JS and Browser client/library for Kontenbase API. Visit https://kontenbase.com. More information about the product and see documentation at http://kontenbase.com/api for more technical details.

## API Documentation

Please check [Kontenbase API Reference](http:/kontenbase.com/api).

## Installation

### Node.js

To install kontenbase in a node project:

```bash
npm install --save @kontenbase/sdk
```


## Usage

Configure package with your account's **API key** obtained from your [Kontenbase Dashboard](https://kontenbase.com).

```js
const { KontenbaseClient } = require('@kontenbase/sdk')

const kontenbase = new KontenbaseClient({
  apiKey: '*******************',
})
```

## Authentication

Use kontenbase auth services for manage your user.

### Register

```js
const { data } = await kontenbase.auth.register({
  firstName: 'John',
  lastName: 'Doe',
  email: 'user@gmail.com',
  password: 'password',
})
```

### Login

```js
const { data } = await kontenbase.auth.login({
  email: 'user@gmail.com',
  password: 'password',
})
```

### Profile

```js
const { data } = await kontenbase.auth.profile()
```

## Database 

### Create
```js
const { data } = await kontenbase.service('New Service').create({
  Name: 'Record',
  Notes: 'Hello world'
})
```

### Get
```js
const { data } = await kontenbase.service('New Service').getById("605a251d7b8678bf6811k3b1")
```

### Update
```js
const { data } = await kontenbase.service('New Service').updateById("605a251d7b8678bf6811k3b1", {
  Name: 'New Record',
})
```

### Delete
```js
const { data } = await kontenbase.service('New Service').deleteById("605a251d7b8678bf6811k3b1")
```

### Find
```js
const { data } = await kontenbase.service('New Service').find()
```

## Storage
### Upload
```js
const file = event.target.files[0]
const { data } = await kontenbase.storage.upload(file)
```

## Realtime
### Subscribe
```js
kontenbase.realtime.subscribe('New Service', (message) => {
  console.log(message)
})
```

### Unsubscribe
```js
const key = await kontenbase.realtime.subscribe('New Service', (message) => {
  console.log(message)
})

kontenabase.unsubscribe(key)
```