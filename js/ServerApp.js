const ServerUser = require("./ServerUser.js");
const ServerRoom = require("./ServerRoom.js");

/**
 * Class which represents the entire chat application
 */
module.exports = class ServerApp {
	
	
	/**
	 * Constructor for the app
	 */
	constructor() {
		
		// Initialise properties
		this.rooms = [];
		this.users = [];
		
		// Create a first room, which is the special ID 0 room in which users cannot send messages
		this.newRoom(0);
		
	}
	
	/**
	 * Triggers when a new connection is established
	 */
	onConnect(socket) {
		
		// Log to the console
		console.log("Socket " + socket.id + " connected");
		
		// Create a new user
		let user = new ServerUser(socket, this);
		this.users[user.id] = user;
		
	}
	
	/**
	 * Creates a new room
	 * @return The room instance which was just created
	 */
	newRoom(roomId) {
		let room = new ServerRoom(roomId);
		this.rooms[room.id] = room;
		return room;
	}
	
	/**
	 * Gets a room by ID
	 * @param roomId The ID of the room
	 */
	getRoom(roomId) {
		return typeof this.rooms[roomId] === "object" ? this.rooms[roomId] : null;
	}
	
}