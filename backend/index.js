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

io.on("connection" , (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("add", (count) => {
        socket.broadcast.emit('update', count)
    })

    socket.on("sub", (count) => {
        socket.broadcast.emit('update', count)
    })
})

server.listen(3001, () =>{
    console.log("SERVER IS RUNNING")
})
