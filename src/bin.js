#! /usr/bin/env node

const yargs = require('yargs')
const updateNotifier = require('update-notifier')
const readPkgUp = require('read-pkg-up')

const updateCheckInterval = 1000 * 60 * 60 * 24 * 7 // 1 week

// Read the package.json file
const pkg = readPkgUp.sync({ cwd: __dirname }).pkg

// Check for updates and notify the user asynchronously
updateNotifier({ pkg, updateCheckInterval }).notify()

yargs
  .usage('nom COMMAND [OPTIONS]')
  .commandDir('commands')
  .help()
  .demand(1)
  .strict()
  .argv
