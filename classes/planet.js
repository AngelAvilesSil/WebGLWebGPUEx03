/*
*	FILE:               planet.js
*	PROJECT:            Assignment 03
*	PROGRAMMERS:        Angel Armando Aviles Sil
*	First revision:     2024-11-24
*	
*	Description:
*	                    This template of an object will be a planet
*                       it accepts a radius, a distance from sun, the
*						speed of rotation around the sun, the color or
*						texture in that order.
*						If entered a color and texture, the texture
*						is the one to be taken while its not null.
*/

class Planet {
	constructor(radius, orbitRadius, orbitSpeed, color, texture = null) {
		this.radius = radius;				// The size of the planet
		this.orbitRadius = orbitRadius;		// Distance from the sun
		this.orbitSpeed = orbitSpeed;		// Speed of translation around the sun	
		this.color = color;
		this.texture = texture;
		// For rotating I will just use what I saw in the 
		// example Ex3 - 3D primitives
		this.rotationAmmount = 0;					// This is an ammount the planet will spin
		this.rotationSpeed = this.orbitSpeed * 10;	// a very artbitrary number of spins for a rotation
		// Some planets will have moons
		this.moon = null;
		// The 3D modeel looked too sad with just
		// all going in and starting in the same place
		// so let spawn it randomly around the surrounding
		// of the sun
		this.angle = random(TWO_PI);	// so this shoud give some variety
	}

	// This one should be called on every frame
	// in the draw function, should make the planet move
	refresh() {
		// updating the orbital angle
		this.angle += this.orbitSpeed;

		// This should set the position around
		// the sun
		this.x = this.orbitRadius * Math.cos(this.angle);
		this.y = this.orbitRadius * Math.sin(this.angle);

		// This should set up the rotation amout, should be
		// an angle as seen in example Ex3 - 3D primitives
		this.rotationAmmount += this.rotationSpeed;
  		if (this.rotationAmmount >= TWO_PI) {
    		this.rotationAmmount = 0;
  		}
	}

	// This draws the planet, shuld ve used in the draw
	// function as well, but always after the refresh function
	// in case it is called
	draw() {
		push();
			noStroke();	
			translate(this.x, this.y, 0);
			
			// Applying the spinning as seen
			// in example Ex3 - 3D primitives
			rotateZ(this.rotationAmmount);		// spinning around its axis	

			if (this.texture) {
				texture(this.texture);
			} else {
				ambientMaterial(this.color);
			}
			sphere(this.radius);
		pop();
	}
}