require('dotenv').config()
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 8081

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    return next()
})

io.on('connection', socket =>
    socket.on('presenter', data => {
        console.log('data', data)

        return io.sockets.emit('spectator', data)
    })
)

server.listen(port, () =>
    console.log(`Running on ${port} port :: Let's make AFrame LIVE!`)
)
