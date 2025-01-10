import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { ProfilePage } from './pages/ProfilePage'
import { Register } from './header/register'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Strona nie została znaleziona</h1>} />
      </Routes>
    </Router>
  )
}

export default App
