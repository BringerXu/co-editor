import http from 'http'
import express from 'express'
import WebSocket from 'ws'
import ShareDB from 'sharedb'
import WebSocketJSonStream from '@teamwork/websocket-json-stream'
import richText from 'rich-text'

import mongoDB from 'sharedb-mingo'
const db = mongoDB('mongodb://bringerxu.xyz:27017', {})

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server: server })

ShareDB.types.register(richText.type)
const backend = new ShareDB({ db })

wss.on('connection', (websocket) => {
  const stream = new WebSocketJSonStream(websocket)
  backend.listen(stream);
})

server.listen(8080)
