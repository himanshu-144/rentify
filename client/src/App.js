import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import CreateListing from './pages/CreateListing';
import PropertyList from './pages/PropertyList';
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/:userId/properties" element={<PropertyList />} /> 
        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
