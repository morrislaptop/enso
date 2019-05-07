// TODO:
// Password strategy might be better injected
import { createHash, randomBytes } from 'crypto'

export const computePasswordHash = (password: string, salt: string) =>
  createHash('sha256')
    .update(`${salt}:${password}`)
    .digest('hex')

export const generatePasswordSalt = () => randomBytes(32).toString('hex')
