// AdminNavbar.js
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminNavbar = ({ setRole }) => {
  const handleLogout = () => {
    setRole(null);
  };

  return (
    <Navbar className="navbar" expand="lg">
      <h4>QuickRush</h4>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/AddDoctor">
            Add Doctor
          </Nav.Link>
          <Nav.Link as={Link} to="/ViewDoctors">
            View Doctors
          </Nav.Link>
          <Nav.Link as={Link} to="/ViewPatients">
            View Patients
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;