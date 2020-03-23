module.exports = {
  'POST /login': ctx => {
    return {
      code: 1,
      data: {
        'userId': '@id',
        'userName': '@cname',
        'avatar': '@image(50x50)'
      }
    }
  }
}