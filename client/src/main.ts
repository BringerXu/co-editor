import Client, { Connection } from 'sharedb/lib/client'
import WebSocket from 'isomorphic-ws'
import richText from 'rich-text'

Client.types.register(richText.type)

const app = document.querySelector('#app')
const text = document.createTextNode('')

const socket = new WebSocket('ws://localhost:8080')
const connection = new Connection(socket)

const doc = connection.get('doc-collection', 'doc-id')

doc.subscribe((error) => {
  if (error) return console.error(error)

  if (!doc.type) {
    doc.create({ counter: 0 })
    // doc.create([{ insert: 'Lorem' }], 'http://sharejs.org/types/rich-text/v1')
  }
});

doc.on('op', (op) => {
  console.log('operation :>> ', op);
  text.textContent = JSON.stringify(doc.data)
  console.log('count', doc.data.counter)
})

window.increment = () => {
  doc.submitOp([{ p: ['counter'], na: 1 }])
}

const addOne = document.createElement('button')
addOne.innerHTML = 'add one'
addOne.onclick = window.increment
if (app) {
  app.appendChild(text)
  app.appendChild(addOne)
}