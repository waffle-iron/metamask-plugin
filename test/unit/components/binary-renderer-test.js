var assert = require('assert')
var BinaryRenderer = require('../../../ui/app/components/binary-renderer')

describe('BinaryRenderer', async function () {
  let binaryRenderer
  const message = 'Hello, world!'
  const buffer = await new Buffer(message, 'utf8')
  const hex = buffer.toString('hex')

  beforeEach(async function () {
    binaryRenderer = await new BinaryRenderer()
  })

  it('recovers message', async function () {
    const result = await binaryRenderer.hexToText(hex)
    assert.equal(result, message)
  })

  it('recovers message with hex prefix', async function () {
    const result = await binaryRenderer.hexToText('0x' + hex)
    assert.equal(result, message)
  })
})
