
// Will do the same array handlintg
// I did in previous assignment with
// buttons and vertices for easy handling
let stars = [];


let theEarthTexture;
let theMoonTexture;

function preload() {
	// Will load straightforwardely the two texture images
	// that I downloaded from where the assignment info and
	// pdf with requirements is.
	theEarthTexture = loadImage("assets/textures/earth_daymap.jpg");
	theMoonTexture = loadImage("assets/textures/moon.jpg")
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
