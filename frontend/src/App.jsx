import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import { useState } from "react"
import RefreshHandler from "./RefreshHandler"

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to={'/login'}/>
  }

  return (
    <div className="app">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'}/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  )
}

export default App
