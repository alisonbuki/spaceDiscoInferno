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

var thePlanets = [mercury, venus, earth, moon, mars, jupiter, saturn, uranus, neptune, pluto];

//Starfield
var stars = THREEx.Planets.createStarfield();

//Board
function boardKey() {
	this.planets = $.merge(thePlanets, thePlanets);
}

boardKey.prototype.shuffle = function() {
	for (var i = this.planets.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.planets[i];
        this.planets[i] = this.planets[j];
        this.planets[j] = temp;
  }
}

//Game
function Game() {
	this.boardKey = new boardKey();
	this.boardKey.shuffle();
	this.turnNumber = 0; //max turns = 40?
	this.win = undefined;

}

Game.prototype.positionPlanets = function() {


}

Game.prototype.drawAnons = function() {
	var group = new THREE.Group();
	var positionX = -30;
	var positionZ = -15;
	for (i=0; i<4; i++) {
		positionZ += (i*15);
		for (j=0; j<5; j++) {
			positionX += (j*15);
			var anonPlanet = THREEx.Planets.createAnonPlanet();
			anonPlanet.position.x = positionX;
			anonPlanet.position.z = positionZ;
			group.add(anonPlanet);
			var helper = new THREE.EdgesHelper(anonPlanet, 0x000011);
			group.add(helper);
		}
	}
	scene.add(group);
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
model.drawAnons();

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
	  mercury.mesh.rotation.y += 0.003;
	  mercury.mesh.rotation.x += 0.002;
	  venus.mesh.rotation.y += 0.003;
	  venus.mesh.rotation.x += 0.004;
	  earth.mesh[1].rotation.y += 0.001;
	  earth.mesh[0].rotation.z += 0.002;
	  earth.mesh[1].rotation.x += 0.005;
	  saturn.mesh[0].rotation.x += 0.003;
	  saturn.mesh[0].rotation.y += 0.001;
	  mars.mesh.rotation.y += 0.002;
	  mars.mesh.rotation.x += 0.003;
	  jupiter.mesh.rotation.y += 0.003;
	  jupiter.mesh.rotation.x += 0.002;
	  uranus.mesh[0].rotation.y += 0.002;
	  uranus.mesh[0].rotation.x += 0.001;
	  neptune.mesh.rotation.y += 0.002;
	  neptune.mesh.rotation.x += 0.005;
	  pluto.mesh.rotation.y += 0.001;
	  pluto.mesh.rotation.x += 0.004;
	  anon.mesh.rotation.y += 0.004;
	  anon.mesh.rotation.x += 0.003;

	  stars.rotation.y += 0.00005;
	  //stars.rotation.x += 0.0008;
	  renderer.render(scene, camera);
	}

//CONTROLLER
document.addEventListener('click', handleClick, false);

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
}

$(document).ready(setup);

