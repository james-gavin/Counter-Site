const express = require("express");
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors")

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    },
});

const data = [0,0]

io.on("connection" , (socket) => {
    data[0] += 1

    socket.broadcast.emit('upUsers', data)

    console.log(`User Connected: ${socket.id}`)
    socket.emit('update', data)
    

    socket.on("add", (count) => {
        data[1] = count
        socket.broadcast.emit('update', data)
    })

    socket.on("sub", (count) => {
        data[1] = count
        socket.broadcast.emit('update', data)
    })

    socket.on("disconnect", ()=>{
        data[0] -= 1
        socket.broadcast.emit('upUsers', data)
    })
})

server.listen(3001, () =>{
    console.log("SERVER IS RUNNING")
})
