import React from "react";
import "./Admin.css";
import logo from './Logo.png';
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="AdminNavbar" style={{ marginBottom: "40px" ,height: '60px'}}>
      <div>
        <h1>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ width: '150px', height: '40px' }} 
            />
          </Link>
        </h1>
      </div>

      <div>
        <h1>Admin Page</h1>
      </div>

    </div>
  );
}

export default AdminNavbar;
