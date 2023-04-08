import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'



import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/authContext';
import Home from "./pages/Home"
import MainLayout from './component/layout';

function App() {
  useEffect(()=>{
    fetch("http://localhost:5000/api/cards")
  })

  useEffect(()=>{

  },[])

  return (
    <AuthProvider>
     <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/signed' element={<Home />}/>
        </Route>
      </Routes>
    </Router>

    </AuthProvider>
  );
}

export default App;
