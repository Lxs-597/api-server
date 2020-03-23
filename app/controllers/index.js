const path = require('path')
const Mock = require('mockjs')
const glob = require('glob')
const { pathToRegexp } = require('path-to-regexp')

const rootDir = path.join(__dirname, '..', '/mock')

const mocks = getMockFiles()

const matchMock = ctx => {
  const { path: acceptPath, method: acceptMethod } = ctx

  for (const mock of mocks) {
    const { method, reg, keys } = mock

    console.log('method============', method)

    if (method === acceptMethod.toLowerCase()) {
      const match = reg.exec(acceptPath)
      console.log('match===========', match)
      if (match) {
        const params = {}
        for (let i = 1; i < match.length; i += 1) {
          const key = keys[i - 1]
          const prop = key.name
          const val = decodeParam(match[i])

          if (val !== undefined || !hasOwnProperty.call(params, prop)) {
            params[prop] = val
          }
        }

        ctx.params = params
        console.log('mock', mock)
        return mock
      }
    }
  }

  function decodeParam(val) {
    if (typeof val !== 'string' || val.length === 0) {
      return val
    }

    try {
      return decodeURIComponent(val)
    } catch (err) {
      if (err instanceof URIError) {
        err.message = `Failed to decode param ' ${val} '`
        err.status = err.statusCode = 400
      }

      throw err
    }
  }
}

module.exports = async (ctx, _next) => {
  const { method, path, headers, query } = ctx
  const { body } = ctx.request

  method === 'OPTIONS' && (ctx.body = {})

  const matched = matchMock(ctx)

  if (matched) {
    ctx.body = Mock.mock(matched.handler(ctx, _next))
  } else {
    ctx.body = {}
  }
}

function getMockFiles() {
  const mockFiles = glob.sync('**/*.js', { cwd: rootDir })

  const config = mockFiles.reduce((acc, filename) => ({
    ...acc,
    ...require(path.join(rootDir, filename))
  }), {})

  return normalizeConfig(config)
}

function parseKey(key) {
  const [a, b] = key.split(' ')
  const [method = 'get', path] = [b && a.toLowerCase(), b || a]

  return { method, path }
}

function createHandler(handler) {
  return (ctx, next) =>
    typeof handler === 'function' ? handler(ctx, next) : handler
}

function normalizeConfig(config) {
  return Object.keys(config).reduce((memo, key) => {
    const { method, path } = parseKey(key)
    const keys = []
    const reg = pathToRegexp(path, keys)

    return [
      ...memo,
      {
        method,
        path,
        reg,
        keys,
        handler: createHandler(config[key])
      }
    ]
  }, [])
}
