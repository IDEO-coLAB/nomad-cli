const fs = require('fs-extra')
const tar = require('tar-fs')
const os = require('os')
const path = require('path')
const R = require('ramda')
const request = require('request')
const { log, getConfig, getConfigPath } = require('../utils')

const config = getConfig()
const pushUrl = config.pushUrl
const configPath = getConfigPath()

// file is absolute path to tarball
// https://github.com/request/request#forms
const post = (file, url) => {
  const formData = {
    upload: fs.createReadStream(file),
  }

  request.post({ url, formData }, (err) => {
    if (err) { return log('upload failed:', err) }
    log.user('nom Nom NOM. Nomad code pushed')
    return null
  })
}

module.exports = {
  command: 'push',
  describe: 'Push Nomad node code to be hosted remotely',

  handler() {
    if (R.isNil(pushUrl)) {
      log.user(`Please add a push url to ${configPath}`)
      log.user('{pushUrl: PUSH_URL}')
      process.exit(1)
    }

    const IPFS_PATH = process.env.IPFS_PATH || path.resolve(os.homedir(), '.ipfs')
    log.user(`I'm using the IPFS repo at ${IPFS_PATH}`)
    const SENSOR_PATH = process.cwd()
    log.user(`I'm using the nomad code at ${SENSOR_PATH}`)
    log.user(`I'm sending your code to ${pushUrl}`)

    const TMP_DIR_PATH = `${os.tmpdir()}/nomad-cli`
    const TMP_SRC_PATH = `${TMP_DIR_PATH}/libs`
    const TMP_BUNDLE_PATH = `${TMP_DIR_PATH}/bundle`

    fs.removeSync(TMP_DIR_PATH)

    try {
      fs.mkdirsSync(TMP_SRC_PATH)
      fs.mkdirsSync(TMP_BUNDLE_PATH)
      fs.copySync(IPFS_PATH, `${TMP_SRC_PATH}/.ipfs`)
      fs.copySync(SENSOR_PATH, `${TMP_SRC_PATH}/sensor`)
    } catch (err) {
      log.user(err)
    }

    // packing a directory
    tar.pack(TMP_SRC_PATH, {
      ignore(name) {
        // ignore /.git and /node_modules files when packing
        const isNodeModule = R.test(/nomad-cli\/libs\/sensor\/node_modules/g, name)
        const isDotGit = R.test(/nomad-cli\/libs\/sensor\/.git/g, name)
        return isNodeModule || isDotGit
      },
    })
    .pipe(fs.createWriteStream(`${TMP_BUNDLE_PATH}/bundle.tar`))
    .on('finish', () => {
      const bundlePath = `${TMP_BUNDLE_PATH}/bundle.tar`
      log(`The tarball is here: ${bundlePath}`)
      post(bundlePath, pushUrl)
    })
  },
}
