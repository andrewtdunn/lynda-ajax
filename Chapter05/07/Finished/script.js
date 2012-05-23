window.onload = initAll;
var xhr = false;
var dataArray = new Array();
var formField = "colorField";
var url = "colors.xml";

function initAll() {
	document.getElementById(formField).onkeyup = searchSuggest;

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
		xhr.onreadystatechange = setDataArray;
		xhr.open("GET", url, true);
		xhr.send(null);
	}
	else {
		alert("Sorry, but I couldn't create an XMLHttpRequest");
	}
}

function setDataArray() {
	var tag1 = "color";
	var tag2 = "name";

	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			if (xhr.responseXML) {

				var allData = xhr.responseXML.getElementsByTagName(tag1);
				for (var i=0; i<allData.length; i++) {
					dataArray[i] = allData[i].getElementsByTagName(tag2)[0].firstChild.nodeValue;
				}
			}
		}
		else {
			alert("There was a problem with the request " + xhr.status);
		}
	}
}

function searchSuggest() {
	var str = document.getElementById(formField).value;
	document.getElementById(formField).className = "";
	if (str != "") {
		document.getElementById("popups").innerHTML = "";
	
		for (var i=0; i<dataArray.length; i++) {
			var thisField = dataArray[i];
	
			if (thisField.toLowerCase().indexOf(str.toLowerCase()) == 0) {
				var tempDiv = document.createElement("div");
				tempDiv.innerHTML = thisField;
				tempDiv.onclick = makeChoice;
				tempDiv.className = "suggestions";
				document.getElementById("popups").appendChild(tempDiv);
			}
		}
		var foundCt = document.getElementById("popups").childNodes.length;
		if (foundCt == 0) {
			document.getElementById(formField).className = "error";
		}
		if (foundCt == 1) {
			setColor(document.getElementById("popups").firstChild.innerHTML);
		}
	}
}

function makeChoice(evt) {
	var thisDiv = (evt) ? evt.target : window.event.srcElement;
	setColor(thisDiv.innerHTML);
}

function setColor(newColor) {
	document.getElementById(formField).value = newColor;
	document.bgColor = newColor;	
	document.getElementById("popups").innerHTML = "";
}