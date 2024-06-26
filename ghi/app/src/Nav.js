import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-wrap justify-content-around">
            <li className="nav-item">
              <NavLink className="nav-link" end to="/manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/new">Add a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" end to="/models">Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models/new">Add a Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" end to="/automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/new">Add an Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" end to="/salespeople">Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople/new">Add a Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" end to="/customers">Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/new">Add a Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" end to="/sales">Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/new">Add a Sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/history">Salesperson History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" end to="/technicians">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians/new">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" end to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/new">Add a Service Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/history"> Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
