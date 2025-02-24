import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Quiz from './Components/Quiz'
import AdminDashboard from './Components/AdminDashboard'
import CreateQuiz from './Components/CreateQuiz'
function App() {
  

  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/quiz' element={<Quiz/>}/>
       <Route path='/createQuiz' element={<CreateQuiz/>}/>
       <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
