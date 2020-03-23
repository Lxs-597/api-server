module.exports = path => {
  return async (ctx, next) => {
    await next()
  }
}