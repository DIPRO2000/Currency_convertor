import { useState } from 'react'
import CurrencyBox from './components/CurrencyBox'

import './App.css'

function App() {
  

  return (
    <>
      <div className="bg-cover bg-top h-screen w-full flex justify-center items-center" style={{backgroundImage:"url('https://png.pngtree.com/background/20210711/original/pngtree-minimalistic-style-stock-market-business-theme-web-banner-background-picture-image_1168797.jpg')",filter: "brightness(0.8) contrast(1.2)",}}>
          <CurrencyBox/>
      </div>
    </>
  )
} 
 
export default App
