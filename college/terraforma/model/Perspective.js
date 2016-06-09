function Perspective(x, y, z) {

  THREE.PerspectiveCamera.call( this, 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

  //this.threeCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

  //this.__proto__ = this.threeCamera

  this.position.x = x
  this.position.y = y
  this.position.z = z

  this.updateMatrix()

}

Perspective.prototype = Object.create(THREE.PerspectiveCamera.prototype)
Perspective.prototype.constructor = THREE.PerspectiveCamera

Perspective.prototype.move = function( x, y, z ) {
/*
Moves the perspective x, y, z relative to ITSELF. It is also moved absolutely
in the process.
*/


}



if ( typeof module === 'object' ) module.exports = Perspective
