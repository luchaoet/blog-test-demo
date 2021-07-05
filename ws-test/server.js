const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 3000,
})

wss.on('connection', function (ws) {
  console.log(`[SERVER] connection`)
  ws.on('message', function (message) {
    console.log(`[SERVER] Received: ${message}`)
    ws.send(`ECHO: ${message}`, (err) => {
      if (err) {
        console.log(`[SERVER] error: ${err}`)
      }
    })
  })
})
