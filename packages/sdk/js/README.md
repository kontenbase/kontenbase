# Kontenbase SDK

This is the Official Node JS and Browser client/library for Kontenbase API. Visit https://kontenbase.com. More information about the product and see documentation at http://docs.kontenbase.com for more technical details.

## API Documentation

Please check [Kontenbase API Reference](http:/docs.kontenbase.com).

## Installation

### Node.js

To install kontenbase in a node project:

```bash
npm install --save @kontenbase/sdk
```

## Usage

Configure package with your account's **API key** obtained from your [Kontenbase Dashboard](https://kontenbase.com).

```js
const { KontenbaseClient } = require('@kontenbase/sdk');

const kontenbase = new KontenbaseClient({
  apiKey: '*******************',
});
```

## Authentication

Use kontenbase auth services for manage your user.

### Register

```js
const { user, token, error } = await kontenbase.auth.register({
  firstName: 'Ega',
  lastName: 'Radiegtya',
  email: 'user@gmail.com',
  password: 'password',
});
```

### Login

```js
const { user, token, error } = await kontenbase.auth.login({
  email: 'user@gmail.com',
  password: 'password',
});
```

### User

```js
const { user, error } = await kontenbase.auth.user();
```

### Update

```js
const { user, error } = await kontenbase.auth.update({ firstName: 'Ega' });
```

### Logout

```js
const { user, token, error } = await kontenbase.auth.logout();
```

## Database

### Create

```js
const { data, error } = await kontenbase.service('posts').create({
  name: 'Post 1',
  notes: 'Hello kontenbase',
});
```

### Get

```js
const { data, error } = await kontenbase
  .service('posts')
  .getById('605a251d7b8678bf6811k3b1');
```

```js
// Get record with filter:
// select
// lookup
const { data, error } = await kontenbase
  .service('posts')
  .getById('605a251d7b8678bf6811k3b1', { filterKey: filterValue, ... });
```

### Update

```js
const { data, error } = await kontenbase
  .service('posts')
  .updateById('605a251d7b8678bf6811k3b1', {
    notes: 'Hello world',
  });
```

### Delete

```js
const { data, error } = await kontenbase
  .service('posts')
  .deleteById('605a251d7b8678bf6811k3b1');
```

### Link

```js
const { data, error } = await kontenbase
  .service('posts')
  .link('605a251d7b8678bf6811k3b1', {
    categories: '61d26e8e2adb12b85c33029c',
  });
```

### Unlink

```js
const { data, error } = await kontenbase
  .service('posts')
  .unlink('605a251d7b8678bf6811k3b1', {
    categories: '61d26e8e2adb12b85c33029c',
  });
```

### Find

```js
const { data, error } = await kontenbase.service('posts').find();
```

```js
// sort
// 1 = ascending
// -1 = descending
const { data, error } = await kontenbase
  .service('posts')
  .find({ sort: { name: 1 } });
```

```js
// skip
const { data, error } = await kontenbase.service('posts').find({ skip: 10 });
```

```js
// limit
const { data, error } = await kontenbase.service('posts').find({ limit: 10 });
```

```js
// select
const { data, error } = await kontenbase
  .service('posts')
  .find({ select: ['name'] });
```

```js
// lookup into multiple fields of link to record
const { data, error } = await kontenbase
  .service('posts')
  .find({ lookup: ['categories'] });
```

```js
// lookup into all fields of link to record
const { data, error } = await kontenbase.service('posts').find({ lookup: '*' });
```

```js
// lookup but only show the ids
const { data, error } = await kontenbase
  .service('posts')
  .find({ lookup: { _id: '*' } });
```

```js
// where
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { name: 'Ega' } });
```

```js
// not equal
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { name: { $ne: 'Ega' } } });
```

```js
// contains
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { name: { $contains: 'Ega' } } });
```

```js
// not contains
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { name: { $notContains: 'Ega' } } });
```

```js
// include
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { name: { $in: ['Ega'] } } });
```

```js
// not include
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { name: { $nin: ['Ega'] } } });
```

```js
// less then
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { total: { $lt: 10 } } });
```

```js
// less then equal
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { total: { $lte: 10 } } });
```

```js
// greater then
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { total: { $gt: 10 } } });
```

```js
// greater then equal
const { data, error } = await kontenbase
  .service('posts')
  .find({ where: { total: { $gte: 10 } } });
```

### Count

```js
// count all records
const { data, error } = await kontenbase.service('posts').count();
```

```js
// count with filters
const { data, error } = await kontenbase
  .service('posts')
  .count({ filterKey: filterValue, ... });
```

## Storage

### Upload

```js
const file = event.target.files[0];
const { data, error } = await kontenbase.storage.upload(file);
```

## Realtime

### Event

- `*`
- `CREATE_RECORD`
- `UPDATE_RECORD`
- `DELETE_RECORD`

### Subscribe

```js
kontenbase.realtime.subscribe('posts', { event: '*' }, (message) => {
  if (message.error) {
    console.log(message.error);
    return;
  }

  console.log(message.event, message.payload);
});
```

### Unsubscribe

```js
const key = await kontenbase.realtime.subscribe(
  'posts',
  { event: '*' },
  (message) => {
    if (message.error) {
      console.log(message.error);
      return;
    }

    console.log(message.event, message.payload);
  },
);

kontenbase.realtime.unsubscribe(key);
```

## CDN

You can now use plain `<script>`s to import kontenbase from CDNs, like:

```html
<script src="https://cdn.jsdelivr.net/npm/@kontenbase/sdk"></script>
```

Then you can use it from a global `kontenbase` variable:

```html
<script>
  const { createClient } = kontenbase;
  const client = createClient({
    apiKey: '*******************',
  });

  client
    .service('posts')
    .find()
    .then((res) => {
      if (res.error) {
        console.log(res.error);
        return;
      }

      console.log(res);
    });
</script>
```
