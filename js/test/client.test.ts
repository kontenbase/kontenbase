import { KontenbaseClient, createClient } from '../src';
import fs from 'fs';
import path from 'path';

const URL = process.env.URL || '';
const API_KEY = process.env.API_KEY || '';
const SERVICE_NAME = process.env.SERVICE_NAME || 'todos';
const SECOND_SERVICE_NAME = process.env.SECOND_SERVICE_NAME || 'categories';
const EMAIL = process.env.EMAIL || '';
const PASSWORD = process.env.PASSWORD || '';
const kontenbase = new KontenbaseClient({
  url: URL,
  apiKey: API_KEY,
});

interface Todo {
  _id: string;
  name: string;
  categories: [string];
}

interface User {
  _id: string;
  email: string;
  firstName: string;
}

test('it should create the client connection', async () => {
  expect(kontenbase).toBeDefined();
});

test('it should throw an error if no valid params are provided', async () => {
  expect(() => createClient({ apiKey: '' })).toThrowError(
    'apiKey is required.',
  );
});

describe('Client', () => {
  let id: string;
  let secondId: string;

  const login = () => {
    return kontenbase.auth.login<User>({
      email: EMAIL,
      password: PASSWORD,
    });
  };

  beforeEach(async () => {
    await login();
    return true;
  });

  test('login', async () => {
    const response = await login();

    expect(response.status).toBe(200);
    expect(response.user?.email).toBe(EMAIL);

    const token = kontenbase.auth.token();

    expect(response.token).toBe(token);
  });

  test('login error', async () => {
    const response = await kontenbase.auth.login<User>({
      email: EMAIL,
      password: PASSWORD + '1',
    });

    expect(response.status).toBe(401);
    expect(typeof response.error?.message).toBe('string');
  });

  test('token', async () => {
    expect(kontenbase.auth.token() !== null).toBe(true);
  });

  test('user', async () => {
    const response = await kontenbase.auth.user<User>();

    expect(response.status).toBe(200);
    expect(response.user?.email).toBe(EMAIL);
  });

  test('update', async () => {
    const response = await kontenbase.auth.update<User>({
      firstName: 'Tester',
    });

    expect(response.status).toBe(200);
    expect(response.user?.email).toBe(EMAIL);
  });

  test('logout', async () => {
    const token = kontenbase.auth.token();
    const response = await kontenbase.auth.logout();

    expect(response.status).toBe(200);
    expect(response.token).toBe(token);
  });

  test('create', async () => {
    const response = await kontenbase
      .service<Todo>(SERVICE_NAME)
      .create({ name: 'Hello' });
    id = response.data?._id || '';

    expect(response.status).toBe(201);
  });

  test('second create', async () => {
    const response = await kontenbase
      .service<Todo>(SECOND_SERVICE_NAME)
      .create({ name: 'Yes' });

    secondId = response.data?._id || '';
    expect(response.status).toBe(201);
  });

  test('find', async () => {
    const response = await kontenbase.service<Todo>(SERVICE_NAME).find();

    expect(response.status).toBe(200);
  });

  test('find error', async () => {
    const response = await kontenbase.service<Todo>(SERVICE_NAME + '1').find();

    expect(response.status).toBe(400);
    expect(typeof response.error?.message).toBe('string');
  });

  test('getById', async () => {
    const response = await kontenbase.service<Todo>(SERVICE_NAME).getById(id);

    expect(response.status).toBe(200);
  });

  test('updateById', async () => {
    const response = await kontenbase
      .service<Todo>(SERVICE_NAME)
      .updateById(id, { name: 'Updated' });

    expect(response.status).toBe(200);
  });

  test('link', async () => {
    const response = await kontenbase
      .service<Todo>(SERVICE_NAME)
      .link(id, { [SECOND_SERVICE_NAME]: secondId });

    expect(response.status).toBe(200);
  });

  test('unlink', async () => {
    const response = await kontenbase
      .service<Todo>(SERVICE_NAME)
      .unlink(id, { [SECOND_SERVICE_NAME]: secondId });

    expect(response.status).toBe(200);
  });

  test('deleteById', async () => {
    const response = await kontenbase
      .service<Todo>(SERVICE_NAME)
      .deleteById(id);

    expect(response.status).toBe(200);
  });

  test('second deleteById', async () => {
    const response = await kontenbase
      .service<Todo>(SECOND_SERVICE_NAME)
      .deleteById(secondId);

    expect(response.status).toBe(200);
  });

  test('upload', async () => {
    const filePath = path.join(__dirname, 'icon.png');
    const file = fs.createReadStream(filePath);
    const response = await kontenbase.storage.upload(file);

    expect(response.status).toBe(200);
  });

  test('fields', async () => {
    const response = await kontenbase.service(SERVICE_NAME).field.find();
    console.log(response);

    expect(response.status).toBe(200);
  });

  test('realtime', async () => {
    const key = await kontenbase.realtime.subscribe<Todo>(
      SERVICE_NAME,
      { event: '*', where: { name: 'tes' } },
      (message) => {
        console.log(message);
      },
    );
    const unsubscribe = kontenbase.realtime.unsubscribe(key);

    expect(unsubscribe).toBe(true);
  });
});

test('count', async () => {
  const response = await kontenbase.service<Todo>(SERVICE_NAME).count();

  expect(response.status).toBe(200);
});

describe('field', async () => {
  let id: string;

  const login = () => {
    return kontenbase.auth.login<User>({
      email: EMAIL,
      password: PASSWORD,
    });
  };

  beforeEach(async () => {
    await login();
    return true;
  });

  test('create', async () => {
    const response = await kontenbase.service(SERVICE_NAME).field.create({
      name: 'new field',
      config: {
        type: 'singleLineText',
        typeOptions: {},
      },
    });
    id = response.data?.id || '';

    expect(response.status).toBe(200);
  });

  test('find', async () => {
    const response = await kontenbase.service(SERVICE_NAME).field.find();

    expect(response.status).toBe(200);
  });

  test('updateName', async () => {
    const newName = 'new name';
    const response = await kontenbase
      .service(SERVICE_NAME)
      .field.updateName(id, { name: newName });

    expect(response.status).toBe(200);
    expect(response.data?.name).toBe(newName);
  });

  test('updateOptions', async () => {
    const response = await kontenbase
      .service(SERVICE_NAME)
      .field.updateOptions(id, {
        type: 'longText',
        typeOptions: {},
      });

    expect(response.status).toBe(200);
    expect(response.data?.type).toBe('longText');
  });

  test('delete', async () => {
    const response = await kontenbase.service(SERVICE_NAME).field.delete(id);

    expect(response.status).toBe(200);
  });
});
