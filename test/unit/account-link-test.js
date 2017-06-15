var assert = require('assert')
var linkGen = require('../../ui/lib/account-link')

describe('account-link', function () {
  it('adds ropsten prefix to ropsten test network', async function (done) {
    var result = await linkGen('account', '3')
    assert.notEqual(result.indexOf('ropsten'), -1, 'ropsten included')
    assert.notEqual(result.indexOf('account'), -1, 'account included')
    done()
  })

  it('adds kovan prefix to kovan test network', async function () {
    var result = await linkGen('account', '42')
    assert.notEqual(result.indexOf('kovan'), -1, 'kovan included')
    assert.notEqual(result.indexOf('account'), -1, 'account included')
  })
})
