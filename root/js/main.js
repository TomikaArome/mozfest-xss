import App from "./app.js";
import ChatMessage from "./chatMessage.js";

import "./jquery.js";

/*-----*
 | App |
 *-----*/

window.app = new App();

/*--------*
 | jQuery |
 *--------*/

$("#connectButton").on("click", () => {
	if ($("#connectButton").text() === "Connect") {
		app.connect($("#nameInput").val(), $("#roomInput").val());
	} else {
		app.changeNickname($("#nameInput").val());
	}
});

$("#disconnectButton").on("click", () => {
	app.disconnect();
});

$("#examplesPaneDrawerButton").on("click", () => {
	if ($("#examplesPane").hasClass("hidden")) {
		$("#examplesPane").removeClass("hidden");
		$("#examplesPaneDrawerButton").text("<");
	} else {
		$("#examplesPane").addClass("hidden");
		$("#examplesPaneDrawerButton").text(">");
	}
});

$("#validatedChatPaneDrawerButton").on("click", () => {
	if ($("#validatedChatPane").hasClass("hidden")) {
		$("#validatedChatPane").removeClass("hidden");
		$("#validatedChatPaneDrawerButton").text(">");
	} else {
		$("#validatedChatPane").addClass("hidden");
		$("#validatedChatPaneDrawerButton").text("<");
	}
});

$("#textInputButton").on("click", () => {
	app.sendMessage();
	$("#textInputBox").val("");
});
$("#textInputBox").on("keydown", (e) => {
	if (e.which == 13 && !e.shiftKey) {
		e.preventDefault();
		app.sendMessage();
		$("#textInputBox").val("");
	}
});

$("#examplesPane pre").on("click", function() {
	let textInputBox = $("#textInputBox");
	let val = textInputBox.val();
	textInputBox.val(val.slice(0, textInputBox.get(0).selectionStart) + $(this).text() + val.slice(textInputBox.get(0).selectionEnd));
});

$("#colourInput").on("change", () => {
	let val = $("#colourInput").val();
	$("#colourPre").html(`&lt;span style=&quot;color:${val};&quot;&gt;Coloured text&lt;/span&gt;`);
});

$("#hueInput").on("change", () => {
	let val = $("#hueInput").val();
	$("#hueInputContainer").css("background-color", `hsl(${val},50%,50%)`);
	$("#huePre").html(`&lt;script&gt;
	app.changeColour(${val});
&lt;/script&gt;`);
});







