import { KontenbaseClient } from '../src';

const URL = process.env.URL || '';
const API_KEY = process.env.API_KEY || '';
const SERVICE_NAME = process.env.SERVICE_NAME || '';

const kontenbase = new KontenbaseClient({
  url: URL,
  apiKey: API_KEY,
});

describe('Filter', () => {
  const service = kontenbase.service(SERVICE_NAME);
  const serviceProto = Object.getPrototypeOf(service);

  test('limit', async () => {
    const result = serviceProto._filter({
      limit: 1,
    });

    expect(result).toBe('$limit=1');
  });

  test('skip', async () => {
    const result = serviceProto._filter({
      skip: 1,
    });

    expect(result).toBe('$skip=1');
  });

  test('where', async () => {
    const result = serviceProto._filter({
      where: {
        name: 'hello',
        note: 'world',
      },
    });

    expect(result).toBe('name=hello&note=world');
  });

  test('skip limit', async () => {
    const result = serviceProto._filter({
      skip: 1,
      limit: 1,
    });

    expect(result).toBe('$skip=1&$limit=1');
  });
});
