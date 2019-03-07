import { TestHarness } from '@enso/framework'

import { App } from '../../src/App'
import { env } from '../../src/config/env'
import { container } from '../../src/config/registry'


export async function buildTestHarness (): Promise<TestHarness> {
  // build the app
  const app = new App(env)
  await app.build(container)

  // pass it into the test harness
  return new TestHarness(app)
}
