const { log } = require('../utils')

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

  handler(argv) {
    log(`PUSH ${argv}`)
    return true
  },
}
