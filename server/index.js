const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) =>{
    console.log(`User connected ${socket.id}`); //connecting to the front end which is client
    socket.on('join_room',(data) =>{
        socket.join(data) // catching the room id which is emitted from the front-end
        //console.log(`User with id = ${socket.id} joined room ${data}`)
    });
    socket.on("send_message", (data) => {
        //console.log(data)
        //emiiting the recieved data to front-end and using .to(roomid) to emit to only people within the same room
        socket.to(data.room).emit("recieve_message", data) 
        
    } )
    //for when server is closed
    socket.on("disconnect",()=>{
        console.log("User disconnected", socket.id)
    })
})

server.listen(3001, () => {
    console.log("SERVER RUNNIG")
})
