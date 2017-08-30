require('dotenv').config()
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
// const fetch = require('node-fetch')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

io.on('connection', socket => {
    socket.on('positionCardBoard', data => {
        console.log('New position on Card Board!', data)

        io.sockets.emit('positionDesktop', {
            x: data.x,
            y: data.y,
            z: data.z
        })
    })
})

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
