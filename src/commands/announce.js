const R = require('ramda')
const request = require('request')
const path = require('path')

const { log, getPeerId, getNodeDetails } = require('../utils')

const announceUrl = 'http://adlib-server.fc57e47a.svc.dockerapp.io:9000/announce'
// don't forget the endpoint /announce!!!

const isNilOrEmpty = x => { return R.isNil(x) || R.isEmpty(x) }

module.exports = {
  command: 'announce',
  describe: 'Announce a new node to adlib',

  handler() {
    const IPFS_PATH = process.env.IPFS_PATH || path.resolve(os.homedir(), '.ipfs')
    log.user(`I'm using the IPFS repo at ${IPFS_PATH} to get the node ID`)
    const SENSOR_PATH = process.cwd()
    log.user(`I'm using the nomad code at ${SENSOR_PATH}`)

    let peerID = null
    let name = null
    let description = null
    try {
      peerID = getPeerId(path.join(IPFS_PATH, 'config'))
    } catch (err) {
      log.user(`Couldn't read IPFS config at ${IPFS_PATH}`)
      process.exit(1)
    }

    try {
      const o = getNodeDetails(path.join(SENSOR_PATH, 'package.json'))
      name = o.name
      description = o.description
    } catch (err) {
      log.user(`Couldn't read package.json in ${SENSOR_PATH}. I need that for your node's name and description`)
      process.exit(1)
    }

    if (isNilOrEmpty(name)) {
      log.user(`Your package.json needs a 'name' property`)
      process.exit(1)
    }

    if (isNilOrEmpty(description)) {
      log.user(`Your package.json needs a 'description' property`)
      process.exit(1)
    }

    log.user(`I'm announcing to ${announceUrl}`)

    announce(name, description, peerID)
  }
}



const announce = (name, description, peerID) => {
  var body = { name, description, peerID }
  request.post({ url: announceUrl, json: true, body }, function optionalCallback(err, httpResponse, body) {
    if (err) { return log('announce failed:', err) }
    log.user(`\n\n🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🍅 🍆 🌶 🌽 🍠`)
    log.user(`nom Nom NOM. Announced to adlib`)
    log.user(`🎙  ${name} 🎙`)
    log.user(`👉  ${description} 👈`)
    log.user(`📡  ${peerID} 📡`)
    log.user(`🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🍅 🍆 🌶 🌽 🍠`)
  })
}
