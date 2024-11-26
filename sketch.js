

// this is for the random colors generations
// the stars
const kMinCOlor = 150;
const kMaxColor = 255;
// Stars should be points with a size of 3.
const kStarStroke = 3;
const kSunRadius = 30;
const kMinPlanetSize = 2;
const kMaxPlanetRotation = 0.2
const kMinPlanetRotation = 0.01
const kPlanetRotationStep = 0.01

// This is the number of stars that
// should be in the starfield if non
// specified.
let numDefaultStars = 100;
// all looked flat and even
// in ther same plane, so decided
// to add some deepness for starfield
const kRandomDeep = 800;
const kInnerDeep = 700;

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

// These are for animation and UI control
let isPaused = false;


function preload() {
	// Will load straightforwardely the two texture images
	// that I downloaded from where the assignment info and
	// pdf with requirements is.
	theEarthTexture = loadImage("assets/textures/earth_daymap.jpg");
	theMoonTexture = loadImage("assets/textures/moon.jpg");
}


function setup() {
	createCanvas(700, 700, WEBGL);

	earth = new Planet(10, 120, 0.01, 'blue', theEarthTexture);
	moon = new Moon(2, 20, 0.02, theMoonTexture);

	// I will set all the starts dfrom the starfield
	// in the stars array I did before.
	setupStarField();
	//GUI elements for this project can be created
	// using DOM elements with the appropriate p5.js apis.
	// These elements should be drawn to the right of the
	// canvas where the solar system is drawn.
	setAllTheGUI();

	
}


function draw() {
	background(0);
	lights();

	orbitControl();

	// The background of the application should be
	// filled with (by default) 100 randomly placed stars.
	drawStarField();

	// At the center of your solar system will be the sun.
	push();
		noStroke();
		// This will be represented by a yellow sphere.
		ambientMaterial('yellow');
		// This will be represented by a yellow sphere.
		sphere(kSunRadius);
	pop();

	// By default, there will be one planet in your
	// solar system
	if (!isPaused) {
		//This planet should spin around its own axis.
		earth.refresh();
		moon.refresh(earth.x, earth.y);
		
		// then lets doo the same for the planets and
		// their moons if they have
		planets.forEach(planet => {
			planet.refresh();
			if (planet.moon) {
				planet.moon.refresh(planet.x, planet.y);
			}
		});
	}

	earth.draw();
	moon.draw();

	// Now need to draw the planets tha are custom
	planets.forEach(planet => {
		planet.draw();
		if (planet.moon) {
			planet.moon.draw();
		}
	});

}


