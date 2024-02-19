import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage'
import BoardPage from './pages/BoardPage/BoardPage'
import SettingPage from './pages/SettingPage/SettingPage'
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
      <Route path='/dashboard' element={<BoardPage/>}/>
      <Route path='/analytics' element={<AnalyticsPage/>}/>
      <Route path='/settings' element={<SettingPage/>}/>
    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
