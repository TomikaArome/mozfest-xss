/*----------*
 | Requires |
 *----------*/

const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const fs = require("fs");
const util = require("util");

const ServerApp = require("./js/ServerApp.js");

// Promisify the readFile method of fs
fs.readFileAsync = util.promisify(fs.readFile);

let l0 = (n) => {
	if (n === 0) return "00";
	if (n < 10) return "0" + n;
	return "" + n;
};
let loggingDate = () => {
	let d = new Date();
	return "[ " + d.getFullYear() + "-" + l0(d.getMonth() + 1) + "-" + l0(d.getDate()) + " " + l0(d.getHours()) + ":" + l0(d.getMinutes()) + ":" + l0(d.getSeconds()) + " ]";
};

const httpApp = express();
const httpServer = http.createServer(httpApp);

httpApp.use(express.static("root"));

httpApp.get("*", (req, res) => {
	res.status(404).send("No resource at this location");
});

httpServer.listen(80, () => {
	console.log(loggingDate() + " Server listening on port 80");
});

const io = socketIo.listen(httpServer);
let chatApp = new ServerApp();
io.on("connection", (socket) => {
	chatApp.onConnect(socket);
});