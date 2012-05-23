window.onload = initAll;
var xhr = false;
var dataArray = new Array();
var url = "students.xml"

function initAll() {
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

	var allDivs = document.getElementsByTagName("div");
	for (var i=0; i<allDivs.length; i++) {
		allDivs[i].onclick = featureOneDiv;
	}
}

function setDataArray() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			if (xhr.responseXML) {
				var allData = xhr.responseXML.getElementsByTagName("student");

				for (var i=0; i<allData.length; i++) {
					var tempObj = new Object;
					tempObj.firstName = getVal(allData[i],"firstName");
					tempObj.lastName = getVal(allData[i],"lastName");
					tempObj.seat = getVal(allData[i],"seat");
					tempObj.lunchPeriod = getVal(allData[i],"lunchPeriod");
					tempObj.readingGroup = getVal(allData[i],"readingGroup");
					dataArray[i] = tempObj;
				}
			}
		}
		else {
			alert("There was a problem with the request " + xhr.status);
		}
	}
	
	function getVal(theData,theTag) {
		return theData.getElementsByTagName(theTag)[0].firstChild.nodeValue;
	}
}

function featureOneDiv(evt) {
}
