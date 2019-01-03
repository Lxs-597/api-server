const axios = require('axios')
const baseURL = ''

module.exports = async (ctx, _next) => {
  const { method, path, headers, query } = ctx
  const { body } = ctx.request

  method === 'OPTIONS' && (ctx.body = {})

  const options = {
    baseURL,
    url: path,
    method,
    headers,
    params: method === 'GET' ? query : {},
    data: method === 'POST' ? body : {}
  }

  try {
    const result = await axios(options)
    const { data = {} } = result
    ctx.body = data
  } catch (e) {
    ctx.body = e.message
  }
}