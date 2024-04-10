import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemsPage from './pages/ItemsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import Protected from './pages/Protected'
import OrderListPage from './pages/OrderListPage'
import Order from './pages/Order'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected Component={HomePage}/>}/>
        <Route path='/items' element={<Protected Component={ItemsPage}/>}/>
        <Route path='/account' element={<Protected Component={AccountPage} />}/>
        <Route path='/orderslist' element={<Protected Component={OrderListPage} />}/>
        <Route path='/order' element={<Protected Component={Order} />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App