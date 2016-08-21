//Planet

function Planet(name, mesh) {
	this.name = name;
	this.mesh = mesh;
}

//Planets data

var anon = new Planet('?', THREEx.Planets.createAnonPlanet());
var sun = new Planet('Sun', THREEx.Planets.createSun());
var mercury = new Planet('Mercury', THREEx.Planets.createMercury());
var venus = new Planet('Venus', THREEx.Planets.createVenus());
var earth = new Planet('Earth', [THREEx.Planets.createEarth(), THREEx.Planets.createEarthCloud()]);
var moon = new Planet('Moon', THREEx.Planets.createMoon());
var mars = new Planet('Mars', THREEx.Planets.createMars());
var jupiter = new Planet('Jupiter', THREEx.Planets.createJupiter());
var saturn = new Planet('Saturn', [THREEx.Planets.createSaturn(), THREEx.Planets.createSaturnRing()]);
var uranus = new Planet('Uranus', [THREEx.Planets.createUranus(), THREEx.Planets.createUranusRing()]);
var neptune = new Planet('Neptune', THREEx.Planets.createNeptune());
var pluto = new Planet('Pluto', THREEx.Planets.createPluto());


//planet groups
var anonGroup = new THREE.Group();
var planetGroup = new THREE.Group();

// var saturnGroup = new THREE.Group();
// saturnGroup.add(saturn.mesh[0], saturn.mesh[1]);

var sunDistance = -185;
	//sunDistance must have a value between -175 (furthest) and -30 (nearest) to render in scene. 

var thePlanets = [THREEx.Planets.createMercury(), 
				THREEx.Planets.createVenus(), 
				[THREEx.Planets.createEarth(), THREEx.Planets.createEarthCloud()], 
				THREEx.Planets.createMoon(), 
				THREEx.Planets.createMars(), 
				THREEx.Planets.createJupiter(), 
				[THREEx.Planets.createSaturn(), THREEx.Planets.createSaturnRing()], 
				[THREEx.Planets.createUranus(), THREEx.Planets.createUranusRing()], 
				THREEx.Planets.createNeptune(), 
				THREEx.Planets.createPluto(),
				THREEx.Planets.createMercury(), 
				THREEx.Planets.createVenus(), 
				[THREEx.Planets.createEarth(), THREEx.Planets.createEarthCloud()], 
				THREEx.Planets.createMoon(), 
				THREEx.Planets.createMars(), 
				THREEx.Planets.createJupiter(), 
				[THREEx.Planets.createSaturn(), THREEx.Planets.createSaturnRing()], 
				[THREEx.Planets.createUranus(), THREEx.Planets.createUranusRing()], 
				THREEx.Planets.createNeptune(), 
				THREEx.Planets.createPluto()];

//Starfield
var stars = THREEx.Planets.createStarfield();

//Board
function gameBoard(planets, anonGroup, planetGroup) {
	this.planets = thePlanets;
	this.anonGroup = anonGroup;
	this.planetGroup = planetGroup;
}

gameBoard.prototype.shuffle = function() {
	for (var i = this.planets.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.planets[i];
        this.planets[i] = this.planets[j];
        this.planets[j] = temp;
  }
}

gameBoard.prototype.drawBoard = function() {
	var x = -45;
	var z = -33;
	for (i=0; i<4; i++) {
		x = -45;
		z += 15;
		for (j=0; j<5; j++) {
			x += 15;
			var anonPlanet = THREEx.Planets.createAnonPlanet();
			anonPlanet.position.x = x;
			anonPlanet.position.z = z;
			tempGroup = new THREE.Group();
			tempGroup.add(anonPlanet);
			var helper = new THREE.EdgesHelper(anonPlanet, 0x000011);
			tempGroup.add(helper);
			anonGroup.add(tempGroup);
		}
	}
	anonGroup.position.x = 0;
	anonGroup.position.z = 0;
	return anonGroup;
}

gameBoard.prototype.drawKey = function() {
	var x = -45;
	var z = -33;
	for (i=0; i<4; i++) {
		x = -45;
		z += 15;
		for (j=0; j<5; j++) {
			x += 15;
			var currentPlanet = this.planets.pop();
	

			if (currentPlanet.constructor === Array) {
				tempGroup = new THREE.Group();
				tempGroup.add(currentPlanet[0], currentPlanet[1]);
				tempGroup.position.x = x;
				tempGroup.position.z = z;
				tempGroup.children[0].rotation.x = 18;
				//tempGroup.children[0].rotation.y = 210;
				planetGroup.add(tempGroup);

			} else {
				currentPlanet.position.x = x;
				currentPlanet.position.z = z;
				currentPlanet.rotation.x = 18;
				//currentPlanet.rotation.y = 210;
				planetGroup.add(currentPlanet);
			}
	}
}
	planetGroup.position.x = 0;
	planetGroup.position.z = 0;
	return planetGroup;
}

