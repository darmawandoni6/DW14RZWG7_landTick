import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Axios from "axios";
import { BaseUrl, headerAutorization } from "../../config/API";

class MdlEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      status: "Approved"
    };
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  save = async () => {
    try {
      //Consum API
      await Axios({
        method: "PATCH",
        data: {
          status: this.state.status
        },
        url: `${BaseUrl}/payment/${this.props.data.id}`,
        headers: headerAutorization
      });
      //Cleat Title
      window.location.href = "http://localhost:3000/admin";
    } catch (err) {
      console.log(err.message);
    }
  };
  changeStatus = e => {
    this.setState({
      status: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="font-style">
          <i className="fa fa-edit 2 w" onClick={this.handleModal} />
        </div>

        <Modal
          show={this.state.showModal}
          onHide={this.handleModal}
          animation={false}
        >
          <div className="mdl-h-src">
            <div className="logo-tiket">E-Tiket</div>
            <h2>X</h2>
          </div>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  value={this.props.data.id}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={this.props.data.user.name}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tiket</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tiket"
                  value={this.props.data.keretum.name_train}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bukti Transfer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bukti Transfer"
                  value={this.props.data.payment.attachment}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control as="Select" onChange={this.changeStatus}>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancel">Cancel</option>
                </Form.Control>
              </Form.Group>

              <Button variant="outline-info" onClick={this.save}>
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MdlEdit;
