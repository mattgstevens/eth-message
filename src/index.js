// @flow

const ethereumJsUtil = require('ethereumjs-util')

// https://github.com/MyCryptoHQ/MyCrypto/blob/e761b9d1fbeb33ad548f39d68365fd531ea003ae/common/libs/signing.ts#L21
type SignMessageT = (Buffer, string) => string
const signMessage: SignMessageT = (privateKey, message) => {
  const hash = ethereumJsUtil.hashPersonalMessage(
    ethereumJsUtil.toBuffer(message)
  )
  const signed = ethereumJsUtil.ecsign(hash, privateKey)
  const combined = Buffer.concat([
    Buffer.from(signed.r),
    Buffer.from(signed.s),
    Buffer.from([signed.v])
  ])
  const combinedHex = combined.toString('hex')

  return ethereumJsUtil.addHexPrefix(combinedHex)
}

// https://ethereum.stackexchange.com/questions/12033/sign-message-with-metamask-and-verify-with-ethereumjs-utils
type VerifyMessageT = (string, string) => string
const verifyMessage: VerifyMessageT = (signedMessage, message) => {
  const messageBuffer = ethereumJsUtil.toBuffer(message)
  const messageHash = ethereumJsUtil.hashPersonalMessage(messageBuffer)
  const signatureBuffer = ethereumJsUtil.toBuffer(signedMessage)
  const signatureParams = ethereumJsUtil.fromRpcSig(signatureBuffer)
  const publicKey = ethereumJsUtil.ecrecover(
    messageHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  )
  const addressBuffer = ethereumJsUtil.publicToAddress(publicKey)
  const address = ethereumJsUtil.bufferToHex(addressBuffer)

  return address
}

module.exports = {
  signMessage,
  verifyMessage
}
