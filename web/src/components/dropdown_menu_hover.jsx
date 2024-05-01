import React from 'react'
// import "../../styles/hover_dropdown.css"
import "./hover_menu.css"

export default function DropDownMenuHover({children,body}) {
  return (
    <div class="dropdown">
    {children}
    <div class="dropdown-content">

      <div style={{
        color: 'grey',
        fontSize:'13px'
      }}>
        {body}
      </div>  
    </div>
  </div>
  )
}