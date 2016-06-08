var controlHz = 60

//this is 'big G' -- gravitational constant.
var G = 0.1

var Gravity = {

  init: function( obj, blockSpace ) {

    var COG = blockSpace.centerOfGravity
    var gVec = [ 0, 0, 0 ]
    var gVecCoefficient = 0

    var mainInterval = setInterval( function() {
      
      gVec = [ 
               obj.position.x - COG[ 0 ],
               obj.position.y - COG[ 1 ],
               obj.position.z - COG[ 2 ]  
             ]

      gVecCoefficient = Math.sqrt( 
                            Math.pow( gVec[0], 2 ) +
                            Math.pow( gVec[1], 2 ) +
                            Math.pow( gVec[2], 2 )
      )

      obj.dx += gVec[ 0 ] / gVecCoefficient
      obj.dy += gVec[ 1 ] / gVecCoefficient
      obj.dz += gVec[ 2 ] / gVecCoefficient

    }, 1000 / controlHz )

  }

}

if ( typeof module === 'object' ) module.exports = Gravity
