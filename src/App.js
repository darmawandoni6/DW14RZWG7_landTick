import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Akun from "./pages/akun";
import AdminIndex from "./component/admin/transaksi";
import AddTiket from "./component/admin/addTiket";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* admin */}
            <Route path="/tiket">
              <AddTiket />
            </Route>
            <Route path="/admin">
              <AdminIndex />
            </Route>
            {/* user */}
            <Route path="/payment">
              <Akun open="payment" />
            </Route>
            <Route path="/mytiket">
              <Akun open="tiket" />
            </Route>
            <Route path="/beranda">
              <Akun open="home" />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
