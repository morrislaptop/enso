import { getConnectionOptions } from 'typeorm'

// read connection options from ormconfig file (or ENV variables)
const connectionOptions = await getConnectionOptions();

// do something with connectionOptions,
// for example append a custom naming strategy or a custom logger
// Object.assign(connectionOptions, { namingStrategy: new MyNamingStrategy() });

export {
  connectionOptions
}

