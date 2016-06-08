import React from 'react'
import { innerCrop } from '../utils'

var CircleCropImg= React.createClass({

  getInitialState: function() {
      return {circleCropImgDims: null}
  },

  render: function() {
    return (
      <div className="circleCropImgWrapper" onClick={this.props.onClick}>
        <img
            className="circleCropImg"
            style={innerCrop(this.state.circleCropImgDims)}
            ref={img => {
              if (!img || this.state.circleCropImgDims) return
              var setNewRect = (newRect) =>
                this.setState({circleCropImgDims: newRect})
              img.onload = function() {
                setNewRect({
                  width: this.width,
                  height: this.height
                })
              }
              img.src = this.props.src;
            }}
        />
      </div>
    )
  }
})

module.exports = CircleCropImg
