//3d objects in 3js are made of two things
//geometry that define the shape of the object
//material - surface quality , appearance of the object
//combination of these two makes up a mesh in three.js
//to update the background color of a scene we need to update renderer
function init(){
    var scene = new THREE.Scene();

    var enableFog = false;
    if(enableFog){
        //adding fog property
        //FogExp2 properties
        //new THREE.FogExp2(<color>, <density>);
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }

    //creating object by calling getBox()
    var box = getBox(1, 1, 1);
    //creating plane bye calling getPlane()
    var plane = getPlane(20);

    //can give name to objects so that we can call it from parent 
    plane.name = 'Plane-1';

    //making box out of the plane
    box.position.y = box.geometry.parameters.height / 2 ;

    //rotating the plane by 90 degree to x axis
    //three.js works radiant. in radiant 90 degree = pi/2
    plane.rotation.x = Math.PI / 2 ;

    
    //adding everything to scene to visualize
    scene.add(box);
    scene.add(plane);

    //three js camera needs some parameters to be set
    //field of view, aspect ratio, near clipping plane, far clipping plane
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    
    //changing camera position to see the object
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    //changing the camera look at. it will put the object to the center
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    //need rendered to see 
    var renderer = new THREE.WebGLRenderer();
    //renderer size should be set then
    renderer.setSize(window.innerWidth, window.innerHeight);
    //changing backgroung color of scene using setClearColor(<color>);
    //renderer.setClearColor(0xffffff);
    //using css color properties for color
    //renderer.setClearColor('#ffffff');
    renderer.setClearColor('rgb(120, 120, 120)');
    //need to inside renderer to domElement
    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera);

    return scene;
    

}

function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({color: 'rgb(120, 120, 120)'});
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;

}

function getPlane(size){
    //PlaneGeometry(width, depth)
    var geometry = new THREE.PlaneGeometry(size, size)
    //side: THREE.DoubleSide is used for showing 2D plane
    var material = new THREE.MeshPhongMaterial({color: 'rgb(120, 120, 120)' , side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function update(renderer, scene, camera){
    //render it
    renderer.render(scene, camera);

    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    });

}
var scene = init();

