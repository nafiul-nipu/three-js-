//3d objects in 3js are made of two things
//geometry that define the shape of the object
//material - surface quality , appearance of the object
//combination of these two makes up a mesh in three.js
function init(){
    var scene = new THREE.Scene();

    //creating object
    var box = getBox(1, 1, 1);
    //adding the geometry to scene
    scene.add(box);

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
    //renderer size shoul be set then
    renderer.setSize(window.innerWidth, window.innerHeight);
    //need to inside renderer to domElement
    document.getElementById('webgl').appendChild(renderer.domElement);
    //render it
    renderer.render(scene, camera);

}

function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;

}
init();