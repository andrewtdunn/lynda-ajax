window.onload = initAll;
var xhr = false;
var textRequest;

function initAll() {
	document.getElementById("requestText").onclick = function() {
		textRequest = true;
		makeRequest();
		return false;
	}
	document.getElementById("requestXML").onclick = function() {
		textRequest = false;
		makeRequest();
		return false;
	}
}

function makeRequest() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) { }
		}
	}

	if (xhr) {
		xhr.onreadystatechange = showContents;
		xhr.open("GET", "colors.xml", true);
		xhr.send(null);
	}
	else {
		document.getElementById("updateArea").innerHTML = "Sorry, but I couldn't create an XMLHttpRequest";
	}
}

function showContents() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var outMsg = (textRequest) ? xhr.responseText : xhr.responseXML;
		}
		else {
			var outMsg = "There was a problem with the request " + xhr.status;
		}
		document.getElementById("updateArea").innerHTML = outMsg;
	}
}
