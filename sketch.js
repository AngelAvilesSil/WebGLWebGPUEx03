
// Will do the same array handlintg
// I did in previous assignment with
// buttons and vertices for easy handling.
let stars = [];
let planets = [];

// These two since being default and
// having specific requirements such
// specific textures, then worth making
// them kind of unique
let earth;
let moon;

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
  createCanvas(700, 700, WEBGL);
  
}

function draw() {
  background(220);
}
