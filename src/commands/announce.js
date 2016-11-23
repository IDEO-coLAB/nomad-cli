const R = require('ramda')
const request = require('request')
const path = require('path')
const os = require('os')
const { log, getPeerId, getNodeDetails, getConfig, getConfigPath } = require('../utils')
const argv = require('yargs').argv

const isNilOrEmpty = x => R.isNil(x) || R.isEmpty(x)

const config = getConfig()
const configPath = getConfigPath()
const announceEndpoint = '/announce'
const removeEndpoint = '/remove'

const announce = () => {
  if (R.isNil(config.announceUrl)) {
    log.user(`Please add an announce url to ${configPath}`)
    log.user('{announceUrl: ANNOUNCE_URL}')
    process.exit(1)
  }

  const announceUrl = `${config.announceUrl}${announceEndpoint}`
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
    author = o.author
  } catch (err) {
    log.user(`Couldn't read package.json in ${SENSOR_PATH}. I need that for your node's name and description`)
    process.exit(1)
  }

  if (isNilOrEmpty(name)) {
    log.user('Your package.json needs a \'nomadName\' property')
    process.exit(1)
  }

  if (isNilOrEmpty(description)) {
    log.user('Your package.json needs a \'description\' property')
    process.exit(1)
  }

  if (isNilOrEmpty(author)) {
    log.user('Your package.json needs an \'author\' property')
    process.exit(1)
  }

  const body = { name, description, author, peerID }
  request.post({ url: announceUrl, json: true, body }, (err) => {
    if (err) { return log('announce failed:', err) }
    log.user('Announced to adlib')
    log.user(`🎙  ${name}`)
    log.user(`👉  ${description}`)
    log.user(`📡  ${peerID}`)
    return null
  })
}

const remove = (peerID) => {
  if (R.isNil(config.announceUrl)) {
    log.user(`Please add an announce url to ${configPath}`)
    log.user('{announceUrl: ANNOUNCE_URL}')
    process.exit(1)
  }

  const announceUrl = `${config.announceUrl}${removeEndpoint}`
  const body = { peerID }
  request.post({ url: announceUrl, json: true, body }, (err) => {
    if (err) { return log('unannounce failed:', err) }
    log.user('Removed node from Adlib')
    log.user(`📡  ${peerID}`)
    return null
  })
}

module.exports = {
  command: 'announce',
  describe: 'announce or remove a node from adlib',
  builder: function(yargs) {
    return yargs.options({
      'r': {
        alias: 'remove',
        describe: 'remove node with given peerId from adlib',
        type: 'string',
        nargs: 1,
        requiresArg: true
      }
    })
  },
  handler() {
    if (argv.r) {
      remove(argv.r)
    } else if (argv.remove) {
      remove(argv.remove)
    } else {
      announce()
    }
  }
}




