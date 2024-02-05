import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/models/new" element={<VehicleModelForm />}/>
          <Route path="/models" element= {<VehicleModelList />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
