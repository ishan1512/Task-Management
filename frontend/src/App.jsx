import {Navigate, Route, Routes} from "react-router-dom"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import TaskPage from "./pages/TaskPage"
import ChatRoom from "./pages/ChatRoom"

import Navbar from "./components/NavBar"

import { useAuthStore } from "./store/useAuthStore"
import { Toaster } from "react-hot-toast"
import ViewTasks from "./pages/ViewTasks"


function App() {
  const {authUser} = useAuthStore();
  return (
   <div>
     <Navbar/>
     
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/taskpage' element={ authUser ? <TaskPage/> : <Navigate to="/"/>}/>
      <Route path='/chat-room' element={ authUser ? <ChatRoom/> : <Navigate to="/"/>}/>
      <Route path='/view-tasks' element={authUser ? <ViewTasks/> : <Navigate to="/"/>}/>
      <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/taskpage"/>}/>
      <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/taskpage"/>}/>

    </Routes>
    <Toaster/>
   </div>
  )
}

export default App
