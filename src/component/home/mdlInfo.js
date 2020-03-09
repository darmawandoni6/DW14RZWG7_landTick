import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
class MdlInfo extends Component {
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

  render() {
    return (
      <div>
        <button className="btn-byr" onClick={this.handleModal}>
          Bayar Sekarang
        </button>
        <Modal
          show={this.state.showModal}
          onHide={this.handleModal}
          animation={false}
        >
          <Modal.Body>
            <p className="info">
              Pembayaran Anda Akan di Konfirmasi dalam 1 x 24 Jam Untuk melihat
              pesanan <Link onClick={this.handleModal}>Klik Disini</Link>{" "}
              Terimakasih{" "}
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MdlInfo;
