import React, { Component } from "react";
import {
  Container,
  Navbar,
  Form,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cekUser } from "../_action/user";

import "../css/style.css";

class Admin extends Component {
  componentDidMount() {
    this.props.cekUser();
  }

  handleLogout = () => {
    localStorage.removeItem("token");
  };

  render() {
    const { dataUser, isLoading, error } = this.props.dataUser;
    if (error) {
      window.location.href = "http://localhost:3000/";
    }

    if (dataUser.length != 0) {
      if (!dataUser.status) {
        window.location.href = "http://localhost:3000/beranda";
      }
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-shadow">
          <Container>
            <a className="navbar-brand" href="#">
              <h1 className="clr">E-Tiket</h1>
            </a>
            <form className="form-inline my-2 my-lg-0">
              <div className="dropdown">
                <div className="bulet ">
                  <Link to="/admin">{dataUser.name} &nbsp;</Link>
                  <i className="fa fa-user fa-sm" />
                </div>
                <div className="childDrop">
                  <Link to="/tiket">
                    <p>
                      <i className="fa fa-ticket" /> &nbsp; Tambah Tiket
                    </p>
                  </Link>
                  <hr />
                  <Link to="/">
                    <p onClick={this.handleLogout}>Logout</p>
                  </Link>
                </div>
              </div>
            </form>
          </Container>
        </nav>
      </div>
    );
  }
}

// export default Admin;
const mapStateToProps = state => {
  return {
    dataUser: state.dataUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    cekUser: () => dispatch(cekUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
