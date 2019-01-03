const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const { host, port } = require('./config')
const cookieMiddleware = require('./middlewares/cookieMiddleware')
const router = require('./routes')

const app = new Koa()
const corsOptions = {
  'Access-Control-Allow-Origin': 'localhost',
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  allowMethods: ['OPTIONS', 'GET' , 'POST'],
  exposeHeaders: [],
  maxAge: 300,
  credentials: true
}

app.use(logger())
app.use(cors(corsOptions))
app.use(bodyParser())
app.use(cookieMiddleware)
app.use(router.routes(), router.allowedMethods())

app.listen(port, console.log(`server is start at ${host}:${port}`))