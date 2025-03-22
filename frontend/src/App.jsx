import React from 'react'
import {Route, Routes} from 'react-router-dom'
import CreateBooks from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/books/create' element={<CreateBooks></CreateBooks>}></Route>
      <Route path='/books/details/:id' element={<ShowBook></ShowBook>}></Route>
      <Route path='/books/edit/:id' element={<EditBook></EditBook>}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook></DeleteBook>}></Route>
    </Routes>
  )
}

export default App
