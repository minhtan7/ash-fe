// Importing useEffect hook from the React library
import { useEffect } from 'react';
// Importing React Router libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importing page components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/authContext';
import Home from "./pages/Home"
import MainLayout from './component/layout';

function App() {
  // Using the useEffect hook to fetch data from the server on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/cards")
  })
  // Using the useEffect hook with an empty dependency array to run code only once on component mount
  useEffect(() => {
  }, [])
  // Returning the component tree
  return (
    <AuthProvider>
      {/* Wrapping the component tree in the AuthProvider context provider*/}
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signed' element={<Home />} />
          </Route>
        </Routes>
      </Router>

    </AuthProvider>
  );
}
// Exporting the App component
export default App;
