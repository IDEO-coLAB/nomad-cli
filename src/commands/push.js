const execa = require('execa')
const fs = require('fs-extra')
const tar = require('tar-fs')
const os = require('os')
const path = require('path')
const R = require('ramda')
const request = require('request');

const { log } = require('../utils')

const execTimeout = 60 * 1000 // 60 seconds
const postUrl = 'http://nomad-builder-1.0ed57f2f.cont.dockerapp.io:8080/upload'
// don't forget the endpoint /upload!!!

module.exports = {
  command: 'push',
  describe: 'Push a sensor bundle to a destination',

  // builder: {
  //   bundle: {
  //     type: 'string',
  //     alias: 'b',
  //     default: '??',
  //     describe: 'Do we want to specify a path to the bundle??'
  //   },
  // },

  handler() {
  	debugger
    log(`PUSH`)

    const IPFS_PATH = process.env.IPFS_PATH || path.resolve(os.homedir(), '.ipfs')
    log.user(`I'm using the IPFS repo at ${IPFS_PATH}`)
    const SENSOR_PATH = process.cwd()
    log.user(`I'm using the nomad code at ${SENSOR_PATH}`)
    log.user(`I'm sending your code to ${postUrl}`)

    const TMP_DIR_PATH = `${os.tmpdir()}/nomad-cli`
    const TMP_SRC_PATH = `${TMP_DIR_PATH}/libs`
    const TMP_BUNDLE_PATH = `${TMP_DIR_PATH}/bundle`

    // console.log('IPFS_PATH', IPFS_PATH)
    // console.log('SENSOR_PATH', SENSOR_PATH)
    // console.log('TMP_DIR_PATH', TMP_DIR_PATH)
    // console.log('os.tmpdir()', os.tmpdir())

    fs.removeSync(TMP_DIR_PATH)

    try {
      fs.mkdirsSync(TMP_SRC_PATH)
      fs.mkdirsSync(TMP_BUNDLE_PATH)
      fs.copySync(IPFS_PATH, `${TMP_SRC_PATH}/.ipfs`)
      fs.copySync(SENSOR_PATH, `${TMP_SRC_PATH}/sensor`)
    } catch (err) {
      console.error(err)
    }

    // packing a directory
    tar.pack(TMP_SRC_PATH, {
      ignore: function(name) {
        // ignore /.git and /node_modules files when packing
        const isNodeModule = R.test(/nomad-cli\/libs\/sensor\/node_modules/g, name)
        const isDotGit = R.test(/nomad-cli\/libs\/sensor\/.git/g, name)
        return isNodeModule || isDotGit
      }
    })
    .pipe(fs.createWriteStream(TMP_BUNDLE_PATH+'/bundle.tar'))
    .on('finish', () => {
    	const bundlePath = `${TMP_BUNDLE_PATH}/bundle.tar`
    	log(`The tarball is here: ${bundlePath}`)
      post(bundlePath, postUrl)
    })
  },
}

// file is absolute path to tarball
// https://github.com/request/request#forms
const post = (file, url) => {
  var formData = {
    upload: fs.createReadStream(file),
  }
 
  request.post({ url, formData }, function optionalCallback(err, httpResponse, body) {
    if (err) { return log('upload failed:', err) }
    log.user(`nom Nom NOM. Nomad code pushed`)
  })
}