//Game
function Game() {
	this.gameBoard = new gameBoard();
	this.gameBoard.shuffle();
	this.gameBoard.drawBoard();
	this.gameBoard.drawKey();
	this.turnNumber = 0; //max turns = 40? 
	this.win = undefined;

}

Game.prototype.nextTurn = function() {

}


//MODEL

var model = new Game();



//VIEW

	//set up scene
		//vars
var width = window.innerWidth;
var height = window.innerHeight;

		//renderer
var renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.shadowMap.enabled = true;
	renderer.setSize(width, height);
	renderer.setPixelRatio( window.devicePixelRatio );
  	renderer.setClearColor(0x000011, 1);
  	renderer.domElement.id = "context";
  	document.body.appendChild(renderer.domElement);

  	//Window resize
  	window.addEventListener('resize', onWindowResize, false);
  	function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	}

  		//scene
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, .0007);

		//camera
var camera = new THREE.PerspectiveCamera(45, width/height, .1, 10000);
scene.add(camera);
camera.position.set(0, 90, 0);
camera.lookAt(scene.position);

		//cubecamera (reflections)
var cubeCamera = new THREE.CubeCamera(1, 100000, 1024);
 scene.add(cubeCamera);
		//lights
var ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

var light = new THREE.PointLight(0xFFFBE3);
light.position.set(100, 0, -60);
scene.add(light);

		//stars
scene.add(stars);

		//sun

sun.mesh.position.x = -90;
sun.mesh.position.z = -10;
sun.mesh.position.y = sunDistance;
scene.add(sun.mesh)


//disco
var disco = THREEx.Planets.createDiscoBall();
disco.envMap = cubeCamera.renderTarget.texture;
disco.rotation.x = 90;
//scene.add(disco);


	//raycaster, mouse vector
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;


//make board
scene.add(anonGroup);

planetGroup.children.forEach(function(p){
	p.visible = false;
});

scene.add(planetGroup);




//scene.add(saturnGroup);
// scene.add(saturn.mesh[0], saturn.mesh[1]);
// saturn.mesh[0].position.x = -35;
// saturn.mesh[1].position.x = -35;



function animate() {
	  //animation
	 requestAnimationFrame(animate);
	  
	  sun.mesh.rotation.x += 0.0008

	  disco.rotation.y += 0.004;

	  planetGroup.children.forEach(function(p){
	  	if (p instanceof THREE.Group) {
	  		//p.children[0].rotation.x += 0.005;
	  		p.children[0].rotation.y += 0.003;
	  	} else {
	  		//p.rotation.x += 0.004;
	  		p.rotation.y += 0.003;
	  	}

	  });

	  anonGroup.children.forEach(function(a){
	  	a.children[0].rotation.y += 0.005;
	  	a.children[1].rotation.y += 0.005;
	  	a.children[0].rotation.x += 0.004;
	  	a.children[1].rotation.y += 0.004;
	  });
	  stars.rotation.y += 0.00007;
	  //stars.rotation.x += 0.0008;
	  renderer.render(scene, camera);
	}

//CONTROLLER

function setup() {
	animate();
	renderer.render(scene, camera);

	window.addEventListener('click', handleTurn, false);
}

function handleTurn (event) {
	event.preventDefault();
	mouse.x = (event.clientX / width) * 2 - 1;
	mouse.y = -(event.clientY / height) * 2 + 1;
	//console.log(mouse.x, mouse.y);
	//mouse.set((event.clientX / width)*2-1, -(event.clientY / height)*2 -1);
	raycaster.setFromCamera(mouse, camera);

	var intersectsAnon = raycaster.intersectObjects(anonGroup.children, true); 
	var intersectsPlanet = raycaster.intersectObjects(planetGroup.children, true); 

	if (intersectsAnon.length > 0) {
		var intersect = intersectsAnon[0].object.parent;
		//console.log(intersect);
		intersect.visible = false;

		var i = anonGroup.children.indexOf(intersect);
		planetGroup.children[i].visible = true;
		//console.log(i);
		sunDistance += 9;
		sun.mesh.position.y = sunDistance;
		//console.log(sunDistance);


	} 
	if (intersectsPlanet.length > 0) {
		var intersect = intersectsPlanet[0].object;
		//console.log(intersect);

		var i = planetGroup.children.indexOf(intersect);
		anonGroup.children[i].visible = true;
		//console.log(i);

	}


	// if (SELECTED) {

	// }

}

$(document).ready(setup);

