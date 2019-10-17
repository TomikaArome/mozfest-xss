/**
 * Class with represents a single message
 */

export default class ChatMessage {
	
	constructor(message) {
		
		// The author of the message, a ChatUser object
		this.author = null;
		
		// The text contained within the message
		this.rawMessage = message;
		
		// The timestamp that the message was sent
		this.timestamp = null;
		
	}
	
	get validatedMessage() {
		
		// Let's first get the original message sent by the other user
		let message = this.rawMessage;
		
		// Next we're going to trim it using the trim() method, this eliminates all the white spaces on either side
		message = message.trim();
		
		// We now use a special function to find all the ampersands (&) and convert them into a special chain of characters which HTML understands and will display the ampersand
		message = message.replace(/&/g, "&amp;");
		
		// Do the same for the "lesser than" and "greater than" characters
		message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		
		// Do the same for quotes and double quotes
		message = message.replace(/"/g, "&quot;").replace(/'/g, "&apos");
		
		// Return the validated message
		return message;
		
	}
	
}