import KontenbaseClient from './KontenbaseClient';
import { KontenbaseClientOptions } from './lib/types';
/**
 * Creates a new Kontenbase Client.
 */
const createClient = (options: KontenbaseClientOptions) => {
  return new KontenbaseClient(options);
};

export * from './lib/types';

export { createClient, KontenbaseClient, KontenbaseClientOptions };
