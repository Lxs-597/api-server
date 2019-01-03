const os = require('os')

exports.getIPAddress = () => {
  const interfaces = os.networkInterfaces()

  for (let interface of Object.values(interfaces)) {
    for (let value of Object.values(interface)) {
      if (!value.internal && value.family !== 'IPv6') {
        return value.address
      }
    }
  }
}