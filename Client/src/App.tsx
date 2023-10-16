import './App.css';
import { Route, Routes } from 'react-router-dom';
import ManagerDashboard from './components/procurementManager/managerDashboard/managerDashboard';
import OrderList from './components/procurementManager/pages/orderList';
import OrderTable from './components/procurementManager/pages/OrderTable';
import SiteList from './components/procurementManager/pages/siteList';
import Checkout from './components/procurementManager/pages/checkOut';
import SignIn from './components/userComponent/SignIn';
import SignUp from './components/userComponent/SignUp';
import SupervisorDashboard from './components/supervisor//supervisorDashboard/supervisorDashboard';
import ApproveOrderList from './components/supervisor/pages/BudgetRequestList';
import AllApprovedOrders from './components/supervisor/pages/approvedBudgetList';
import SupplierDashboard from './components/supplier/supplierDashboard/supplierrDashboard';
import OrderViewPage from './components/supplier/pages/viewOrder';
import CreateDeliveryNotice from './components/supplier/pages/addNote';
import DeliveryNote from './components/supplier/pages/deliveryNotes';

import { AuthGuard, ManagerAuthGuard } from './auth/AuthGuard';
import { io } from 'socket.io-client';
import React from 'react';

function ProcurementManagerRoute() {
  return (
    // <ManagerAuthGuard>
      <ManagerDashboard>
        <Routes>
          <Route path="/sites" element={<SiteList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order" element={<OrderTable />} />
          <Route path="/payment" element={<Checkout />} />
        </Routes>
      </ManagerDashboard>
    // </ManagerAuthGuard>
  );
}

function GuestRoute() {
  return (
    // <AuthGuard>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
      </Routes>
    // </AuthGuard>
  );
}

function SupervisorRoute(){
  return(
    <SupervisorDashboard>
    <Routes>
            <Route path="/orders" element={<ApproveOrderList />} />
            <Route path="/allApprovedOrders" element={<AllApprovedOrders />} />
    </Routes>
    </SupervisorDashboard>

    );
}

function SupplierRoute() {
  return (
    // <ManagerAuthGuard>
      <SupplierDashboard>
        <Routes>
          <Route path="/viewOrders" element={<OrderViewPage/>} />
          <Route path="/addNote" element={<CreateDeliveryNotice />} />
          <Route path="/viewNotes" element={<DeliveryNote />} />
        </Routes>
      </SupplierDashboard>
    // </ManagerAuthGuard>
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
        <Route path="supervisor/*" element={<SupervisorRoute />} />
        <Route path="supplier/*" element={<SupplierRoute />} />

      </Routes>
    </>
  );
}

export default App;
