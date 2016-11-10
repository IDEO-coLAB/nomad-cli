const execa = require('execa')
const expect = require('chai').expect

const execTimeout = 60 * 1000 // 60 seconds

// This is a test utility to easily check and execute
// nomad cli commands (namespaced with `nom`).
//
// The top level export is a function that can be passed
// `opts` to customize the execution of the commands.
//
// The export returns an executer, which consists of
// `nom('launch')` and `nom.fail('launch')`
//
// The first one executes and asserts that the command ran successfully
// and returns a promise which is resolved to `stdout` of the command.
//
// The `.fail` variation asserts that the command exited with `Code > 0`
// and returns a promise that resolves to `stderr`.

module.exports = (opts) => {
  const env = Object.assign({}, process.env)

  const config = Object.assign({}, {
    env,
    stripEof: true,
    timeout: execTimeout,
  }, opts)

  const exec = args => execa(`${process.cwd()}/src/bin.js`, args, config)

  function nom(...rest) {
    let args = rest
    if (args.length === 1) {
      args = args[0].split(' ')
    }

    return exec(args).then((res) => {
      expect(res.failed).to.eql(false)
      return res.stdout
    })
  }

  nom.fail = (...rest) => {
    let args = rest
    if (args.length === 1) {
      args = args[0].split(' ')
    }

    return exec(args).catch((err) => {
      expect(err).to.exist
    })
  }

  return nom
}
