/*----------*
 | Requires |
 *----------*/

/*const express = require("express");
const fs = require("fs");
const util = require("util");

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
const httpServer = require("http").createServer(httpApp);

httpApp.get("/js/jquery.js", (req, res) => {
	res.redirect("https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js");
});

httpApp.use(express.static("root"));

httpApp.get("*", (req, res) => {
	res.status(404).send("No resource at this location");
});

const io = require("socket.io")(httpServer);
io.on("connection", (socket) => {
	console.log(socket.id);
	console.log(loggingDate() + " A user connected");
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});
});

httpApp.listen(80, () => {
	console.log(loggingDate() + " Server listening on port 80");
});*/