import './App.css'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp.tsx'

function App() {
    return<div className="app">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </div>
}

export default App
