const Router = require('koa-router')
const controller = require('../controllers')

const router = new Router()

router.all('*', controller)

module.exports = router