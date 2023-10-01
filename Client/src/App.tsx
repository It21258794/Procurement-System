import './App.css';
import { Route, Routes } from 'react-router-dom';
import ManagerDashboard from './components/procurementManager/managerDashboard/managerDashboard';
import OrderList from './components/procurementManager/pages/orderList';
import OrderTable from './components/procurementManager/pages/OrderTable';
import SiteList from './components/procurementManager/pages/siteList';
import Checkout from './components/procurementManager/pages/checkOut';

function ProcurementManagerRoute() {
  return (
    <ManagerDashboard>
      <Routes>
        <Route path="/sites" element={<SiteList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order" element={<OrderTable />} />
        <Route path="/payment" element={<Checkout />} />
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
