// const execa = require('execa')

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

    // const env = Object.assign({}, process.env)

    // const config = Object.assign({}, {
    //   env,
    //   stipEof: true,
    //   timeout: execTimeout,
    // }, opts)

    // const exec = args => execa(`${process.cwd()}/src/bin.js`, args, config)

    // function nom(...rest) {
    //   let args = rest
    //   if (args.length === 1) {
    //     args = args[0].split(' ')
    //   }

    //   return exec(args).then((res) => {
    //     expect(res.failed).to.eql(false)
    //     return res.stdout
    //   })
    // }


    return true
  },
}
