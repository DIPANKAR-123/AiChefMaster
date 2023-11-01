
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'
import './App.css'
import Navbar from './components/Navbar'
import InstructionsPage from './pages/InstructionsPage'


import { useAuthContext } from './hooks/useAuthContext'
function App() {
  const {user} = useAuthContext()

  return (
    <div>
    <BrowserRouter>
      <Navbar/> 
      <div className='pages'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={!user?<SignupPage/>: <DashboardPage/>}/>
          <Route path='/dashboard/instruction' element={ <InstructionsPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={!user?<LoginPage/>:< Navigate to='/dashboard'/>}/>

        </Routes>
      </div>
    </BrowserRouter> 
    </div>
  )
}

export default App
