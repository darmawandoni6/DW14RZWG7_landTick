import React, { Component } from "react";
import { Button, Modal, Row, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../_action/user";

class MdlLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      username: "",
      password: ""
    };
  }
  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.userSign1(data);
  };

  render() {
    const { msg, token, status } = this.props.user.dataUser;
    const { dataUser, isLoading, error } = this.props.user;
    if (msg === "success") {
      localStorage.setItem("token", token);
      if (status) window.location.href = "http://localhost:3000/admin";
      else window.location.href = "http://localhost:3000/beranda";
    }
    // if (error) {
    //   alert("error");
    // }
    return (
      <div>
        <Button variant="outline-info" onClick={this.handleModal}>
          Login
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleModal}
          animation={false}
        >
          <Modal.Body>
            <Row className="mdl-header">
              <h1>Login</h1>
              <div>X</div>
            </Row>
            <Row className="mdl-conten">
              <Form onSubmit={this.handleSubmit}>
                <br />
                {error ? (
                  <div className="alert alert-danger">{dataUser.message}</div>
                ) : null}
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />

                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />

                  <div className="alert-danger alert-error">
                    {this.state.message}
                  </div>
                </Form.Group>
                <Form.Label>Belum Punya Akun ? Klik disini</Form.Label>
                <br />
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.sigIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userSign1: user => dispatch(signIn(user))
  };
};

// export default MdlLogin;
export default connect(mapStateToProps, mapDispatchToProps)(MdlLogin);
