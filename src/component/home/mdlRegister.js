import React, { Component } from "react";
import { Button, Modal, Row, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../_action/user";

class MdlRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: "",
      username: "",
      email: "",
      password: "",
      gender: "Laki-laki",
      phone: "",
      address: "",
      next: false,
      error: false,
      errEmail: "",
      errPass: ""
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

  handleSubmit = e => {
    e.preventDefault();
    this.validate();
    let err = false;
    if (this.state.errPass.length === "") err = false;
    else err = true;
    const data = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      phone: this.state.phone,
      address: this.state.address
    };
    if (!err) this.props.register(data);
  };

  validate() {
    let vpass = "";
    if (this.state.password.length < 6) {
      vpass = "The password must be more than 6 digits long";
    }
    this.setState({
      errPass: vpass
    });
  }

  render() {
    const { dataUser } = this.props.data;
    // console.log("data user => ", dataUser);
    if (dataUser) {
      if (dataUser.msg === "success") {
        localStorage.setItem("token", dataUser.token);
        window.location.href = "http://localhost:3000/beranda";

        console.log(dataUser);
      }
    }

    return (
      <div>
        {this.state.next ? <Redirect to="/beranda" /> : null}
        <Button
          variant="outline-info"
          className="mr-sm-2"
          onClick={this.handleModal}
        >
          Register
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleModal}
          animation={false}
        >
          <Modal.Body className="modal-size">
            <Row className="mdl-header">
              <h1>Register</h1>
              <div>X</div>
            </Row>
            <Row className="mdl-conten">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nama Lengkap"
                    name="name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                {this.state.errPass.length > 0 ? (
                  <div class="alert alert-danger" role="alert">
                    {this.state.errPass}
                  </div>
                ) : null}
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    onChange={this.handleChange}
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Wanita">Wanita</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Telp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Telp"
                    name="phone"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Alamat"
                    name="address"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Register
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
    data: state.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user))
  };
};

// export default MdlRegister;
export default connect(mapStateToProps, mapDispatchToProps)(MdlRegister);
