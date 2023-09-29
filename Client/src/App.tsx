import './App.css';
import { Route, Routes } from 'react-router-dom';
import ManagerDashboard from './components/procurementManager/managerDashboard/managerDashboard';
import SiteList from './components/procurementManager/pages/siteList';
import OrderList from './components/procurementManager/pages/orderList';

function ProcurementManagerRoute() {
  return (
    <ManagerDashboard>
      <Routes>
        <Route path="/sites" element={<SiteList />} />
        <Route path="/order" element={<OrderList />} />
      </Routes>
    </ManagerDashboard>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="manager/*" element={<ProcurementManagerRoute />} />
      </Routes>
    </>
  );
}

export default App;
