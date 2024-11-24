

// this is for the random colors generations
// the stars
const kMinCOlor = 150;
const kMaxColor = 255;
// Stars should be points with a size of 3.
const kStarStroke = 3;
const kSunRadius = 30;

// This is the number of stars that
// should be in the starfield if non
// specified.
const kNumDefaultStars = 100;
// all looked flat and even
// in ther same plane, so decided
// to add some deepness for starfield
const kRandomDeep = 600;	

// Will do the same array handlintg
// I did in previous assignment with
// buttons and vertices for easy handling.
let stars = [];
let planets = [];

// These two since being default and
// having specific requirements such
// specific textures, then worth making
// them kind of unique.
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

	// I will set all the starts dfrom the starfield
	// in the stars array I did before.
	setupStarField();
}


function draw() {
	background(0);
	lights(180);

	orbitControl();

	// The background of the application should be
	// filled with (by default) 100 randomly placed stars.
	drawStarField();

	// At the center of your solar system will be the sun.
	push();
		// This will be represented by a yellow sphere.
		ambientMaterial('yellow');
		// This will be represented by a yellow sphere.
		sphere(kSunRadius);
	pop();

}


function setupStarField() {
	// The background of the application should be filled
	// with (by default) 100 randomly placed stars.
	for (let i = 0; i < kNumDefaultStars; i++) {
		stars.push({
			// randomly placed stars
			x: random(-width / 2, width / 2),		// I was forgetting the center
			y: random(-height / 2, height / 2),		// the fact about the center in the
			z: random(-kRandomDeep, kRandomDeep),	// center, so it should be all / 2
			color: color(
				random(kMinCOlor, kMaxColor),		// Was leaving it from 0 to 255 but
				random(kMinCOlor, kMaxColor),		// it was so acid-colorful polybious like
				random(kMinCOlor, kMaxColor)		// stuff, so tried to shorten the range and
			)										// looks kind of better looking
		});		
	}
}

function drawStarField() {
	stars.forEach(star => {
		push();
			// These can be white, or you can 
			// add a little colour to mix things up
			stroke(star.color);
			// These should be points with a size of 3.
			strokeWeight(kStarStroke);
			point(star.x, star.y, star.z)
		pop();
	});
}