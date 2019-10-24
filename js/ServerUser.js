/**
 * Class which represent a user who's connected to the app
 * A user is tied to a socket
 */
module.exports = class ServerUser {
	
	/**
	 * Constructs a new user
	 * @param socket The socket tied to this user
	 * @param app The ServerApp object this user belongs to
	 */
	constructor(socket, app) {
		
		// The app object
		this.app = app;
		
		// The socket object
		this.socket = socket;
		
		// The nickname of the user
		this.nickname = "";
		
		// Choose a random hue value for the nickname to appear in this client
		this.nicknameHue = Math.floor(Math.random() * 360);
		
		// Join the room 0 by default
		this.joinRoom(this.app.rooms[0]);
		
		/*--------*
		 | Events |
		 *--------*/
		
		// initConnect event
		this.socket.on("initConnect", ({ nickname, roomId }) => {
			// Change the nickname
			this.changeNickname(nickname);
			// Join the desired room
			roomId = parseInt(roomId) || 0;
			if (typeof this.app.rooms[roomId] !== "object") {
				this.app.newRoom(roomId);
			}
			this.joinRoom(this.app.rooms[roomId]);
		});
		
		// joinRoom event
		this.socket.on("joinRoom", (data) => {
			let roomId = parseInt(data.roomId) || 0;
			if (typeof this.app.rooms[roomId] !== "object") {
				this.app.newRoom(roomId);
			}
			this.joinRoom(this.app.rooms[roomId]);
		});
		
		// changeNickname event
		this.socket.on("changeNickname", ({ nickname }) => {
			this.changeNickname(nickname);
		});
		
		// disconnect event
		this.socket.on("disconnect", () => {
			this.onDisconnect();
		});
		
		// message event
		this.socket.on("message", ({ messageContents }) => {
			this.sendMessage(messageContents);
		});
		
		// nicknameHue event
		this.socket.on("nicknameHue", ({ nicknameHue }) => {
			this.nicknameHue = nicknameHue;
		});
	}
	
	/**
	 * The user's ID is an alias for the socket ID
	 */
	get id() {
		return this.socket.id;
	}
	
	/**
	 * Gets the room in which the user is currently in
	 */
	get room() {
		let r = null;
		for (let i in this.app.rooms) {
			if (this.app.rooms[i].hasUser(this)) {
				r = this.app.rooms[i];
				break;
			}
		}
		return r;
	}
	
	get formattedNickname() {
		return `<span style="color: hsl(${this.nicknameHue},50%,50%)">${this.nickname}</span>`;
	}
	
	/**
	 * Sends a informational message to just this user
	 */
	sendInfoMessage(messageContents) {
		this.socket.emit("infoMessage", { messageContents });
	}
	
	/**
	 * Joins a room
	 * @param room The room to join
	 */
	joinRoom(room) {
		// Remove the user from its current room
		let previousRoomNull = this.room === null;
		if (!previousRoomNull) {
			// Check if room is the same as the current room
			if (this.room == room) { return; }
			// Remove the user from this room
			this.room.removeUser(this);
		}
		// Add it to the new room
		room.addUser(this);
		// Send an info message to the user informing them of this change
		if (previousRoomNull) {
			this.sendInfoMessage("Connected to server");
		} else {
			// Find names of users in this room
			let otherUsers = "";
			for (let i in room.users) {
				if (room.users[i] != this) { otherUsers += room.users[i].formattedNickname + ", "; }
			}
			if (otherUsers === "") {
				this.sendInfoMessage("You joined room " + room.id + ", the room is currently empty");
			} else {
				otherUsers = otherUsers.substr(0, otherUsers.length - 2);
				this.sendInfoMessage("You joined room " + room.id + ", other users in room: " + otherUsers);
			}
			
		}
	}
	
	/**
	 * Changes the nickname of the user
	 */
	changeNickname(nickname) {
		let previousNickname = this.nickname;
		let previousFormattedNickname = this.formattedNickname;
		// If the nickname is unassigned, choose a name out of random among an array
		if (nickname === "") {
			const arrayOfNames = ["Alfred", "Andrew", "Claire", "Thomas", "Vincent", "Mike", "David", "John", "Sarah", "Lucy", "Steve", "Billy", "Julie", "Luna"];
			nickname = arrayOfNames[Math.floor(Math.random() * arrayOfNames.length)];
		}
		this.nickname = nickname;
		if (previousNickname !== "") {
			this.room.sendInfoMessage(previousFormattedNickname + " is now known as " + this.formattedNickname);
		}
	}
	
	/**
	 * Sends a message from this user to the room they're in
	 * @param messageContents The contents of the message to send
	 */
	sendMessage(messageContents) {
		if (this.room === null) { console.log("Attempted to send a message while the user is not in the room"); return; }
		this.room.sendMessage(this, messageContents);
	}
	
	/**
	 * Sends a message from the specified user
	 * @param author The user who wrote the message
	 * @param messageContents The contents of the message to send
	 */
	sendMessageFromUser(author, messageContents) {
		this.socket.emit("message", {
			author: { nickname: author.nickname, nicknameHue: author.nicknameHue },
			messageContents
		});
	}
	
	/**
	 * Triggers when the user disconnects
	 */
	onDisconnect() {
		
		// Log to the console
		console.log("Socket " + this.id + " disconnected");
		
		// Remove from current room
		if (this.room !== null) { this.room.removeUser(this); }
		
		// Remove from array of users in the app object
		this.app.users.splice(this.id, 1);
		
	}
	
}