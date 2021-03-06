var THREEx = THREEx || {}

THREEx.Planets	= {}

THREEx.Planets.baseURL	= ''

// from http://planetpixelemporium.com/

THREEx.Planets.createSun	= function(){
	var geometry	= new THREE.SphereGeometry(50, 150, 150)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/sunmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMercury	= function(){
	var geometry	= new THREE.SphereGeometry(3, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/mercurymap.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/mercurybump.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createVenus	= function(){
	var geometry	= new THREE.SphereGeometry(4, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/venusmap.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/venusbump.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createEarth	= function(){
	var geometry	= new THREE.SphereGeometry(5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthmap1k.jpg'),
		bumpMap		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthbump1k.jpg'),
		bumpScale	: 0.05,
		specularMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthspec1k.jpg'),
		specular	: new THREE.Color('grey'),
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createEarthCloud	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 512
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.crossOrigin="anonymous";
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.crossOrigin="anonymous";
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'images/earthcloudmaptrans.jpg';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'images/earthcloudmap.jpg';

	var geometry	= new THREE.SphereGeometry(5.1, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createMoon	= function(){
	var geometry	= new THREE.SphereGeometry(1, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonbump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMars	= function(){
	var geometry	= new THREE.SphereGeometry(5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/marsmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/marsbump1k.jpg'),
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createJupiter	= function(){
	var geometry	= new THREE.SphereGeometry(7, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/jupitermap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.02,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createSaturn	= function(){
	var geometry	= new THREE.SphereGeometry(5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/saturnmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createSaturnRing	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 915
	canvasResult.height	= 64
	var contextResult	= canvasResult.getContext('2d')	

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.crossOrigin="anonymous";
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.crossOrigin="anonymous";
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]/4
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'images/saturnringpattern.gif';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'images/saturnringcolor.jpg';
	
	var geometry	= new THREEx.Planets._RingGeometry(5.5, 7.5, 64);
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		// map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.lookAt(new THREE.Vector3(1,-3,5))
	return mesh	
}


THREEx.Planets.createUranus	= function(){
	var geometry	= new THREE.SphereGeometry(5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/uranusmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createUranusRing	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 72
	var contextResult	= canvasResult.getContext('2d')	

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.crossOrigin="anonymous";
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.crossOrigin="anonymous";
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]/2
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'images/uranusringtrans.gif';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'images/uranusringcolour.jpg';
	
	var geometry	= new THREEx.Planets._RingGeometry(5.5, 7.5, 64);
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		// map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.lookAt(new THREE.Vector3(1,-2,6))
	return mesh	
}


THREEx.Planets.createNeptune	= function(){
	var geometry	= new THREE.SphereGeometry(5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/neptunemap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}



THREEx.Planets.createPluto	= function(){
	var geometry	= new THREE.SphereGeometry(3, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/plutomap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/plutobump1k.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createStarfield	= function(){
	var mesh;
	var material;
	var loader = new THREE.TextureLoader();
	loader.load(THREEx.Planets.baseURL+'images/galaxy_starfield.png', function(texture){
		mesh.material = new THREE.MeshLambertMaterial( {
			map: texture,
			side: THREE.BackSide,
			opacity: 0.4
		 });
		
	});
	//var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/galaxy_starfield.png')
	// var material	= new THREE.MeshLambertMaterial({
	// 	map	: texture,
	// 	side	: THREE.BackSide
	// })
	var geometry	= new THREE.SphereGeometry(150, 32, 32);
	mesh	= new THREE.Mesh(geometry, material);
	return mesh;	
}

// THREEx.Planets.createStars = function() {
//   var starAmt = 20000;
//   var starGeo = new THREE.SphereGeometry(1000, 100, 50);
//   var starAmt = 10000;
//   var starMat = {
//     size: 1.0,
//     opacity: 0.7
//   };
//   var starMesh = new THREE.PointsMaterial(starMat);

//   for (var i = 0; i < starAmt; i++) {
//     var starVertex = new THREE.Vector3();
//     starVertex.x = Math.random() * 1000 - 500;
//     starVertex.y = Math.random() * 1000 - 500;
//     starVertex.z = Math.random() * 1000 - 500;
//     starGeo.vertices.push(starVertex);
//   }

//   stars = new THREE.Points(starGeo, starMesh);
//   return stars;
// }

THREEx.Planets.createAnonPlanet = function(){
	var geometry = new THREE.IcosahedronGeometry(4.5, 1);
	var material = new THREE.MeshNormalMaterial({
		//wireframe: true,
		shading: THREE.FlatShading, 
		polygonOffset:true, 
		polygonOffsetFactor:1,
		polygonOffsetUnits: 1
	});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

THREEx.Planets.createDiscoBall = function() {
	var geometry = new THREE.SphereGeometry(11, 15, 12);
	var material = new THREE.MeshPhongMaterial({
    emissive: '#222',
    shininess: 50,
    reflectivity: 3.5,
    shading: THREE.FlatShading,
    specular: 'white',
    color: 'gray',
    side: THREE.DoubleSide,
    envMap: cubeCamera.renderTarget.texture,
    combine: THREE.AddOperation
  });
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

// THREEx.Planets.createEarthGroup = function(){
// 	earthGroup = new THREE.Group();
// 	earthGroup.add(THREEx.Planets.createEarth(), THREEx.Planets.createEarthCloud());
// 	return earthGroup;
// }


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * change the original from three.js because i needed different UV
 * 
 * @author Kaleb Murphy
 * @author jerome etienne
 */
THREEx.Planets._RingGeometry = function ( innerRadius, outerRadius, thetaSegments ) {

	THREE.Geometry.call( this )

	innerRadius	= innerRadius || 0
	outerRadius	= outerRadius || 50
	thetaSegments	= thetaSegments	|| 8

	var normal	= new THREE.Vector3( 0, 0, 1 )

	for(var i = 0; i < thetaSegments; i++ ){
		var angleLo	= (i / thetaSegments) *Math.PI*2
		var angleHi	= ((i+1) / thetaSegments) *Math.PI*2

		var vertex1	= new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
		var vertex2	= new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
		var vertex3	= new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
		var vertex4	= new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

		this.vertices.push( vertex1 );
		this.vertices.push( vertex2 );
		this.vertices.push( vertex3 );
		this.vertices.push( vertex4 );
		

		var vertexIdx	= i * 4;

		// Create the first triangle
		var face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
		var uvs = []

		var uv = new THREE.Vector2(0, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(0, 1)
		uvs.push(uv)

		this.faces.push(face);
		this.faceVertexUvs[0].push(uvs);

		// Create the second triangle
		var face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
		var uvs = []

		var uv = new THREE.Vector2(0, 1)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 1)
		uvs.push(uv)

		this.faces.push(face);
		this.faceVertexUvs[0].push(uvs);
	}

	// this.computeCentroids();
	 this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), outerRadius );

};
THREEx.Planets._RingGeometry.prototype = Object.create( THREE.Geometry.prototype );


