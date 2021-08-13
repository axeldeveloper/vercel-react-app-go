import React, { useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Home from "./Home";
import Barber from "./barber/Barber";
import Customer from "./customer/Customer";
import Product from "./product/Product";
import NotFound from './404';
import OrderSales from './OrderSales';

const App = () => {
  const[toggled,setToggled] = useState(false);
  const buttonClass = (toggled)? '':'active';

  return (
    <div className="wrapper d-flex align-items-stretch">
      <Router>
        <nav id="sidebar" className={buttonClass}>
          
          <h1>
            <Link to="/" className="logo">S.</Link>
          </h1>
          
          <ul className="list-unstyled components mb-5">
            <li className="active">            
              <Link to="/"> <span className="fa fa-home"></span>Home</Link>
            </li>
            <li>
              <Link to="/customer"><span className="fa fa-home"></span>Customer</Link>
            </li>
            <li>
              <Link to="/barber"><span className="fa fa-home"></span>Barbers</Link>
            </li>
            <li>
            <Link to="/product"><span className="fa fa-home"></span>Product</Link>
            </li>
            <li>
            <Link to="/product"><span className="fa fa-home"></span>Product</Link>
            </li>
          </ul>
          <div className="footer">
            <p>
              Copyright &copy;
              All rights reserved | This template is made with 
              <i className="icon-heart" aria-hidden="true"></i> by 
              
            </p>
          </div>
        </nav>
     
         <div id="content" className="p-4 p-md-5">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button type="button" id="sidebarCollapse" className="btn btn-primary"  onClick={()=>setToggled(!toggled)}>
                <i className="fa fa-bars"></i>
                <span className="sr-only">Toggle Menu</span>
              </button>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll"> 
                  <Nav className="nav navbar-nav ml-auto">
                    <NavItem>   <Link className="nav-link active"   to="/">Home</Link> </NavItem> 
                    <NavItem>   <Link className="nav-link"   to="/customer">Customer</Link> </NavItem> 
                    <NavItem>   <Link className="nav-link"   to="/barber">Barber</Link> </NavItem> 
                    <NavItem>   <Link className="nav-link"   to="/product">Product</Link> </NavItem> 
                    <NavItem>   <Link className="nav-link"   to="/ordersale">Sales</Link> </NavItem> 
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/api/swagger">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>  
                  </Nav>             
                </Navbar.Collapse>
            </div>
          </nav>     
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/barber" component={Barber} />
            <Route exact path="/customer" component={() => <Customer greeting='customer' />} />
            <Route exact path="/product" component={() => <Product greeting='roduto' />} />
            <Route exact path="/ordersale" component={OrderSales} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      </div>
  );
}

export default App;