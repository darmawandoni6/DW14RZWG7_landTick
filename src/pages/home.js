import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MdlLogin from "../component/home/mdlLogin";
import MdlRegister from "../component/home/mdlRegister";
import Content from "../component/home/content";
import "../css/style.css";
import { connect } from "react-redux";
import { cekUser } from "../_action/user";
// import { getAlltiket } from "../_action/kereta";

class Home extends Component {
  componentDidMount() {
    this.props.cekUser();
  }

  render() {
    // const { dataUser, isLoading, error } = this.props.dataUser;
    const { dataUser } = this.props.dataUser;
    // console.log("dataUser => ", dataUser.length );

    if (dataUser.length > 0) {
      if (dataUser.status) window.location.href = "http://localhost:3000/admin";
      else window.location.href = "http://localhost:3000/beranda";
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-shadow">
          <Container>
            <div className="navbar-brand">
              <h1 className="clr">E-Tiket</h1>
            </div>

            <form className="form-inline my-2 my-lg-0">
              <MdlRegister />
              <MdlLogin />
            </form>
          </Container>
        </nav>
        <Content />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataUser: state.dataUser
    // keretaR: state.keretaR
  };
};
const mapDispatchToProps = dispatch => {
  return {
    cekUser: () => dispatch(cekUser())
    // getAlltiket: () => dispatch(getAlltiket())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
