import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
// import { Container } from 'semantic-ui-react'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact';
import Prodlist from './components/Prodlist';
import Prodcatalog from './components/Prodcatalog';
import Prodsearch from './components/Prodsearch';
import Profile from './components/Profile';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      {/* <Container> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productlist" element={<Prodlist />} />
          <Route path="/productcatalog" element={<Prodcatalog />} />
          <Route path="/productsearch" element={<Prodsearch />} />
        </Routes>
      {/* </Container> */}
    </BrowserRouter>    
  )
}

export default App
