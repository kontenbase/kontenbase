import { KontenbaseClient, createClient } from '../src';

const URL = process.env.URL || '';
const API_KEY = process.env.API_KEY || '';
const SERVICE_NAME = process.env.SERVICE_NAME || '';
const EMAIL = process.env.EMAIL || '';
const PASSWORD = process.env.PASSWORD || '';
const kontenbase = new KontenbaseClient({
  url: URL,
  apiKey: API_KEY,
});

interface Model {
  _id: string;
  name: string;
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
  const login = () => {
    return kontenbase.auth.login({
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
  });

  test('token', async () => {
    expect(kontenbase.auth.token() !== null).toBe(true);
  });

  test('profile', async () => {
    const response = await kontenbase.auth.profile();
    expect(response.status).toBe(200);
  });

  test('create', async () => {
    const response = await kontenbase
      .service<Model>(SERVICE_NAME)
      .create({ name: 'Hello' });
    id = response.data?._id || '';
    expect(response.status).toBe(200);
  });

  test('find', async () => {
    const response = await kontenbase.service<Model>(SERVICE_NAME).find();

    expect(response.status).toBe(200);
  });

  test('updateById', async () => {
    const response = await kontenbase
      .service<Model>(SERVICE_NAME)
      .updateById(id, { name: 'Updated' });
    expect(response.status).toBe(200);
  });

  test('deleteById', async () => {
    const response = await kontenbase
      .service<Model>(SERVICE_NAME)
      .deleteById(id);
    expect(response.status).toBe(200);
  });
});
