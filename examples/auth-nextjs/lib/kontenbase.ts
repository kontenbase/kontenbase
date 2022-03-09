import { KontenbaseClient } from '@kontenbase/sdk';

const kontenbase = new KontenbaseClient({
  apiKey: process.env.NEXT_PUBLIC_KONTENBASE_API_KEY || '',
});

export default kontenbase;