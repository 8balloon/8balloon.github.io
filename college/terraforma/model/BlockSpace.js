function BlockSpace() {

  THREE.Scene.call(this)
 
  /*
  this.all stores references to all blocks by their coordString and
  this.centerOfGravity stores [x,y,z] coord of center of gravity.
  */
  this.all = {}
  this.centerOfGravity = [0, 0, 0]

}

BlockSpace.prototype = Object.create(THREE.Scene.prototype)
BlockSpace.prototype.constructor = THREE.Scene



BlockSpace.prototype.addBlock = function( block ) {

  this.add( block )
  
  var coordString = String( [ block.position.x, block.position.y, block.position.z ] )

  if ( coordString in this.all) return false
  else {

    this.all[ coordString ] = block
    return true

  }

}


/*
BlockSpace.prototype.remove = function( coordString ) {

  if ( coordString in this.all ) {

    delete this.all[coordString]
    return true

  }

  else return false

}



BlockSpace.prototype.get = function( coordString ) {

  return this.all[ coordString ]

}



BlockSpace.prototype.isOccupied = function( coordString ) {

  return coordString in this.all

}

*/

if ( typeof module === 'object' ) module.exports = BlockSpace
