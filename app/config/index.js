const utils = require('../utils')
const host = utils.getIPAddress()
const port = Number.parseInt(process.env.PORT) || 9001

module.exports = {
  host: host,
  port: port,
}