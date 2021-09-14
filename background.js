'use strict'
const { Client, request } = require('undici')
const diagChannel = require('diagnostics_channel')
const WAIT = process.env.WAIT || 1

})
console.log(`Waiting ${WAIT} seconds`)
setTimeout(() => {
  console.log('starting')
  newrelic.startBackgroundTransaction('undici-stuff', async function makeRequest() {
    const transaction = newrelic.getTransaction()
    try {
      const { body, statusCode, headers } = await request('https://httpbin.org', {
        path: '/post?foo=bar&baz=bot',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-bob': 'hiya'
        },
        body: Buffer.from(`{"key":"value","bob":"test"}`)
      })
      const text = await body.json()
      console.log('text', text)
      console.log('statusCode', statusCode)
    } catch(err) {
      newrelic.noticeError(err)
      console.error(err)
    }
    transaction.end()
    newrelic.shutdown({ collectPendingData: true }, (err) => {
      console.log(`Error?`, err)
      console.log('done!')
      process.exit(0)
    })
  })
}, WAIT * 1000)

