// Importing useEffect hook from the React library
import { useEffect } from 'react';
// Importing React Router libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing page components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/authContext';
import Home from "./pages/Home"
import Play from "./pages/Play"
import MainLayout from './component/layout';
import AuthRequire from "./component/AuthRequire"
import Collections from './pages/Collections';

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
          <Route path='/' element={<Home />} />
          <Route path='/play' element={<Play />} />
          <Route path='/' element={<MainLayout />}>
            <Route path='/collections' element={<Collections />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard'
              element={
                // <AuthRequire>
                <Dashboard />
                // </AuthRequire>
              }

            />

          </Route>
        </Routes>
      </Router>

    </AuthProvider>
  );
}
// Exporting the App component
export default App;
