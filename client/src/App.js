import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <>
   <ToastContainer />
   <BrowserRouter >
    <Routes>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
