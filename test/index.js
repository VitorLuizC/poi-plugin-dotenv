import Poi from 'poi'
import test from 'ava'
import dotenv from '../'

const getEnv = async (configuration = {}) => {
  const poi = new Poi('build', {
    plugins: [
      dotenv(configuration)
    ]
  })
  await poi.prepare()
  return poi.env
}

test('It exposes curried function to configure Poi plugin', (context) => {
  context.is(typeof dotenv, 'function')
  context.is(typeof dotenv(/* No options */), 'function')
})

test('It load variables defined on ".env" file to process.env object', async (context) => {
  const TEST_MESSAGE = 'TEST_MESSAGE 1'
  const env = await getEnv()
  context.is(env.TEST_MESSAGE, TEST_MESSAGE)
})

test('".env" variables don\'t overwrite already defined variables', async (context) => {
  const TEST_MESSAGE = 'TEST_MESSAGE 2'
  process.env.TEST_MESSAGE = TEST_MESSAGE
  const env = await getEnv()
  context.is(env.TEST_MESSAGE, TEST_MESSAGE)
  delete process.env.TEST_MESSAGE
})

test('Plugin allows you to change ".env" path', async (context) => {
  const TEST_MESSAGE = 'TEST_MESSAGE 3'
  const env = await getEnv({
    path: '.env.custom'
  })
  context.is(env.TEST_MESSAGE, TEST_MESSAGE)
})

test('Plugin allows you to pass an env object to overwrite loaded variables', async (context) => {
  const TEST_MESSAGE = 'TEST_MESSAGE 4'
  const env = await getEnv({
    env: {
      TEST_MESSAGE: 'TEST_MESSAGE 4'
    }
  })
  context.is(env.TEST_MESSAGE, TEST_MESSAGE)
})
