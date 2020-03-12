import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Content from "../component/home/content";
import Mytiket from "../component/home/myTiket";
import Payment from "../component/home/payment";
import "../css/style.css";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { cekUser } from "../_action/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTicketAlt,
  faMoneyBillWave,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

class Akun extends Component {
  componentDidMount() {
    this.props.cekUser();
  }

  handleLogout = () => {
    localStorage.removeItem("token");
  };

  render() {
    const { dataUser, error } = this.props.dataUser;
    // console.log("data user => ", dataUser.length);

    if (error) {
      window.location.href = "http://localhost:3000/";
    }
    if (dataUser.length !== 0) {
      if (dataUser.status) {
        window.location.href = "http://localhost:3000/admin";
      }
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-shadow">
          <Container>
            <div className="navbar-brand">
              <Link to="/beranda">
                <h1 className="clr">E-Tiket</h1>
              </Link>
            </div>
            <form className="form-inline my-2 my-lg-0">
              <div className="dropdown">
                <div className="bulet ">
                  {dataUser.name}&nbsp;
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="childDrop">
                  <Link to="/mytiket">
                    <p>
                      <FontAwesomeIcon icon={faTicketAlt} /> &nbsp; Tiket Saya
                    </p>
                  </Link>
                  <Link to="/payment">
                    <p>
                      <FontAwesomeIcon icon={faMoneyBillWave} />
                      &nbsp; Payment
                    </p>
                  </Link>
                  <hr />
                  <Link to="/">
                    <p onClick={this.handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp; Logout
                    </p>
                  </Link>
                </div>
              </div>
            </form>
          </Container>
        </nav>
        {this.props.open === "home" ? <Content /> : null}
        {this.props.open === "tiket" ? <Mytiket /> : null}
        {this.props.open === "payment" ? <Payment /> : null}
      </div>
    );
  }
}
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

// export default Akun;
export default connect(mapStateToProps, mapDispatchToProps)(Akun);
