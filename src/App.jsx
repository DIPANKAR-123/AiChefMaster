
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'
import CareerPage from './pages/CareerPage'
import './App.css'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'
import JobsPage from './pages/JobsPage'
import JobDataPage from './pages/JobDataPage'
import JobOpening from './pages/JobOpening'
import JobForm from './components/JobForm'
import ApplicationPage from './components/ApplicationPage'
import Page from "../src/resume-parser/page"

function App() {
  const {user} = useAuthContext()

  return (
    <div>
    <BrowserRouter>
      <Navbar/> 
      <div className='pages'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={!user?<DashboardPage/>: <Navigate to='/signup'/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/career' element={<CareerPage/>}/>
          <Route path='/jobs' element={!user?<JobsPage/>: <Navigate to='/signup'/>}/>
          <Route path='/login' element={!user?<LoginPage/>:< Navigate to='/dashboard'/>}/>
          <Route path='/reset' element={!user?<LoginPage/>:< Navigate to='/reset'/>}/>
          <Route path='/jobform' element={!user?<JobForm/>:< Navigate to='/signup'/>}/>
          <Route path='/jobapplication' element={!user?<JobDataPage/>:< Navigate to='/signup'/>}/>
          <Route path='/jobopenings' element={!user?<ApplicationPage/>:< Navigate to='/signup'/>}/>
          <Route path='/resume-parser' element={!user?<Page/>:< Navigate to='/signup'/>}/>
        </Routes>
      </div>
    </BrowserRouter> 
   
    </div>
  )
}

export default App