import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Component/Register';
import Login from './Component/Login';
import NotFound from './Component/NotFound';
import Home from './Component/Home';
import Navbar from './Component/Navbar';

function App() {
  return <>
      <Navbar/>

  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='sticky-note' element={<Login/>}></Route>
    <Route path='home' element={<Home/>}></Route>
    <Route path='signup' element={<Register/>}></Route>
     <Route path='signin' element={<Login/>}></Route>
    <Route path='*' element={<NotFound/>}></Route>
  </Routes>

  </>;
}

export default App;
