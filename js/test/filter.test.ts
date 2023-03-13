import { KontenbaseClient } from '../src';

const URL = process.env.URL || '';
const API_KEY = process.env.API_KEY || '123';
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

  test('sort', async () => {
    const result = serviceProto._filter({
      sort: { name: 1 },
    });

    expect(result).toBe('$sort[name]=1');
  });

  test('select', async () => {
    const result = serviceProto._filter({
      select: ['name'],
    });

    expect(result).toBe('$select[0]=name');
  });

  test('lookup into multiple fields', async () => {
    const result = serviceProto._filter({
      lookup: ['name'],
    });

    expect(result).toBe('$lookup[0]=name');
  });

  test('lookup into all fields', async () => {
    const result = serviceProto._filter({
      lookup: '*',
    });

    expect(result).toBe('$lookup=*');
  });

  test('lookup into all fields but only show ids', async () => {
    const result = serviceProto._filter({
      lookup: { _id: '*' },
    });

    expect(result).toBe('$lookup[_id]=*');
  });

  test('lookup into all fields and show all data', async () => {
    const result = serviceProto._filter({
      lookup: { '*': '*' },
    });

    expect(result).toBe('$lookup[*]=*');
  });

  test('$ne', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $ne: 'test',
        },
      },
    });

    expect(result).toBe('name[$ne]=test');
  });

  test('$contains', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $contains: 'test',
        },
      },
    });

    expect(result).toBe('name[$contains]=test');
  });

  test('$notContains', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $notContains: 'test',
        },
      },
    });

    expect(result).toBe('name[$notContains]=test');
  });

  test('$in', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $in: ['test'],
        },
      },
    });

    expect(result).toBe('name[$in][0]=test');
  });

  test('$nin', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $nin: ['test'],
        },
      },
    });

    expect(result).toBe('name[$nin][0]=test');
  });

  test('$lt', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $lt: 1,
        },
      },
    });

    expect(result).toBe('name[$lt]=1');
  });

  test('$lte', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $lte: 1,
        },
      },
    });

    expect(result).toBe('name[$lte]=1');
  });

  test('$gt', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $gt: 1,
        },
      },
    });

    expect(result).toBe('name[$gt]=1');
  });

  test('$gte', async () => {
    const result = serviceProto._filter({
      where: {
        name: {
          $gte: 1,
        },
      },
    });

    expect(result).toBe('name[$gte]=1');
  });

  test('$or', async () => {
    const result = serviceProto._filter({
      or: [{ name: 'test' }],
    });

    expect(result).toBe('$or[0][name]=test');
  });
});
