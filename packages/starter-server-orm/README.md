# Enso starter (Server + ORM)

A sample koa server demonstrating the following features :

* Loading `.env` secrets safely using `dotenv-safe`
* An `IoC` container provided by `inversify`
* `koa` decorators though `inversify-koa`
* A `TestHarness` for testing controllers
* `jest` as our primary test runner

## Additional features

* Persistence using `postgresql` with `TypeORM`
* Example of how to initialise mutiple tables easily
* Example of how to enable postgres features such as `uuid-ossp`
* Example of creating a table with sensible defaults `now()`, `uuid_generate_v4()` and `isUnique`.
* Example of typing HTTP requests
* Validating HTTP requests though `class-transformer-validator`

Utility functions defined in `package.json` to leverage Typescript directly

* `migration:create` Create a migration
* `migration:revert` Revert a migration
* `migration:run` Run a migration
* `schema:drop` Drop your schema

## TODO

[ ] Improve how DB is initialised and bound to a container
[ ] Get tests working
[ ] Move this to its own `starters` repo so its not conflated with the framework
