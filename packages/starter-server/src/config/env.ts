import dotenv from 'dotenv-safe'
import { IEnvironmentConfig } from '@enso/framework'

dotenv.config({
  allowEmptyValues: false
})

export const env: IEnvironmentConfig = {
  ENVIRONMENT: process.env.ENVIRONMENT!,
  PORT: parseInt(process.env.PORT!),
  JWT_KEY_SALT: process.env.JWT_KEY_SALT!,
  JWT_KEY_SECRET: process.env.JWT_KEY_SECRET!
}
