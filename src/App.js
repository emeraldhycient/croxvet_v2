import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"


import ProtectedRoutes from "./components/auth/ProtectedRoute";
import Protectadmin from "./components/auth/Protectadmin";

import Index from "./components/index";
import About from "./components/pages/About";
import Faq from "./components/pages/Faq";
import Contact from "./components/pages/Contact"
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Four0Four from "./components/Four0Four"
/*  dashboard */
import UserDashboard from "./components/Dashboards/user/UserDashboard";
import AdminDashboard from "./components/Dashboards/admin/AdminDashboard";
import Deposit from "./components/Dashboards/user/Deposit";
import Withdrawal from "./components/Dashboards/user/Withdrawal";
import Settings from "./components/Dashboards/user/Setting";
import Users from "./components/Dashboards/admin/Users";
import Paymentmethod from "./components/Dashboards/admin/Paymentmethod";
import Withdrawals from "./components/Dashboards/admin/Withdrawals";
import Deposits from "./components/Dashboards/admin/Deposits";
import Setting from "./components/Dashboards/admin/Settings";
import Clone2 from './components/clone2/Clone2';
/*  dashboard */


function App() {

  return (
    <Router>
      <Switch>
      <Route path="/" exact component={Clone2} />
      <Route path="/index2" exact component={Index} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={Faq} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signup/:referralid" component={Signup} />
        <ProtectedRoutes
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <ProtectedRoutes
            path="/user/dashboard/deposit/:currency"
            exact
            component={Deposit}
          />
          <ProtectedRoutes
            path="/user/dashboard/withdrawal/:currency"
            exact
            component={Withdrawal}
          />

          <ProtectedRoutes
            path="/user/dashboard/Setting"
            exact
            component={Settings}
          />

          <Protectadmin
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <Protectadmin path="/admin/dashboard/users" exact component={Users} />
          <Protectadmin
            path="/admin/dashboard/users/:userid"
            component={Users}
          />
          <Protectadmin
            path="/admin/dashboard/payment-methods"
            component={Paymentmethod}
          />
          <Protectadmin
            path="/admin/dashboard/withdrawals"
            component={Withdrawals}
          />
          <Protectadmin path="/admin/dashboard/deposits" component={Deposits} />

          <Protectadmin path="/admin/dashboard/Setting" component={Setting} />

        <Route path="*" exact component={Four0Four} />
      </Switch>
    </Router>
  );
}

export default App;
