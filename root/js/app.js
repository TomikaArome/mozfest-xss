/**
 * The class which represents the entire chat application
 */

import ChatUser from "./chatUser.js";
import ChatMessage from "./chatMessage.js";

export default class App {
	
	constructor() {
		this.socket = null;
		this.user = null;
		this.otherUsers = [];
		this.messages = [];
	}
	
	connect(nickname, roomId) {
		
		// Connect the user
		this.socket = io.connect("http://localhost/");
		
		/*--------*
		 | Events |
		 *--------*/
		
		// connect event
		this.socket.on("connect", () => {
			// Emit an initialisation event
			this.socket.emit("initConnect", { nickname, roomId });
		});
		
		// infoMessage event
		this.socket.on("infoMessage", ({ messageContents }) => {
			this.infoMessage(messageContents);
		});
		
		// message event
		this.socket.on("message", ({ author, messageContents }) => {
			let user = new ChatUser(author);
			let message = new ChatMessage(user, messageContents);
			this.receiveMessage(message);
		});
		
		// Changes to the UI
		$("#connectButton").text("Change nickname");
		$("#disconnectButton").removeClass("hidden");
		$("#roomInput").addClass("hidden");
		$("#textInputButton").prop("disabled", false);
		$("#page").addClass("connected");
	}
	
	disconnect() {
		this.socket.disconnect();
		this.infoMessage("Disconnected from server");
		this.socket = null;
		this.user = null;
		$("#connectButton").text("Connect");
		$("#disconnectButton").addClass("hidden");
		$("#roomInput").removeClass("hidden");
		$("#textInputButton").prop("disabled", true);
		$("#page").removeClass("connected");
	}
	
	get isConnected() {
		return this.socket !== null && this.socket.connected;
	}
	
	changeNickname(nickname) {
		console.log("Change nickname method");
		if (this.isConnected) {
			this.socket.emit("changeNickname", { nickname });
		}
	}
	
	sendMessage() {
		this.socket.emit("message", { messageContents: $("#textInputBox").val() });
	}
	
	receiveMessage(message) {
		$("#chatArea > div > div").append(message.rawHtml);
		$("#chatArea > div").scrollTop($("#chatArea > div > div").outerHeight());
		$("#validatedChatArea > div > div").append(message.validatedHtml);
		$("#validatedChatArea > div").scrollTop($("#validatedChatArea > div > div").outerHeight());
	}
	
	infoMessage(messageContents) {
		$("#chatArea > div > div").append(`<div class="infoMessage">${messageContents}</div>`);
		let validatedMessageContents = messageContents.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
		$("#validatedChatArea > div > div").append(`<div class="infoMessage">${validatedMessageContents}</div>`);
	}
	
	changeColour(hue) {
		this.socket.emit("nicknameHue", { nicknameHue: hue });
	}
	
}