/**
 *
 */

export default class App {
	
	constructor() {
		this.socket = null;
	}
	
	connect(url) {
		this.socket = io.connect("https://ec2.tomika.ink/");
		console.log(this.socket);
		/*this.socket.addEventListener('open', function (event) {
			this.socket.send('Hello Server!');
		});*/
	}
	
	get isConnected() {
		return this.socket === null;
	}
	
}