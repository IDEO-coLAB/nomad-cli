// const execa = require('execa')
// const fs = require('fs-extra')
// const tar = require('tar-fs')
// const os = require('os')
// const path = require('path')
// const R = require('ramda')
// const request = require('request');

// const { log } = require('../utils')

// const execTimeout = 60 * 1000 // 60 seconds

// module.exports = {
//   command: 'push',

//   describe: 'Push a sensor bundle to a destination',

//   // builder: {
//   //   bundle: {
//   //     type: 'string',
//   //     alias: 'b',
//   //     default: '??',
//   //     describe: 'Do we want to specify a path to the bundle??'
//   //   },
//   // },

//   handler() {
//     log(`PUSH`)

//     const IPFS_PATH = process.env.IPFS_PATH || path.resolve(os.homedir(), '.ipfs')
//     const SENSOR_PATH = process.cwd()

//     const TMP_DIR_PATH = `${os.tmpdir()}/nomad-cli`
//     const TMP_SRC_PATH = `${TMP_DIR_PATH}/libs`
//     const TMP_BUNDLE_PATH = `${TMP_DIR_PATH}/bundle`

//     // console.log('IPFS_PATH', IPFS_PATH)
//     // console.log('SENSOR_PATH', SENSOR_PATH)
//     // console.log('TMP_DIR_PATH', TMP_DIR_PATH)
//     // console.log('os.tmpdir()', os.tmpdir())

//     fs.removeSync(TMP_DIR_PATH)

//     try {
//       fs.mkdirsSync(TMP_SRC_PATH)
//       fs.mkdirsSync(TMP_BUNDLE_PATH)
//       fs.copySync(IPFS_PATH, `${TMP_SRC_PATH}/.ipfs`)
//       fs.copySync(SENSOR_PATH, `${TMP_SRC_PATH}/sensor`)
//     } catch (err) {
//       console.error(err)
//     }

//     // https://github.com/request/request#forms
//     const post = (file) => {
//       // const url = 'http://nomad-builder-1.5b837c28.cont.dockerapp.io:8080'
//       // const options = {
//       //   headers: {  },
//       //   payload: { upload: file }
//       // }
//       // wreck.post(url, options, (err, res, payload) => {
//       //   console.log(err)
//       //   console.log(res)
//       //   console.log(payload)
//       //   // Ditch the directory
//       //   fs.removeSync(TMP_DIR_PATH)
//       // })
//     }

//     // packing a directory
//     tar.pack(TMP_SRC_PATH, {
//       ignore: function(name) {
//         // ignore /.git and /node_modules files when packing
//         const isNodeModule = R.test(/nomad-cli\/libs\/sensor\/node_modules/g, name)
//         const isDotGit = R.test(/nomad-cli\/libs\/sensor\/.git/g, name)
//         return isNodeModule || isDotGit
//       }
//     })
//     .pipe(fs.createWriteStream(TMP_BUNDLE_PATH+'/bundle.tar'))
//     .on('finish', () => {
//       const bundle = fs.readFileSync(TMP_BUNDLE_PATH+'/bundle.tar')
//       console.log(bundle)
//       console.log(TMP_BUNDLE_PATH)
//       // post(bundle)
//     })
//   },
// }
