const debug = require('debug')

const log = debug('nomad-cli')
log.warn = debug('nomad-cli:warn')
log.err = debug('nomad-cli:error')
log.info = debug('nomad-cli:info')
log.user = console.log

module.exports = { log }
