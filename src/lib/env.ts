import { resolve } from 'path'
import { config } from 'dotenv'

const dotenv =
  process.env.NODE_ENV !== 'production'
    ? config({ path: resolve(__dirname, '../../.env.local') })
    : undefined

export default dotenv
