module.exports =  {
  '/list/:page/:size': {
    'code': 1,
    'data|10': [
      {
        'id': '@id',
        'name': '@name',
        'title': '@title'
      }
    ]
  },
  '/detail': {
    'code': 1,
    'data': {
      'id': '@id',
      'name': '@name',
      'title': '@title'
    }
  }
}