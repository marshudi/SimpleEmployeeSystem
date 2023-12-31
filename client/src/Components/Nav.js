import { NavLink } from "react-router-dom";
import React from "react";

export default function Nav() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-dark bg-dark fixed-top justify-content-center">
          <ul className="navbar-nav">
            {/* Add your logo here if needed */}
            {/* <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="active">
                <img src={logo} alt="Logo" style={{ width: "50px", height: "40px" }} />
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Display" className="nav-link" activeClassName="active">
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Register" className="nav-link" activeClassName="active">
                Register New Employee
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
