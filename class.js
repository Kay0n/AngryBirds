class Player{
	constructor(x,y){
		this.self = addRect(x,y, 60, 60,{restitution:0.8,friction:0.002,collisionFilter: {category: 0x0002}});
	}
	render(){
		if (keyIsDown(68)){ // left
			Matter.Body.setVelocity(this.self, {
				x: this.self.velocity.x + 0.2, 
				y: this.self.velocity.y
			})
		}
		if (keyIsDown(65)){ // right
			Matter.Body.setVelocity(this.self, {
				x: this.self.velocity.x - 0.2, 
				y: this.self.velocity.y
			})
		}
		this.self.show()
	}
}




class SlingShot {
	constructor(x, y, body) {
		this.options = {
			pointA: {
		 		x: x,
				y: y
			},
			bodyB: body,
			stiffness: 0.02,
			length: 0
	  	};
		this.sling = Constraint.create(this.options);
		World.add(engine.world, this.sling);
	}
	
	show() {
		
		
		rect(this.options.pointA.x-10,this.options.pointA.y,20,200)
		ellipse(this.options.pointA.x,this.options.pointA.y,30)
		if (this.sling.bodyB) {
			strokeWeight(4);
			const posA = this.sling.pointA;
			const posB = this.sling.bodyB.position;
			line(posA.x, posA.y, posB.x, posB.y);
			strokeWeight(2);
		}

	}
  
	detach() {
		this.sling.bodyB = null;
	}

	attach(body) {
		this.sling.bodyB = body;
	}
}


class MatterMouse{
	constructor(xOff,yOff){
		const mouse = Mouse.create(canvas.elt);
  		const mouseOptions = {
    		mouse: mouse,
    		collisionFilter : {
    			mask: 0x0002
    		}
		};
		
		Mouse.setOffset(mouse, { x: xOff, y: yOff })
  		mouse.pixelRatio = pixelDensity();
  		this.self = MouseConstraint.create(engine, mouseOptions);
  		World.add(engine.world, this.self);
	}
	remove(){
		Composite.remove(engine.world, this.self)
	}
	
}



