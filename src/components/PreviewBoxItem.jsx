import React from 'react'
import CircleCropImg from './CircleCropImg'

export default (props) => {
  return (
    <a className="previewBoxItem" href={props.href}>
      <CircleCropImg src={props.src} />
      <div>
        {props.children}
      </div>
    </a>
  )
}
