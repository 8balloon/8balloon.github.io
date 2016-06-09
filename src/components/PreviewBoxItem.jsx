import React from 'react'
import CircleCropImg from './CircleCropImg'

export default (props) => {
  return (
    <div className="previewBoxItem">
      <CircleCropImg src={props.src} />
      <div>
        {props.children}
      </div>
    </div>
  )
}
