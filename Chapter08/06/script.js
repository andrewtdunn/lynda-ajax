window.onload = initAll;
var allImgs;
var currPic = 0;

function initAll() {
	var callback = { 
		success: function(xhr) {
			storePix.innerHTML = xhr.responseText;
			setupPix();
		} 
	} 
	
	var storePix = document.createElement("div");
	var connectionObject = YAHOO.util.Connect.asyncRequest(
		'GET', 'flickrPix.xml', callback
	);
	var smallPix = document.getElementById("pictureBar");
	
	YAHOO.util.Event.addListener(
		document.getElementById("getPrev"),"click", function() {runSlideshow(-1);}
	);
	YAHOO.util.Event.addListener(
		document.getElementById("getNext"),"click", function() {runSlideshow(1);}
	);

	function setupPix() {
		allImgs = YAHOO.util.Selector.query("img",storePix);

		for (var i=0; i<allImgs.length; i++) {
			var newImg = allImgs[i];
			newImg.setAttribute("width",allImgs[i].getAttribute("width") / 4);
			newImg.setAttribute("height",allImgs[i].getAttribute("height") / 4);
			newImg.setAttribute("id","pic"+i);
			smallPix.appendChild(newImg);
		}
		newSlideIn();
	}
}

function runSlideshow(imgOffset) {
	oldSlideOut();

	currPic += imgOffset;
	switch (true) {
		case (currPic == allImgs.length) :
			currPic = 0;
			break;
		case (currPic < 0) :
			currPic = allImgs.length-1;
	}
}

function newSlideIn() {
	var docPic = document.getElementById("pic" + currPic);
	document.getElementById("picMover").src = docPic.src;
	var myAnim = new YAHOO.util.Motion(document.getElementById("picMover"));
	var theWidth = parseInt(docPic.getAttribute("width"));
	var theHeight = parseInt(docPic.getAttribute("height"));
	
	myAnim.attributes.height = { to: theHeight*4, from: theHeight };
	myAnim.attributes.width = { to: theWidth*4, from: theWidth };
	myAnim.attributes.points = { 
		to: YAHOO.util.Dom.getXY(document.getElementById("bigPic")),
		from: YAHOO.util.Dom.getXY(docPic)
	};
	myAnim.duration = 2;
	myAnim.method = YAHOO.util.Easing.bounceOut;
	myAnim.animate();
}

function oldSlideOut() {
	var docPic = document.getElementById("pic" + currPic);
	document.getElementById("picMover").src = docPic.src;
	var myAnim = new YAHOO.util.Motion(document.getElementById("picMover"));
	var theWidth = parseInt(docPic.getAttribute("width"));
	var theHeight = parseInt(docPic.getAttribute("height"));

	myAnim.attributes.height = { to: theHeight, from: theHeight*4 };
	myAnim.attributes.width = { to: theWidth, from: theWidth*4 };
	myAnim.attributes.points = { 
		to: YAHOO.util.Dom.getXY(docPic), 
		from: YAHOO.util.Dom.getXY(document.getElementById("bigPic"))
	};
	myAnim.duration = 2;
	myAnim.method = YAHOO.util.Easing.easeInStrong;
	myAnim.animate();
	myAnim.onComplete.subscribe(newSlideIn);
}
