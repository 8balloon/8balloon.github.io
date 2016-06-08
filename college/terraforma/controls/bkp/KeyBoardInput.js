var Input = {

  left: 0,
  right: 0,
  up: 0,
  down: 0,
  space: 0,
  x: 0,

  //returns array: [x, y, z] so that the sum of their squares is either 1 or 0
  getNormInputs: function() {

    var x, y, z;  

    x = Input.right - Input.left
    y = Input.up - Input.down
    z = Input.space - Input.x

    //sumSquares is misnamed but I can't thnk of any better name for conveying what it does
    var sumSquares = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) + Math.pow( z, 2 ) )
    //this prevents 0/0 calculation in returned array
    if (!sumSquares) sumSquares = 1

    Input.left = Math.sign(Input.left)
    Input.right = Math.sign(Input.right)
    Input.up = Math.sign(Input.up)
    Input.down = Math.sign(Input.down)
    Input.space = Math.sign(Input.space)
    Input.x = Math.sign(Input.x)

    return [ x / sumSquares, y / sumSquares, z / sumSquares ]

  },

  init: function() {

    document.onkeydown = function( e ) {

      switch ( e.keyCode ) {
        
        //'l' key
        case 76:
          console.log(Input)
          break;

        //left arrow
        case 37:
          
          Input.left = 1;
          break;

        //'a' key
        case 65:

          Input.left = 1;
          break;

        //right arrow
        case 39:

          Input.right = 1;
          break;

        //'d' key
        case 68:

          Input.right = 1;
          break;

        //up arrow
        case 38:

          Input.up = 1;
          break;

        //'w' key
        case 87:

          Input.up = 1;
          break;
        
        //down arrow
        case 40:

          Input.down = 1;
          break;

        //'s' key
        case 83:

          Input.down = 1;
          break;

        //space bar
        case 32:

          Input.space = 1;
          break;

        //'x' key
        case 88:
          
          Input.x = 1;
          break;

      }

    }

    document.onkeyup = function( e ) {

      switch ( e.keyCode ) {

        //'l' key
        case 76:
          console.log(Input)
          break;

        //left arrow
        case 37:
          
          Input.left = 0;
          break;

        //'a' key
        case 65:

          Input.left = 0;
          break;

        //right arrow
        case 39:

          Input.right = 0;
          break;

        //'d' key
        case 68:

          Input.right = 0;
          break;

        //up arrow
        case 38:

          Input.up = 0;
          break;

        //'w' key
        case 87:

          Input.up = 0;
          break;
        
        //down arrow
        case 40:

          Input.down = 0;
          break;

        //'s' key
        case 83:

          Input.down = 0;
          break;

        //space bar
        case 32:

          Input.space = 0;
          break;

        //'x' key
        case 88:
          
          Input.x = 0;
          break;

      }

    }

  },

}

if ( typeof module === 'object' ) module.exports = Input
