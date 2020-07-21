//1. Initializing variables and conditions
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = false;
var positionX, positionY;

// Element retreival
var brush = document.getElementById("brush"); // Brush
var eraser = document.getElementById("eraser"); // Eraser
var color = document.getElementById("myColor"); // Color
var color2 = document.getElementById("myColor2") // Background and Eraser color
var paint = document.getElementById("paint"); // Background Fill
var size = document.getElementById("myRange"); // Size
var reset = document.getElementById("reset"); // Reset
var saveLink = document.getElementById("saveLink"); // saveLink element

// Set initial color conditions


//Set initial size conditions
var mySize = size.value;
ctx.lineWidth = mySize;

brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";

canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("mouseup", mouseUp, false);

// 4. Color change conditions

function colorChange() {
	myColor = color.value;
	ctx.strokeStyle = myColor;
}

//5. Size change conditions
function sizeChange() {
	mySize = size.value;
	ctx.lineWidth = mySize;
}

// 2. Make brush work
function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function brushDraw(canvas, positionX, positionY) {
	if(mouse) {
		ctx.lineTo(positionX, positionY);
		ctx.stroke();
		canvas.style.cursor = "pointer";
	}
}

function mouseDown(e) {
	mouse = true;
	var coordinates = getCoordinates(canvas, e);
	canvas.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
}

function mouseMove(e) {
	var coordinates = getCoordinates(canvas, e);
	positionX = coordinates.x;
	positionY = coordinates.y;
	brushDraw(canvas, positionX, positionY);
}

function mouseUp() {
	mouse = false;
	canvas.style.cursor = "default";
}

function brushClick() {
	var myColor = color.value;
	ctx.strokeStyle = myColor;
	var brushColor = document.getElementById("myColor");
	var mySize = size.value;
	ctx.lineWidth = mySize;
	ctx.strokeStyle = brushColor.value;
	brush.style.border = "2px solid red";
	eraser.style.border = "none";
	paint.style.border = "none";

	canvas.addEventListener("mousedown", mouseDown, false); // bubble phase
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseUp, false);
}

// 3. Making the eraser work
function eraserClick() {
	var mySize = size.value;
	var myColor2 = color2.value;
	ctx.strokeStyle = myColor2;
	ctx.lineWidth = mySize;
	ctx.strokeStyle = eraserClick.color2;
	eraser.style.border = "2px solid red";
	brush.style.border = "none";
	paint.style.border = "none";

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseUp, false);
}

// 3. Making the change background color work
function paintClick() {
	var myColor2 = color2.value;
	ctx.strokeStyle = myColor2;
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(125000, 120000);
	ctx.lineWidth = 120000;
	ctx.stroke();
	ctx.strokeStyle = myColor2;
	paint.style.border = "2px solid red";
	eraser.style.border = "none";
	brush.style.border = "none";

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseUp, false);
}

// 6. Making the reset button work
function resetClick() {
	window.location.reload();
}

// 7. Making the save button work
function saveClick() {
	var data = canvas.toDataURL(); // encodes image data into a base 64 format
	console.log(data);
	saveLink.href = data;
	saveLink.download = "paint.png"; 	
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
	if(e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchend", function (e) {
	if(e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);


brush.addEventListener("click", brushClick); // Brush click event
eraser.addEventListener("click", eraserClick); // Eraser click event
paint.addEventListener("click", paintClick); // Paint brush click event
color.addEventListener("change", colorChange); // Color change event
size.addEventListener("change", sizeChange); // Size change event
reset.addEventListener("click", resetClick); // Reset click event
saveLink.addEventListener("click", saveClick); // Save click event