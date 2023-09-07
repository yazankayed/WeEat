const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const restaurant = require("./routes/restraunt");
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

require("dotenv").config();
const port = process.env.PORT;
require("./config/mongoose.config");
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(restaurant);
// require("./routes/Player.routes")(app);
// require("./routes/restraunt")(app);
require("./routes/users")(app);
require("./routes/widget")(app);


// const cookieParser = require('cookie-parser');

app.use(cors({

    credentials:true
}));
app.use(express.json());

// app.use(cookieParser());

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages
    socket.on('chatMessage', (message) => {
      // Broadcast the message to all connected clients
      io.emit('chatMessage', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

server.listen(port, function () {
    console.log(`The server has started on PORT: ${port}`);
});

const msgs = [];
io.on("connection", socket => {
    console.log("Nice to meet me.");
    socket.emit("welcome", "Welcome to our socket!");
    io.emit("messages_to_chat", msgs);
    socket.on("message_from_client", data => {
        msgs.push(data);
        io.emit("messages_to_chat", msgs);
    });
    socket.on("new_user", data => {
        msgs.push({msg:data+" has joined the chat"});
        io.emit("messages_to_chat", msgs);
    });
});