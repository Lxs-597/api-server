module.exports = async (ctx, next) => {
  ctx.cookies.set('JSESSIONID', '0A19B3DD3A705A5E4295E91B0B27D363')
  ctx.request.header.Cookie = 'JSESSIONID=0A19B3DD3A705A5E4295E91B0B27D363'

  await next()
}