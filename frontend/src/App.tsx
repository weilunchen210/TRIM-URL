import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {


  return (
    <div>
      <Router>
      <Routes>
        <Route path="/login" element ={<Login />} />
        <Route path="/register" element ={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
