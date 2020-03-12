import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
// import { Redirect } from "react-router-dom";
import Axios from "axios";
import { BaseUrl, headerAutorization } from "../../config/API";

// import { connect } from "react-redux";
// import { getDetailorder } from "../../_action/order";

class MdlDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  delete = async () => {
    try {
      await Axios({
        method: "DELETE",
        url: `${BaseUrl}/payment/${this.props.data.payment.id}`,
        headers: headerAutorization
      });
      window.location.href = "http://localhost:3000/admin";
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <div className="font-style">
          <i className="fa fa-trash e" onClick={this.handleModal}></i>
        </div>

        <Modal
          show={this.state.showModal}
          onHide={this.handleModal}
          animation={false}
        >
          <div className="mdl-h-src">
            <div className="logo-tiket">E-Tiket</div>
            <h2 onClick={this.handleModal}>X</h2>
          </div>
          <Modal.Body className="mdl-delete">
            <h3 style={{ color: "red" }}>Delete Transaction ?</h3>
            <Button variant="outline-info" onClick={this.delete}>
              Yes
            </Button>{" "}
            &nbsp;
            <Button variant="outline-info" onClick={this.handleModal}>
              No
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MdlDelete;
