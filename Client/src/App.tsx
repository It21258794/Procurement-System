import './App.css';
import { Route, Routes } from 'react-router-dom';
import ManagerDashboard from './components/procurementManager/managerDashboard/managerDashboard';
import OrderList from './components/procurementManager/pages/orderList';
import OrderTable from './components/procurementManager/pages/OrderTable';
import SiteList from './components/procurementManager/pages/siteList';
import Checkout from './components/procurementManager/pages/checkOut';
import SignIn from './components/userComponent/SignIn';
import SignUp from './components/userComponent/SignUp';
import { AuthGuard, ManagerAuthGuard } from './auth/AuthGuard';
import { io } from 'socket.io-client';
import React from 'react';

function ProcurementManagerRoute() {
  return (
    <ManagerAuthGuard>
      <ManagerDashboard>
        <Routes>
          <Route path="/sites" element={<SiteList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order" element={<OrderTable />} />
          <Route path="/payment" element={<Checkout />} />
        </Routes>
      </ManagerDashboard>
    </ManagerAuthGuard>
  );
}

function GuestRoute() {
  return (
    <AuthGuard>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
      </Routes>
    </AuthGuard>
  );
}

function App() {
  React.useEffect(() => {
    const socket = io('http://localhost:8000');
    console.log(socket);
  }, []);

  return (
    <>
      <Routes>
        <Route path="manager/*" element={<ProcurementManagerRoute />} />
        <Route path="*" element={<GuestRoute />} />
      </Routes>
    </>
  );
}

export default App;
