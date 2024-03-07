import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemsPage from './pages/ItemsPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/items' element={<ItemsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App