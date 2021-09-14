# Undici/Http request app
This app demonstrates using undici and https to make client requests.  It is intended to be used to test feature parity of instrumentation with New Relic Node.js agent.

# To use
**Note**: You must have a New Relic account set up and pass in license and app name via env vars

Currently both the agent and undici haven't been released to support this.  You must clone the following repos

```
git clone https://github.com/nodejs/undici.git
cd undici && npm install && npm link
git@github.com:bizob2828/node-newrelic.git
cd node-newrelic && git checkout undici-prototype && npm intall && npm link
```


```
npm ci
npm link undici newrelic
NEW_RELIC_LICENSE_KEY=<key> NEW_RELIC_APP_NAME=<app name> node -r newrelic index.js
```

You can use a load test tool to generate a bunch of http requests to test out distributed traces and transaction traces

```
hey http://localhost:3000/undici
hey http://localhost:3000/http
```
