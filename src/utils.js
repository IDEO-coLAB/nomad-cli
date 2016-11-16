const debug = require('debug')
const fs = require('fs')

const log = debug('nomad-cli')
log.warn = debug('nomad-cli:warn')
log.err = debug('nomad-cli:error')
log.info = debug('nomad-cli:info')
log.user = console.log

const getPeerId = (ipfsPath) => {
	console.log(ipfsPath)
	const config = JSON.parse(fs.readFileSync(ipfsPath))
	const peerId = config['Identity']['PeerID']
	return peerId
}

const getNodeDetails = (sensorPath) => {
	const package = JSON.parse(fs.readFileSync(sensorPath))
	const name = package['name']
	const description = package['description']
	return { name, description }
}

module.exports = { log, getPeerId, getNodeDetails }
