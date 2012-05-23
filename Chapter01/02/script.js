window.onload = initAll;
var xhr = false;

function initAll() {
	document.getElementById("requestXML").onclick = makeRequest;
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
		xhr.open("GET", "us-states.xml", true);
		xhr.send(null);
	}
	else {
		document.getElementById("updateArea").innerHTML = "Sorry, but I couldn't create an XMLHttpRequest";
	}
	return false;
}

function showContents() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var outMsg = xhr.responseText;
		}
		else {
			var outMsg = "There was a problem with the request " + xhr.status;
		}
		document.getElementById("updateArea").innerHTML = outMsg;
	}
}
