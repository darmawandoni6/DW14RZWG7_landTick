import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import { Redirect } from "react-router-dom";
import Axios from "axios";
import { BaseUrl, headerAutorization } from "../../config/API";

import { connect } from "react-redux";
import { getDetailorder } from "../../_action/order";

class MdlEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      status: "Aproved"
    };
  }
  componentDidMount() {
    this.props.getDetailorder(this.props.id);
  }
  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  save = async () => {
    try {
      //Consum API
      const result = await Axios({
        method: "PATCH",
        data: {
          status: this.state.status
        },
        url: `${BaseUrl}/payment/${this.props.id}`,
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
    const { dataOrder, isLoading, error } = this.props.list;
    return (
      <div>
        <div className="font-style">
          <i className="fa fa-edit 2 w" onClick={this.handleModal} />
        </div>
        {dataOrder.length !== 0 ? (
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
                    value={dataOrder.id}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={dataOrder.user.name}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tiket</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tiket"
                    value={dataOrder.keretum.name_train}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bukti Transfer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bukti Transfer"
                    value={dataOrder.payment.attachment}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="Select" onChange={this.changeStatus}>
                    <option value="Aproved">Aproved</option>
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
        ) : null}
      </div>
    );
  }
}

// export default MdlEdit;

const mapStateToProps = state => {
  return {
    list: state.detailOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailorder: list => dispatch(getDetailorder(list))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MdlEdit);
