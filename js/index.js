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

var saturnGroup = new THREE.Group();
saturnGroup.add(saturn.mesh[0], saturn.mesh[1]);

var thePlanets = [THREEx.Planets.createMercury(), 
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
function gameBoard(anonGroup, planetGroup) {
	this.planets = $.merge(thePlanets, thePlanets);
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
			anonGroup.add(anonPlanet);
			var helper = new THREE.EdgesHelper(anonPlanet, 0x000011);
			anonGroup.add(helper);
		}
	}
	anonGroup.position.x = 0;
	anonGroup.position.z = 0;
	return anonGroup;
}


gameBoard.prototype.positionPlanets = function() {


}

//Game
function Game() {
	this.gameBoard = new gameBoard();
	this.gameBoard.shuffle();
	this.gameBoard.drawBoard();
	this.turnNumber = 0; //max turns = 40?
	this.win = undefined;

}



Game.prototype.handleTurn = function() {

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

		//lights
var ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

var light = new THREE.PointLight(0xFFFBE3);
light.position.set(100, 0, -60);
scene.add(light);

		//stars
scene.add(stars);

	//raycaster, mouse vector
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


//make board
scene.add(anonGroup);

// //scene.add(anon.mesh);
// scene.add(mercury.mesh);

// scene.add(venus.mesh);
// venus.mesh.position.x = 15;
// venus.mesh.position.y = 10;

// scene.add(earth.mesh[0], earth.mesh[1]);
// earth.mesh[0].position.x = -15;
// earth.mesh[1].position.x = -15;

// scene.add(moon.mesh);
// moon.mesh.position.y = 10;
// moon.mesh.position.x = -10;
// moon.mesh.position.z = -5;

// scene.add(mars.mesh);
// mars.mesh.position.z = 15;
// mars.mesh.position.x = -15;

// scene.add(jupiter.mesh);
// jupiter.mesh.position.x = 20;
// jupiter.mesh.position.z = 20;


//scene.add(saturnGroup);
// scene.add(saturn.mesh[0], saturn.mesh[1]);
// saturn.mesh[0].position.x = -35;
// saturn.mesh[1].position.x = -35;

// scene.add(uranus.mesh[0], uranus.mesh[1]);
// uranus.mesh[0].position.z = 25;
// uranus.mesh[1].position.z = 25;
// uranus.mesh[0].position.x = -35;
// uranus.mesh[1].position.x = -35;

// scene.add(neptune.mesh);
// neptune.mesh.position.z = 10;
// neptune.mesh.position.x = -50;

// scene.add(pluto.mesh);
// pluto.mesh.position.z = 15;
// pluto.mesh.position.x = 0;

// scene.add(anon.mesh);
// anon.mesh.position.z = -15;
// anon.mesh.position.y = 0;

// var helper = new THREE.EdgesHelper(anon.mesh, 0x000011);
// scene.add(helper);

function animate() {
	  //animation
	 requestAnimationFrame(animate);
	  // mercury.mesh.rotation.y += 0.003;
	  // mercury.mesh.rotation.x += 0.002;
	  // venus.mesh.rotation.y += 0.003;
	  // venus.mesh.rotation.x += 0.004;
	  // earth.mesh[1].rotation.y += 0.001;
	  // earth.mesh[0].rotation.z += 0.002;
	  // earth.mesh[1].rotation.x += 0.005;
	  // saturn.mesh[0].rotation.x += 0.003;
	  // saturn.mesh[0].rotation.y += 0.001;
	  // mars.mesh.rotation.y += 0.002;
	  // mars.mesh.rotation.x += 0.003;
	  // jupiter.mesh.rotation.y += 0.003;
	  // jupiter.mesh.rotation.x += 0.002;
	  // uranus.mesh[0].rotation.y += 0.002;
	  // uranus.mesh[0].rotation.x += 0.001;
	  // neptune.mesh.rotation.y += 0.002;
	  // neptune.mesh.rotation.x += 0.005;
	  // pluto.mesh.rotation.y += 0.001;
	  // pluto.mesh.rotation.x += 0.004;
	  anonGroup.children.forEach(function(a){
	  	a.rotation.y += 0.005;
	  	a.rotation.x += 0.004;
	  });
	  stars.rotation.y += 0.00007;
	  //stars.rotation.x += 0.0008;
	  renderer.render(scene, camera);
	}

//CONTROLLER

function handleClick (event) {
	event.preventDefault();
	mouse.set((event.clientx / width)*2-1, -(event.clienty / height)*2 -1);
	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects();

	//FIRST GENERATE ACTUAL MESHES, THEN STORE IN ARRAY FOR INTERSECT DETECTION

	if (SELECTED) {

	}

}


function setup() {
	animate();
	renderer.render(scene, camera);

	document.addEventListener('click', handleClick, false);
}

$(document).ready(setup);

