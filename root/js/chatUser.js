/**
 * Class with represents a user
 * This object is constructed on the fly after receiving an event from the server and is not stored by the cliient
 */

export default class ChatUser {
	
	/**
	 * Constructs a user object
	 * @param obj The anonymous object received from the server
	 */
	constructor(obj) {
		this.nickname = obj.nickname || "";
		this.nicknameHue = obj.nicknameHue || 0;
	}
	
	get validatedNickname() {
		return this.nickname.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
	}
	
	get validatedNicknameHue() {
		let hue = parseInt(this.nicknameHue);
		if (hue < 0) { hue = 0; }
		if (hue >= 360) { hue = 359; }
		return hue;
	}
	
}