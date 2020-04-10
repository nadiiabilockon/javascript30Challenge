const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', ws => {
    ws.on('message', msg => {
        if (msg === 'exit') {
            ws.close()
        } else {
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg)
                }
            })
        }
    })
    ws.send('Welcome!')
})