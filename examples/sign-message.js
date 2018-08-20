const util = require('../build/index')

const privateKey = process.argv[2]
const messageToSign = process.argv[3]

const signedMessage = util.signMessage(
  Buffer.from(privateKey, 'hex'),
  messageToSign
)

console.log('Signed message -> ', signedMessage)
