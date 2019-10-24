const ServerUser = require("./ServerUser.js");

/**
 * Class for a room in the chat application
 * Note that the room with ID 0 is a special room as it is just a waiting area for a user to be moved to a proper room, messages cannot be sent in this room
 */
const ServerRoom = class {
	
	constructor(roomId) {
		// The room ID is a number
		this.id = roomId;
		this.users = [];
	}
	
	/**
	 * Checks if a user is part of this part
	 * @param user The user to check
	 * @return true if the user is part of the room, false otherwise
	 */
	hasUser(user) {
		return typeof this.users[user.id] === "object";
	}
	
	/**
	 * Add a user to the room
	 * @param user A user of type ServerUser
	 * @return This object
	 */
	addUser(user) {
		if (!this.hasUser(user)) {
			this.users[user.id] = user;
			// Send a message to the new room to inform them of the new user
			this.sendInfoMessage(user.formattedNickname + " joined the room", user);
		}
		return this;
	}
	
	/**
	 * Removes a user from the room
	 * @param user The user to remove
	 */
	removeUser(user) {
		if (this.hasUser(user)) {
			//this.users.splice(user.id, 1);
			delete this.users[user.id];
			// Send a message to the previous room to inform them
			this.sendInfoMessage(user.formattedNickname + " left the room", user);
		}
		return this;
	}
	
	/**
	 * Sends a informational message to all the users in the room
	 * @param messageContents The contents of the message to send
	 * @param userToExclude User to not send the message to. Usually this is used to send a different message to the user for whom it concerns than the rest of the room
	 */
	sendInfoMessage(messageContents, userToExclude) {
		for (let i in this.users) {
			if (this.users[i] != userToExclude) { this.users[i].sendInfoMessage(messageContents); }
		}
	}
	
	/**
	 * Sends a message to all the users in this room by the specified user
	 * @param author The user who wrote the message
	 * @param messageContents The contents of the message to send
	 */
	sendMessage(author, messageContents) {
		for (let i in this.users) {
			this.users[i].sendMessageFromUser(author, messageContents);
		}
	}
	
}

module.exports = ServerRoom;