import React from 'react';
import { Nav, NavLink, } from 'reactstrap';

function MyNav(props) {
  return (
    <div>
      <Nav className="mt-3">
        <img src="/img/logo.png" alt="logo" />
        <NavLink href="#" className="text-white">Last Releases</NavLink> <NavLink className="btn btn-secondary text-white" href="#">XXX films</NavLink>
      </Nav>
    </div>
  )
}

export default MyNav;