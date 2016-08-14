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

//Matrix
function Matrix() {
	this.planets = $.merge(thePlanets, thePlanets);
}

Matrix.prototype.shuffle = function() {
	for (var i = this.planets.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.planets[i];
        this.planets[i] = this.planets[j];
        this.planets[j] = temp;
  }
}

//Game

//Model



//View

	//Set up scene
		//vars
var width = window.innerWidth;
var height = window.innerHeight;

		//renderer
var renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.shadowMap.enabled = true;
	renderer.setSize(width, height);
  	renderer.setClearColor(0x000011, 1);
  	renderer.domElement.id = "context";
  	document.body.appendChild(renderer.domElement);

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

//scene.add(anon.mesh);
scene.add(mercury.mesh);
scene.add(venus.mesh);
venus.mesh.position.x = 15;
venus.mesh.position.y = 10;
scene.add(earth.mesh[0], earth.mesh[1]);
earth.mesh[0].position.x = -15;
earth.mesh[1].position.x = -15;

function animate() {
	  //animation
	 requestAnimationFrame(animate);
	  mercury.mesh.rotation.y += 0.003;
	  mercury.mesh.rotation.x += 0.002;
	  venus.mesh.rotation.y += 0.003;
	  venus.mesh.rotation.x += 0.004;
	  earth.mesh[1].rotation.y += 0.001;
	  earth.mesh[0].rotation.x += 0.002;
	  earth.mesh[1].rotation.x += 0.005;
	  stars.rotation.y += 0.00005;
	  //stars.rotation.x += 0.0008;
	  renderer.render(scene, camera);
	}

//Controller
function setup() {
	animate();
	renderer.render(scene, camera);
}

$(document).ready(setup);