function setupStarField() {
	// After some testing, saw that I needed to clear it
	// before updating a new number of stars
	stars = [];
	// The background of the application should be filled
	// with (by default) 100 randomly placed stars.
	for (let i = 0; i < numDefaultStars; i++) {
		let tempX;		// having a temporary X coordinate
		let tempY;		// having a temporary y coordinate
		let tempZ;		// having a temporary z coordinate
		let validDistance = false;		// cheecking if the full pont locatioon is acceptable

		// Decided to do this because persnallyI did not liked that 
		// there were starts spawning in between the planets, and that
		// makes abosolutey no sense. so this hould make them exists
		// around the solar sistem in a radius which I randomly decided
		// would be safe for showing
		while (!validDistance) {
			tempX = random(-kRandomDeep, kRandomDeep);
			tempY = random(-kRandomDeep, kInnerDeep);
			tempZ = random(-kRandomDeep, kInnerDeep);

			if (dist(tempX, tempY, tempZ, 0, 0, 0) >= kInnerDeep) {
				validDistance = true;
			}
		}

		stars.push({
			// randomly placed stars
			x: tempX,
			y: tempY,
			z: tempZ,
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


// This is my first try using DOM from p5.js.... after some reading
// noticed that is is (maybe) earier doing it this way rather than with
// html and other javascritpts APIs... or thats what I hope
function setAllTheGUI()
{
	// A text input for entering the number of stars. This
	// will need an associated button to take yhe contents
	// of the text field and update and regenerate the star positions.
	let howManyStarsLabel = createP("Number of Stars:");
	howManyStarsLabel.position(720, 0);
	let howManyStarsInput = createInput(numDefaultStars.toString());
	howManyStarsInput.position(720, 40);
	// Then a button just to make it happen and because I am not
	// good with other kind of events, so 
	// "all you gotta do is hawk tuah click on that thang! you know what I mean?"
	let howManyStarsButton = createButton('Update Stars');
	howManyStarsButton.position(800, 40);
	howManyStarsButton.mousePressed(() => {
		numDefaultStars = int(howManyStarsInput.value());
		setupStarField();
	});
	
	// A slider controlling the Earth’s distance from the sun.
	let earthDistanceLabel = createP("Earth distance from Sun:");
	earthDistanceLabel.position(720,50)
	let earthDistanceSlider = createSlider(kSunRadius * 1.50, kSunRadius * 10.00, earth.orbitRadius, 1);
	earthDistanceSlider.position(720, 90);
	let earthDistanceValueShow = createP(earthDistanceSlider.value().toString());
	earthDistanceValueShow.position(900, 75);
	earthDistanceSlider.input(() => {
		earth.orbitRadius = earthDistanceSlider.value()
		earthDistanceValueShow.html(earthDistanceSlider.value().toString());
	});

	// A slider controlling the Earth’s rotation speed
	let earthRotationLabel = createP("Earth Rotation Speed:");
	earthRotationLabel.position(720, 100);
	let earthRotationSlider = createSlider(
		kMinPlanetRotation, kMaxPlanetRotation,
		earth.orbitSpeed, kPlanetRotationStep
	);
	earthRotationSlider.position(720, 140);
	let earthRotationValueShow = createP(earthRotationSlider.value().toString());
	earthRotationValueShow.position(900, 125);
	earthRotationSlider.input(() => {
		earth.orbitSpeed = earthRotationSlider.value();
		earthRotationValueShow.html(earthRotationSlider.value().toString());
	});

	// A slider controlling the Moon’s distance from the Earth.
	let moonDistanceLabel = createP("Moon Distance from Earth:");
	moonDistanceLabel.position(720,150);
	let moonDistanceSlider = createSlider(earth.radius * 1.20, earth.radius * 3.0, moon.orbitRadius, 1);
	moonDistanceSlider.position(720, 190);
	let moonDistanceValueShow = createP(moonDistanceSlider.value().toString());
	moonDistanceValueShow.position(900,175)
	moonDistanceSlider.input(() => {
		moon.orbitRadius = moonDistanceSlider.value();
		moonDistanceValueShow.html(moonDistanceSlider.value().toString());
	});

	// A slider controlling the Moon’s rotation speed.
	let moonRotationLabel = createP("Moon Rotation Speed:");
	moonRotationLabel.position(720,200);
	let moonRotationSlider = createSlider(
		kMinPlanetRotation, kMaxPlanetRotation,
		moon.orbitSpeed, kPlanetRotationStep
	);
	moonRotationSlider.position(720, 240);
	let moonRotationValueShow = createP(moonRotationSlider.value().toString());
	moonRotationValueShow.position(900,225);
	moonRotationSlider.input(() => {
		moon.orbitSpeed = moonRotationSlider.value();
		moonRotationValueShow.html(moonRotationSlider.value().toString());
	});

	
	// Additionally, GUI elements will need to be provided to allow for the
	// creation of additional planets.
	// The following should be configurable for additional planets being added:

	// Size of the planet (radius).
	let customSizePlanetLabel = createP("Custom Planet Size:");
	customSizePlanetLabel.position(720,250);
	let customSizePlanetSlider;
	if (planets.length > 0) {
		customSizePlanetSlider = createSlider(
			kMinPlanetSize, kSunRadius*0.8,
			planets[planets.length - 1].radius, 1
		);
	} else {
		customSizePlanetSlider = createSlider(kMinPlanetSize, kSunRadius*0.8, kMinPlanetSize, 1);
	}
	customSizePlanetSlider.position(720,290);
	let customPlanetValueShow = createP(customSizePlanetSlider.value().toString());
	customPlanetValueShow.position(900,275);
	customSizePlanetSlider.input(() => {
		if (planets.length > 0) {
			planets[planets.length - 1].radius = customSizePlanetSlider.value();
		}
		customPlanetValueShow.html(customSizePlanetSlider.value().toString());
	});

	// Colour of the planet
	let customColorPlanetLabel = createP("Custom Planet Colour:");
	customColorPlanetLabel.position(950,250);
	let customCOlorPlanetPicker = createColorPicker('red');
	customCOlorPlanetPicker.position(950,290);

	// Speed at which the planet moves around the sun.
	let customPlanetRotationLabel = createP("Custom Planet Rotation Speed:");
	customPlanetRotationLabel.position(720,300)
	let customPlanetRotationSlider;
	if (planets.length > 0) {
		customPlanetRotationSlider = createSlider(
			kMinPlanetRotation, kMaxPlanetRotation,
			planets[planets.length - 1].orbitSpeed, kPlanetRotationStep
		);
	} else {
		customPlanetRotationSlider = createSlider(
			kMinPlanetRotation, kMaxPlanetRotation,
			(kMinPlanetRotation + kMaxPlanetRotation) / 2, kPlanetRotationStep
		);
	}
	customPlanetRotationSlider.position(720, 340);
	let customPlanetRotationValueShow = createP(customPlanetRotationSlider.value().toString());
	customPlanetRotationValueShow.position(900,325);
	customPlanetRotationSlider.input(() => {
		if (planets.length > 0) {
			planets[planets.length - 1].orbitSpeed = (customPlanetRotationSlider.value());
		}
		customPlanetRotationValueShow.html(customPlanetRotationSlider.value().toString());
	});

	// Distance of the planet from the sun.
	let customPlanetDistanceLabel = createP("Custom Planet Distance from Sun:");
	customPlanetDistanceLabel.position(720,350)
	let customPlanetDistanceSlider;
	if (planets.length > 0) {
		customPlanetDistanceSlider = createSlider(
			kSunRadius * 1.50, kSunRadius * 10.00, planets[planets.length-1].orbitRadius, 1
		);
	} else {
		customPlanetDistanceSlider = createSlider(
			kSunRadius * 1.50, kSunRadius * 10.00, 
			(kSunRadius * 1.50 + kSunRadius * 10.00) / 2, 1
		);
	}
	customPlanetDistanceSlider.position(720, 390);
	let customPlanetDistanceValueShow = createP(customPlanetDistanceSlider.value().toString());
	customPlanetDistanceValueShow.position(900,375);
	customPlanetDistanceSlider.input(() => {
		if (planets.length > 0) {
			planets[planets.length - 1].orbitRadius = (customPlanetDistanceSlider.value());
		}
		customPlanetDistanceValueShow.html(customPlanetDistanceSlider.value().toString());
	});
	
	// Whether or not the planet has a moon (Boolean
	// value. Each planet can only have one moon).
	let customPlanetHasMoonLabel = createP("Has Moon:");
	customPlanetHasMoonLabel.position(720,400);
	let customPlanetHasMoonBox = createCheckbox(false);
	customPlanetHasMoonBox.position(875,417);

	// Size of the moon (radius)
	let customSizePlanetMoonLabel = createP("Custom Moon Size:");
	customSizePlanetMoonLabel.position(720,430);
	let customSizePlanetMoonSlider = createSlider(
		kMinPlanetSize, kSunRadius * 0.8,
		random(kMinPlanetSize, kSunRadius * 0.8), 1);
	customSizePlanetMoonSlider.position(720,470);
	let customPlanetMoonValueShow = createP(customSizePlanetMoonSlider.value().toString());
	customPlanetMoonValueShow.position(900,455);
	customSizePlanetMoonSlider.input(() => {
		if ([planets.length > 0]) {
			planets[planets.length - 1].moon.radius = customSizePlanetMoonSlider.value();
		}
		customPlanetMoonValueShow.html(customSizePlanetMoonSlider.value().toString());
	});

	// Distance of the moon from the planet.
	let customMoonDistanceLabel = createP("Custom Moon Distance from Planet:");
	customMoonDistanceLabel.position(720,480);
	let customMoonDistanceSlider;
	if (planets.length > 0) {
		customMoonDistanceSlider = createSlider(planets[planets.length - 1].radius * 1.20, planets[planets.length - 1].radius * 3.0, planets[planets.length - 1].moon.orbitRadius, 1);
	} else {
		customMoonDistanceSlider = createSlider(
			earth.radius * 1.20, earth.radius * 3.0, 
			random(earth.radius * 1.20, earth.radius * 3.0), 1
		);
	}
	customMoonDistanceSlider.position(720, 520);
	let customMoonDistanceValueShow = createP(customMoonDistanceSlider.value().toString());
	customMoonDistanceValueShow.position(900,505)
	customMoonDistanceSlider.input(() => {
		if (planets.length > 0) {
			planets[planets.length - 1].moon.orbitRadius = customMoonDistanceSlider.value()
		}
		customMoonDistanceValueShow.html(customMoonDistanceSlider.value().toString());
	});

	// Speed at which the moon orbits the planet.
	let customMoonRotationLabel = createP("Custom Moon Rotation Speed:");
	customMoonRotationLabel.position(720,530);
	let customMoonRotationSlider;
	if (planets.length > 0) {
		customMoonRotationSlider = createSlider(
			kMinPlanetRotation, kMaxPlanetRotation,
			planets[planets.length - 1].moon.orbitSpeed, kPlanetRotationStep
		);
	} else {
		customMoonRotationSlider = createSlider(
			kMinPlanetRotation, kMaxPlanetRotation,
			random(kMinPlanetRotation, kMaxPlanetRotation), kPlanetRotationStep
		);
	}
	customMoonRotationSlider.position(720, 570);
	let customMoonRotationValueShow = createP(customMoonRotationSlider.value().toString());
	customMoonRotationValueShow.position(900,555)
	customMoonRotationSlider.input(() => {
		if (planets.length > 0) {
			planets[planets.length - 1].moon.orbitSpeed = customMoonRotationSlider.value()
		}
		customMoonRotationValueShow.html(customMoonRotationSlider.value().toString());
	});

	// Button for adding planet
	let addPlanetButton = createButton('Add Planet');
	addPlanetButton.position(720, 600);
	addPlanetButton.mousePressed(() => {
		let tempPlanet = new Planet(
			customSizePlanetSlider.value(), customPlanetDistanceSlider.value(),
			customPlanetRotationSlider.value(), customCOlorPlanetPicker.value()
		);
		if (customPlanetHasMoonBox.checked()) {
			tempPlanet.moon = new Moon(
				customSizePlanetMoonSlider.value(), customMoonDistanceSlider.value(),
				customMoonRotationSlider.value(), theMoonTexture
			);
		}
		planets.push(tempPlanet);
	
		// Update sliders for the newly added planet
		customPlanetRotationSlider.value(tempPlanet.orbitSpeed);
		customPlanetDistanceSlider.value(tempPlanet.orbitRadius);
	
		if (tempPlanet.moon) {
			customMoonDistanceSlider.value(tempPlanet.moon.orbitRadius);
			customMoonRotationSlider.value(tempPlanet.moon.orbitSpeed);
		}
	});

	// Remove last planet
	let removePlanetButton = createButton('Remove Last Planet');
	removePlanetButton.position(850, 600);
	removePlanetButton.mousePressed(() => {
		planets.pop();
	});

	// Pause resume button
	let pauseResumeButton = createButton("Pause/Resume");
	pauseResumeButton.position(720,630);
	pauseResumeButton.mousePressed(() => {
		isPaused = !isPaused
	});

	// Reset button
	let resetButton = createButton("Reset");
	resetButton.position(850,630);
	resetButton.mousePressed(() => {
		planets = []; // Clear planets
		numDefaultStars = 100; // Reset default number of stars
		setupStarField(); // Recreate starfield
	
		// Reset Earth and Moon
		earth = new Planet(10, 120, 0.01, 'blue', theEarthTexture);
		moon = new Moon(2, 20, 0.02, theMoonTexture);
	
		// Reset sliders to their default values
		earthDistanceSlider.value(earth.orbitRadius);
		earthRotationSlider.value(earth.orbitSpeed);
		moonDistanceSlider.value(moon.orbitRadius);
		moonRotationSlider.value(moon.orbitSpeed);
	
		// Reset planet sliders
		customSizePlanetSlider.value(kMinPlanetSize);
		customPlanetDistanceSlider.value((kSunRadius * 1.50 + kSunRadius * 10.00) / 2);
		customPlanetRotationSlider.value((kMinPlanetRotation + kMaxPlanetRotation) / 2);
		customCOlorPlanetPicker = createColorPicker('red');
		customPlanetHasMoonBox.checked(false);
	
		// Reset moon sliders
		customSizePlanetMoonSlider.value(random(kMinPlanetSize, kSunRadius * 0.8));
		customMoonDistanceSlider.value(random(earth.radius * 1.20, earth.radius * 3.0));
		customMoonRotationSlider.value(random(kMinPlanetRotation, kMaxPlanetRotation));
	
		// Reset paused state
		isPaused = false;
	});
}