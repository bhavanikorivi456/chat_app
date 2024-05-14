var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var users = []; // Declare users array using 'var', 'let', or 'const'
var connections = []; // Declare connections array using 'var', 'let', or 'const'

server.listen(3000);

// Ignore favicon request
app.get('/favicon.ico', (req, res) => res.status(204))

app.get("/", function(req, res){
    // Route for localhost:3000/
    res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket){
    // When client connects to the server
    connections.push(socket); // Add socket details to custom array
    console.log("Connected: %s socket(s) connected", connections.length); // Log current connections

    socket.on("disconnect", function(data){
        // Client disconnects from the server
        connections.splice(connections.indexOf(socket), 1); // Delete socket details
        console.log("Disconnected: %s socket(s) connected", connections.length); // Log current connections
    });

    socket.on("send message", function(data){
        console.log(data);
        io.sockets.emit("new message", { msg: data });
    });
});

console.log("Server is listening");