module.exports = async (ctx, next) => {
  ctx.cookies.set('', '')

  await next()
}