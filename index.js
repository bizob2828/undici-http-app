'use strict'
const { Client, request: undiciRequest } = require('undici')
const https = require('http')
const { PORT = 3000, HOST = 'localhost' } = process.env;
const fastify = require('fastify')({ logger: true });

fastify.get('/undici', async (request, reply) => {
    try {
      const { body, statusCode, headers } = await undiciRequest('https://httpbin.org', {
        path: '/post?foo=bar&baz=bot',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-bob': 'hiya'
        },
        body: Buffer.from(`{"key":"value","bob":"test"}`)
      })
      const text = await body.json()
      reply.send(text)
    } catch(err) {
      reply.code(500).send(err)
    }
})

fastify.get('/http', (request, reply) => {
  const postData = JSON.stringify({
    key: 'value',
    bob: 'test'
  })

  const options = {
    hostname: 'httpbin.org',
    path: '/post?foo=bar&baz=bot',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-bob': 'hiya',
      'Content-Length': postData.length
    }
  }
  const req = https.request(options, (res) => {
    res.setEncoding('utf8')
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      const result = JSON.parse(data)
      reply.send(result)
    })

  }).on('error', (err) => {
      reply.code(500).send(err)
    })

  req.write(postData)
  req.end()
})

const start = async () => {
  try {
    await fastify.listen(PORT, HOST)
  } catch(err) {
    console.error(err)
  }
}

start()
