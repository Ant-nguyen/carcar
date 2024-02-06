import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './inventory/VehicleModelForm';
import VehicleModelList from './inventory/VehicleModelList';
import ManufacturerForm from './inventory/ManufacturerForm';
import ManufacturerList from './inventory/ManufacturerList';
import AutomobileForm from './inventory/AutomobileForm';
import AutomobileList from './inventory/AutomobileList';
import SalespersonForm from './SalespersonForm';
import TechnicianList from './service/TechnicianList';
import TechnicianForm from './service/TechnicianForm';
import AppointmentList from './service/AppointmentList';
import AppointmentForm from './service/AppointmentForm';
import AppointmentHistory from './service/AppointmentHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/models/new" element={<VehicleModelForm />}/>
          <Route path="/models" element= {<VehicleModelList />}/>
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/salespeople/new" element={<SalespersonForm />}/>
          <Route path="/salespeople" element={<SalesPersonList />}/>
          <Route path="/customers" element={<CustomerList />}/>
          <Route path="/customers/new" element={<CustomerForm />}/>
          <Route path="/technicians" element={<TechnicianList />}/>
          <Route path="/technicians/new" element={<TechnicianForm />}/>
          <Route path="/appointments" element={<AppointmentList />}/>
          <Route path="/appointments/new" element={<AppointmentForm />}/>
          <Route path="/appointments/history" element={<AppointmentHistory />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
