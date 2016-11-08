/* eslint-env mocha */

const expect = require('chai').expect
const nom = require('../utils/cli-exec')({})

describe('push', () => {
  before(() => {})

  after(() => {})

  it('success', (done) => {
    nom('push').then((result) => {
      expect(result).to.exist
      done()
    })
  })
})
