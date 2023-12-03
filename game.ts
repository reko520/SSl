
import { Vector } from "base/vector";
import * as World from "base/world";
import { MoveTo } from "stp_vibes/skills/moveto";



const positions: Vector[]=[
	new Vector(0,-3),
	new Vector(1.8,-3.0),
	new Vector(1.2,-3.0),
	new Vector(0.6,-3.0),
	new Vector(-0.6,-3.0),
	new Vector(-1.2,-3.0),
	new Vector(-1.8,-3.0)
]

export class Game {

	constructor() {

	}

	run() {
		if (World.Ball.pos.y <5){
		if(World.FriendlyRobotsById[1].pos.x < 1.8){
		team();} else {
		score();}
		} else {
			runAround();
			
		}
			

	}

}

function team():void {
	for (let i =1; i<=6; i++){
		new MoveTo(World.FriendlyRobotsById[i]).run(positions[i],1.57,0.5)

	}
	new MoveTo(World.FriendlyRobotsById[0]).run(positions[0],1.57,0.5)
}
function runAround():void {
	const offset = World.Time;
			new MoveTo(World.FriendlyRobotsById[0]).run(new Vector(Math.sin(offset/10*Math.PI*2)*4, Math.cos( offset/10*Math.PI*2)*4), 1.57,5);
	for (let i =1; i<=6; i++){
		new MoveTo(World.FriendlyRobotsById[i]).run(World.FriendlyRobotsById[0].pos,1.57)

	}
	
}

function score():void{
	if(Math.abs((World.FriendlyRobotsById[0].pos.x - World.Ball.pos.x ))> 0.0005 && World.FriendlyRobotsById[0].pos.y > World.Ball.pos.y ){
		new MoveTo(World.FriendlyRobotsById[0]).run(new Vector(World.Ball.pos.x,World.Ball.pos.y-0.1,),1.57,0.5);
	}else{
		
		if (World.FriendlyRobotsById[0].pos.y < 1.95){ 
			World.FriendlyRobotsById[0].setDribblerSpeed(1.0);
			World.FriendlyRobotsById[0].shootDisable();
			new MoveTo(World.FriendlyRobotsById[0]).run(new Vector(World.Ball.pos.x,2.0),1.57,1);
		
		}
		if(World.FriendlyRobotsById[0].pos.y >= 1.95){
			new MoveTo(World.FriendlyRobotsById[0]).run(new Vector(World.Ball.pos.x,2.5),1.57,1.5);
			World.FriendlyRobotsById[0].shoot(5);
			World.FriendlyRobotsById[0].setDribblerSpeed(0);
			

		} 
	} 
}
	
