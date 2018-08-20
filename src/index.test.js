// @flow

const test = require('tape')

const util = require('./index')

const data = {
  inputs: {
    messageToSign: 'identifying-message',
    publicKey: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
    // NOTE: there is no `0x` prefix here
    privateKey:
      '4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'
  },
  outputs: {
    signedMessage:
      '0xdf6e042ae2990393ef023ec5c1ce4fdbd934e8961f0a37251287c990efb6bf953e1289ed50e01bc446786c2c6936e9914e20c5e31c85790a971c85e769df3d6c1c'
  }
}

test('signMessage -> has deterministic output', t => {
  t.equal(
    util.signMessage(
      Buffer.from(data.inputs.privateKey, 'hex'),
      data.inputs.messageToSign
    ),
    data.outputs.signedMessage,
    'signedMessage hash does not change'
  )

  t.end()
})

test('verifyMessage -> has deterministic output', t => {
  t.equal(
    util.verifyMessage(data.outputs.signedMessage, data.inputs.messageToSign),
    data.inputs.publicKey,
    'address that signed message does not change'
  )

  t.end()
})
