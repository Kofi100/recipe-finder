import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import ScrollToTop from './components/ScrollToTop';

import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={ <RecipeDetail/>} />
      </Routes>
      
    </Router>
  )
}

export default App
