import './App.css'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp.tsx'
import Login from "./pages/Login.tsx";

function App() {
    return<div className="app">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
}

export default App
