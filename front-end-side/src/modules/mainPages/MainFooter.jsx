import React from 'react'
import  "./../../assests/styles/mainFooter/mainFooter.css"
import logo from "../../assests/img/favicon_hpt.png"
const MainFooter = () => {
  return (
      <div className='footer'>
        <img src={logo} width={'100px'} height={'100px'} alt="logo" />
      </div>
  )
}

export default MainFooter