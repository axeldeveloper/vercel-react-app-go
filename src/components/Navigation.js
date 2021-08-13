import React from 'react';
import { Navbar,Nav,NavItem, NavLink } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Navigation = () => {

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">       
                <NavItem>   <Link className="nav-link"   to="/">Home</Link> </NavItem> 
                <NavItem>   <Link className="nav-link"   to="/customer">Customer</Link> </NavItem> 
                <NavItem>   <Link className="nav-link"   to="/barber">Barber</Link> </NavItem> 
                <NavItem>   <Link className="nav-link"   to="/product">Product</Link> </NavItem> 
                <NavItem>   <Link className="nav-link"   to="/ordersale">Sales</Link> </NavItem> 
            </Nav>
         </Navbar.Collapse>
      </Navbar>
    );
}

export default Navigation;

//https://jasonwatmore.com/post/2020/10/09/react-crud-example-with-react-hook-form