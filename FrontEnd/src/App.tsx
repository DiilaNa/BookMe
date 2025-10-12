import './App.css'
import {Routes, Route} from "react-router-dom"
import SignUp from './pages/SignUp.tsx'
import Login from "./pages/Login.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
    return<div className="app">
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    </div>
}

export default App
