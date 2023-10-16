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
import ItemListView from './components/admin/pages/ItemView';
import AccountListView from './components/admin/pages/AccountListView';
import AccountForm from './components/admin/adminFunctions/createAccountForm';
import ItemForm from './components/admin/adminFunctions/insertItemForm';
import SiteForm from './components/admin/adminFunctions/insertSiteForm';
import AdminDashboard from './components/admin/managerDashboard/AdminDashboard';
import BudgetForm from './components/procurementManager/pages/BudgetForm';
import PayOrderList from './components/procurementManager/pages/PayOrderList';

function ProcurementManagerRoute() {
  return (
    <ManagerAuthGuard>
      <ManagerDashboard>
        <Routes>
          <Route path="/sites" element={<SiteList />} />
          <Route path="/orders/:location/:id" element={<OrderList />} />
          <Route path="/order/:id" element={<OrderTable />} />
          <Route path="/allOrders" element={<PayOrderList />} />
          <Route path="/payment/:id/:orderId" element={<Checkout />} />
          <Route
            path="/budgetForm/:address/:siteBudget/:remBudget/:total/:siteId"
            element={<BudgetForm />}
          />
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

function SupervisorRoute() {
  return (
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

function AdminRoute() {
  return (
    // <ManagerAuthGuard>
    <AdminDashboard>
      <Routes>
        <Route path="/sites" element={<SiteList />} />
        <Route path="/items" element={<ItemListView />} />
        <Route path="/accountList" element={<AccountListView />} />
        <Route path="/createAccount" element={<AccountForm />} />
        <Route path="/insertItem" element={<ItemForm />} />
        <Route path="/insertSite" element={<SiteForm />} />
      </Routes>
    </AdminDashboard>
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

        <Route path="admin/*" element={<AdminRoute />} />
      </Routes>
    </>
  );
}

export default App;
