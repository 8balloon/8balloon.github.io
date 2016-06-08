var Perspective = require( './model/Perspective' )
var BlockSpace = require( './model/BlockSpace' )

console.log(THREE)

var mainSpace = new BlockSpace()
var mainPerspective = new Perspective( 0, 0, 5 )
var renderer = new THREE.WebGLRenderer();

var controls = require('./controls/Controls.js')
controls.init(mainPerspective)
/*
var Gravity = require( './model/Gravity' )
Gravity.init( mainPerspective, mainSpace )
setInterval( function() {
  mainPerspective.position.x += mainPerspective.dx
  mainPerspective.position.y += mainPerspective.dy
  mainPerspective.position.z += mainPerspective.dz
}, 2000 )
*/

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

mainPerspective.position.z = 5;

var geometry = new THREE.BoxGeometry( 1, 1, 1 )
//alt material?
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 , wireframe: false } );
var material2 = new THREE.MeshBasicMaterial( { color: 0xff0000 , wireframe: false } );
var cube = new THREE.Mesh( geometry, material );
mainSpace.add( cube )

//setInterval(function() {console.log(mainPerspective)}, 2000)

var cube2 = new THREE.Mesh( geometry, material2 );
mainSpace.add( cube2 )
cube2.position.x += 1
cube2.updateMatrix()

var foo = mainSpace.children[0]
mainSpace.children[0] = mainSpace.children[1]
mainSpace.children[1] = foo

function render() { 
  requestAnimationFrame( render ); 
  renderer.render( mainSpace, mainPerspective ); 
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
} 
render()

console.log(mainSpace)
console.log(mainPerspective)
