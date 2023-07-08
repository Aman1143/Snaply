import express from 'express'
const app = express();
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/AuthRoute.js'
import PostRoute from './routes/PostRoute.js'
import path from "path";
import os from "os"
console.log(os.cpus());




app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())


app.use('/api/user', AuthRoute);
app.use('/api/post', PostRoute);

dotenv.config();
const PORT = process.env.PORT;

const connect = async () => {
	await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log("connected");
}
connect();

app.use(express.static(path.resolve(path.resolve(), 'client', 'build')));
app.get('/', (req, res) => {
	res.sendFile(path.resolve(path.resolve() + '/client/build/index.html'))
})

app.listen(80, () => {
	console.log("runing");
})



import { spawn } from 'node:child_process';
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
}); 
