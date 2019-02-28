
// Helper to construct application config from environment
export const buildEnvironmentConfig = (environment: any): IEnvironmentConfig => {
  return {
    PORT: environment.APP_PORT,
    KEY_SALT: environment.APP_KEY_SALT,
    JWT_SECRET: environment.APP_JWT_SECRET,
    TEST_DATABASE?: environment.TEST_DATABASE
  }
}
