export interface IEnvironmentConfig {
  ENVIRONMENT: string
  PORT: number
}

export const createEnvironment = (env: any): IEnvironmentConfig => {
  return {
    ENVIRONMENT: env.ENV,
    PORT: env.APP_PORT
  }
}
