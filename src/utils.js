const debug = require('debug')
const fs = require('fs')
const os = require('os')
const path = require('path')

const log = debug('nomad-cli')
log.warn = debug('nomad-cli:warn')
log.err = debug('nomad-cli:error')
log.info = debug('nomad-cli:info')
log.user = console.log

const defaultConfig = {
  announceUrl: 'http://adlib-server.fc57e47a.svc.dockerapp.io:9000',
  pushUrl: null,
}

const configDirectory = '.nomad-cli'
const configFile = 'config.json'

const getPeerId = (ipfsPath) => {
  const config = JSON.parse(fs.readFileSync(ipfsPath))
  const peerId = config.Identity.PeerID
  return peerId
}

const getNodeDetails = (sensorPath) => {
  const packageObject = JSON.parse(fs.readFileSync(sensorPath))
  const name = packageObject.nomadName
  const description = packageObject.description
  const author = packageObject.author
  return { name, description, author }
}

const getConfig = () => {
  let config = Object.assign({}, defaultConfig)
  try {
    config = JSON.parse(fs.readFileSync(path.join(os.homedir(), configDirectory, configFile)))
  } catch (err) {
    if (err.code === 'ENOENT') { // no config file
      fs.mkdirSync(path.join(os.homedir(), configDirectory))
      fs.writeFileSync(path.join(os.homedir(), configDirectory, configFile), JSON.stringify(config))
    }
  }
  return config
}

const writeConfig = (object) => {
  try {
    fs.writeFileSync(path.join(os.homedir(), configDirectory, configFile), JSON.stringify(object))
  } catch (err) {
    if (err.code === 'ENOENT') {  // no config file
      fs.mkdirSync(path.join(os.homedir(), configDirectory))
      fs.writeFileSync(path.join(os.homedir(), configDirectory, configFile), JSON.stringify(object))
    }
  }
}

const getConfigPath = () => path.join(os.homedir(), configDirectory, configFile)

module.exports = { log, getPeerId, getNodeDetails, getConfig, writeConfig, getConfigPath }

