const assert = require('assert')

const PersonalMessageManager = require('../../app/scripts/lib/personal-message-manager')

describe('Personal Message Manager', function () {
  let messageManager

  beforeEach(async function () {
    messageManager = await new PersonalMessageManager()
  })

  describe('#getMsgList', function () {
    it('when new should return empty array', function () {
      var result = messageManager.messages
      assert.ok(Array.isArray(result))
      assert.equal(result.length, 0)
    })
    it('should also return transactions from local storage if any', function () {

    })
  })

  describe('#addMsg', function () {
    it('adds a Msg returned in getMsgList', async function () {
      var Msg = { id: 1, status: 'approved', metamaskNetworkId: 'unit test' }
      await messageManager.addMsg(Msg)
      var result = messageManager.messages
      assert.ok(Array.isArray(result))
      assert.equal(result.length, 1)
      assert.equal(result[0].id, 1)
    })
  })

  describe('#setMsgStatusApproved', function () {
    it('sets the Msg status to approved', async function () {
      var Msg = { id: 1, status: 'unapproved', metamaskNetworkId: 'unit test' }
      await messageManager.addMsg(Msg)
      await messageManager.setMsgStatusApproved(1)
      var result = messageManager.messages
      assert.ok(Array.isArray(result))
      assert.equal(result.length, 1)
      assert.equal(result[0].status, 'approved')
    })
  })

  describe('#rejectMsg', function () {
    it('sets the Msg status to rejected', async function () {
      var Msg = { id: 1, status: 'unapproved', metamaskNetworkId: 'unit test' }
      await messageManager.addMsg(Msg)
      await messageManager.rejectMsg(1)
      var result = messageManager.messages
      assert.ok(Array.isArray(result))
      assert.equal(result.length, 1)
      assert.equal(result[0].status, 'rejected')
    })
  })

  describe('#_updateMsg', function () {
    it('replaces the Msg with the same id', async function () {
      await messageManager.addMsg({ id: '1', status: 'unapproved', metamaskNetworkId: 'unit test' })
      await messageManager.addMsg({ id: '2', status: 'approved', metamaskNetworkId: 'unit test' })
      await messageManager._updateMsg({ id: '1', status: 'blah', hash: 'foo', metamaskNetworkId: 'unit test' })
      var result = messageManager.getMsg('1')
      assert.equal(result.hash, 'foo')
    })
  })

  describe('#getUnapprovedMsgs', function () {
    it('returns unapproved Msgs in a hash', async function () {
      await messageManager.addMsg({ id: '1', status: 'unapproved', metamaskNetworkId: 'unit test' })
      await messageManager.addMsg({ id: '2', status: 'approved', metamaskNetworkId: 'unit test' })
      const result = messageManager.getUnapprovedMsgs()
      assert.equal(typeof result, 'object')
      assert.equal(result['1'].status, 'unapproved')
      assert.equal(result['2'], undefined)
    })
  })

  describe('#getMsg', function () {
    it('returns a Msg with the requested id', async function () {
      await messageManager.addMsg({ id: '1', status: 'unapproved', metamaskNetworkId: 'unit test' })
      await messageManager.addMsg({ id: '2', status: 'approved', metamaskNetworkId: 'unit test' })
      assert.equal(messageManager.getMsg('1').status, 'unapproved')
      assert.equal(messageManager.getMsg('2').status, 'approved')
    })
  })

  describe('#normalizeMsgData', function () {
    it('converts text to a utf8 hex string', async function () {
      var input = 'hello'
      var output = await messageManager.normalizeMsgData(input)
      assert.equal(output, '0x68656c6c6f', 'predictably hex encoded')
    })

    it('tolerates a hex prefix', async function () {
      var input = '0x12'
      var output = await messageManager.normalizeMsgData(input)
      assert.equal(output, '0x12', 'un modified')
    })

    it('tolerates normal hex', async function () {
      var input = '12'
      var output = await messageManager.normalizeMsgData(input)
      assert.equal(output, '0x12', 'adds prefix')
    })
  })
})
