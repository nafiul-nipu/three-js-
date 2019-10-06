/**
 * this is for particle system.
 * previosu codes are not here
 * for particle - 3js point function
 * points in 3js are specifies in Vecto3()
 * 
 * 1. create particle geometry
 * 2. create particle material - PointsMaterial
 * 3. push particles to geometry vertices
 * 4. Having populated the vertices of this 
 * newly generated geo, we can create the particle
 *  system using the THREE.Points function
 * --it takes two arg - geo and materials
 * 5. add the system to the scene
 * 
 */
function init() {
	var scene = new THREE.Scene();

	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 0;
	camera.position.x = 0;
	camera.position.y = 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    //creating particle geometry
    var particleGeo = new THREE.Geometry();
    //creating particle material which is PointsMaterial
    //two arg - color, size of the particle
    var particleMat = new THREE.PointsMaterial({
        color: 'rgb(25, 255, 255)', 
        size: 1,
        //changing the map property of pointsMaterial
        //and adding textures
        map : new THREE.TextureLoader().load('particles.png'),
        //with transparency on a texture that has a black background,
        // I should also set the blending mode to Three.js additive
        // blending.
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    var particleCount = 20000;
    //dis between particles from -50 to 50
    //if 200 - from -100 to 100
    var particleDistance = 100;

    //loop for creating random particles
    for (var i = 0; i < particleCount ; i++){
        var posX = (Math.random() - 0.5) * particleDistance;
        var posY = (Math.random() - 0.5) * particleDistance;
        var posZ = (Math.random() - 0.5) * particleDistance;
        //creating the particle
        var particle = new THREE.Vector3(posX, posY, posZ);
        //pushing the particles to particle geometry
        particleGeo.vertices.push(particle);
    }
    
    //create the particle system
    var particleSystem = new THREE.Points(
        particleGeo,
        particleMat
    );
    //add it to the scene
    scene.add(particleSystem);

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(20, 20, 20)');

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera, controls);

	return scene;
}


function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

var scene = init();
