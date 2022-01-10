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

### Update Profile

```js
const { data } = await kontenbase.auth.updateProfile({ firstName: "John" })
```

### Logout

```js
const { data } = await kontenbase.auth.logout()
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

### Link
```js
const { data } = await kontenbase.service('New Service').link("605a251d7b8678bf6811k3b1", {
  categories: '61d26e8e2adb12b85c33029c',
})
```

### Unlink
```js
const { data } = await kontenbase.service('New Service').unlink("605a251d7b8678bf6811k3b1", {
  categories: '61d26e8e2adb12b85c33029c',
})
```

### Find
```js
const { data } = await kontenbase.service('New Service').find()
```

```js
// sort
// 1 = ascending
// -1 = descending
const { data } = await kontenbase.service('New Service').find({ sort: { name: 1 } })
```

```js
// skip
const { data } = await kontenbase.service('New Service').find({ skip: 10 })
```

```js
// limit
const { data } = await kontenbase.service('New Service').find({ limit: 10 })
```

```js
// select
const { data } = await kontenbase.service('New Service').find({ select: ['name'] })
```

```js
// lookup field link to record
const { data } = await kontenbase.service('New Service').find({ lookup: ['categories'] })
```

```js
// where
const { data } = await kontenbase.service('New Service').find({ where: { name: 'John'} })
```

```js
// not equal
const { data } = await kontenbase.service('New Service').find({ where: { name: { $ne: 'John' } } })
```

```js
// contains
const { data } = await kontenbase.service('New Service').find({ where: { name: { $contains: 'John' } } })
```

```js
// not containts
const { data } = await kontenbase.service('New Service').find({ where: { name: { $notContains: 'John' } } })
```

```js
// include
const { data } = await kontenbase.service('New Service').find({ where: { name: { $in: ['John'] } } })
```

```js
// not include
const { data } = await kontenbase.service('New Service').find({ where: { name: { $nin: ['John'] } } })
```

```js
// less then
const { data } = await kontenbase.service('New Service').find({ where: { total: { $lt: 10 } } })
```

```js
// less then equal
const { data } = await kontenbase.service('New Service').find({ where: { total: { $lte: 10 } } })
```

```js
// greater then
const { data } = await kontenbase.service('New Service').find({ where: { total: { $gt: 10 } } })
```

```js
// greater then equal
const { data } = await kontenbase.service('New Service').find({ where: { total: { $gte: 10 } } })
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
const key = await kontenbase.realtime.subscribe('New Service', { event: "*" } , (message) => {
  console.log(message)
})

kontenbase.realtime.unsubscribe(key)
```