import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import SearchBar from './components/SearchBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={ <RecipeDetail/>} />
      </Routes>
      
    </Router>
  )
}

export default App
