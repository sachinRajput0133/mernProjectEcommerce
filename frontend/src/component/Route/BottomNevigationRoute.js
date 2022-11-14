import React from 'react'
import BotNavigation from '../BottomNavigation/BottomNavigation'

const BottomNevigationRoute = ({children}) => {
  return (
     <>
   
  {children}
  <BotNavigation/>
   
     </>
  )
}

export default BottomNevigationRoute