/*
*	FILE:               moon.js
*	PROJECT:            Assignment 03
*	PROGRAMMERS:        Angel Armando Aviles Sil
*	First revision:     2024-11-24
*	
*	Description:
*	                    This template of an object will be a moon
*                       it accepts a radius, a distance from a planet,
*						the	speed of rotation around the planet, and
*						the texture in that order.
*/

class Moon {
	
	constructor(radius, orbitRadius, orbitSpeed, texture = null) {
		this.radius = radius;
		this.orbitRadius = orbitRadius;
		this.orbitSpeed = orbitSpeed;
		this.angle = random(TWO_PI);
		this.texture = texture;
	}

	// This one should be called on every frame
	// in the draw function, should make the moon
	// move around the planet which coordinates
	// in  the parameters belongs to.
	refresh(planetX, planetY) {
		this.angle += this.orbitSpeed;
		this.x = planetX + this.orbitRadius * Math.cos(this.angle);
		this.y = planetY + this.orbitRadius * Math.sin(this.angle);
	}

	// This draws the moon, shuld ve used in the draw
	// function as well, but always after the refresh function
	// in case it is called
	draw() {
		push();
			noStroke();	
			translate(this.x, this.y, 0);

			if (this.texture) {
				texture(this.texture);
			} else {
				ambientMaterial(this.color);
			}
			sphere(this.radius);
		pop();
	}
}