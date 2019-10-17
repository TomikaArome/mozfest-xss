import App from "./app.js";

import "./jquery.js";

/*-----*
 | App |
 *-----*/

let app = new App();

/*--------*
 | jQuery |
 *--------*/

$("#connectButton").on("click", () => {
	app.connect();
	console.log("test");
});