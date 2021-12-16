import { KontenbaseClient } from '@kontenbase/sdk'

const kontenbase = new KontenbaseClient({
  apiKey: process.env.REACT_APP_KONTENBASE_API_KEY || '',
})

export default kontenbase