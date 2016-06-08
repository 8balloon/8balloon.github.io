/*
Base class for all Blocks.
*/

/*
These are being used as a closure.
*/
//create a different material for the default material?
var geometry = new THREE.BoxGeometry( 1, 1, 1 )
var defaultMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 , wireframe: false } );

var foo = new Block(2, 3, 888)
console.log(foo)


function Block( x, y, z, mat) {

  var material;

  if ( typeof mat === 'undefined' ) material = defaultMaterial
  else material = mat

  /*
  this.threeBlock = new THREE.Mesh( geometry, material );

  this.__proto__ = this.threeBlock
  */
  THREE.Mesh.call(this, geometry, material)

  this.position.x = x
  this.position.y = y
  this.position.z = z

  this.updateMatrix()

  this.dx = 0
  this.dy = 0
  this.dz = 0

}



Block.prototype.getCoordString = function() {

  //return this.position.x + ',' + this.position.y + ',' + this.position.z
  return String([this.position.x, this.position.y, this.position.z])

}



if ( typeof module === 'object' ) module.exports = Block
