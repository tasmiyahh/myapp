

import Home from "../home";
import Product from "../products";
import About from "../about";

import logo from "../assets/logo.jpg"


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
    
  } from "react-router-dom";

  
  
const Navbar = ()=>{
    return(
        <Router>
        <div className="navbar">

  
    <nav className='nav'>
     <img src={logo} alt="" height={70} width={120}/>
 
      <ul>
    
      <li className="home"><Link to="/" >Home</Link></li>
      
        
        <li className="product">
          <Link to="/products">Products</Link>
        </li>

        <li className="about">
          <Link to="/about">about</Link>
        </li>
      </ul>
    </nav>
    </div>
    <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Product/>}/>
         <Route path='/about' element={<About/>}/>
   
      
      </Routes>

    </Router>

    )
}

export default Navbar;