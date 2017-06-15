var assert = require('assert')
var sinon = require('sinon')

var path = require('path')
var contractNamer = require(path.join(__dirname, '..', '..', 'ui', 'lib', 'contract-namer.js'))

describe('contractNamer', function () {
  beforeEach(function () {
    this.sinon = sinon.sandbox.create()
  })

  afterEach(function () {
    this.sinon.restore()
  })

  describe('naming a contract', function () {
    it('should return nothing for an unknown random account', async function () {
      const input = '0x2386F26FC10000'
      const output = await contractNamer(input)
      assert.deepEqual(output, null)
    })

    it('should accept identities as an optional second parameter', async function () {
      const input = '0x2386F26FC10000'.toLowerCase()
      const expected = 'bar'
      const identities = {}
      identities[input] = { name: expected }
      const output = await contractNamer(input, identities)
      assert.deepEqual(output, expected)
    })

    it('should check for identities case insensitively', async function () {
      const input = '0x2386F26FC10000'.toLowerCase()
      const expected = 'bar'
      const identities = {}
      identities[input] = { name: expected }
      const output = await contractNamer(input.toUpperCase(), identities)
      assert.deepEqual(output, expected)
    })
  })
})
