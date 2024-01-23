import express from 'express'
const app = express();
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/AuthRoute.js'
import PostRoute from './routes/PostRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import { Server } from 'socket.io';
import http from 'http'
import path from "path";


const httpServer = http.createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: ["http://localhost:3000"],
	}
})

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId == userId) &&
		users.push({ userId, socketId });
}

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (receivedId) => {
	return users.find(user => user.userId === receivedId);
}

io.on("connection", (socket) => {
	console.log("connection is ready");
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit('getUsers', users);

	})

	socket.on('sendMessage', ({ senderId, receivedId, text }) => {
		const user = getUser(receivedId); 
		io.emit("getMessage", { senderId, text }); 
	})
    

	socket.on("typing",({me})=>{
		let flag=true;
		io.emit("userTyping",{flag,me}); 
	})


	socket.on("disconnect", (socket) => {
		console.log("user left...")
		removeUser(socket.id);
		io.emit('getUsers', users);
	})
})

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())


app.use('/api/user', AuthRoute);
app.use('/api/post', PostRoute);
app.use('/api/chat', ChatRoute);


dotenv.config();
const PORT = process.env.PORT;

const connect = async () => {
	await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
	httpServer.listen(PORT, () => {
		console.log(`connection is establist with localhost:${PORT}`);
	})
}
connect();

app.use(express.static(path.resolve(path.resolve(), 'client', 'build')));
app.get('/', (req, res) => {
	res.sendFile(path.resolve(path.resolve() + '/client/build/index.html'))
})






