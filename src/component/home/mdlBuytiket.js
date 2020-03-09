import React, { Component } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../_action/user";
import { BaseUrl, headerAutorization } from "../../config/API";
import Axios from "axios";

class BuyTiket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: [],
      sn: "",
      number: 0,
      id: 0
    };
  }
  getKereta = async id => {
    try {
      const result = await Axios({
        method: "GET",
        url: `${BaseUrl}/buytiket/${id}`,
        headers: headerAutorization
      });
      this.setState({ data: result.data });
    } catch (error) {
      console.log(error.message);
    }
  };
  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  // sn invoice
  handleBuyTiket = async e => {
    try {
      const result = await Axios({
        method: "GET",
        url: `${BaseUrl}/sn/INV`,
        headers: headerAutorization
      });

      const reqData = {
        qty: 1,
        totalPrice: this.state.data.data.price,
        status: "Pending",
        no_invoice: result.data.data.name + result.data.data.number,
        id_tiket: this.state.data.data.id
      };

      const result2 = await Axios({
        method: "POST",
        url: `${BaseUrl}/order/`,
        headers: headerAutorization,
        data: reqData
      });

      const snUpdate = {
        number: result.data.data.number + 1
      };
      const result3 = await Axios({
        method: "GET",
        url: `${BaseUrl}/sn/INV`,
        headers: headerAutorization,
        data: snUpdate
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  mutpliClik = e => {
    this.handleModal();
    this.getKereta(e.target.value);
  };
  getTgl() {
    let h = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    let b = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    let tgl = new Date();
    let hari = tgl.getDay();
    let tg = tgl.getDate();
    let bln = tgl.getMonth();
    let thn = tgl.getFullYear();
    return h[hari] + ", " + tg + " " + b[bln] + " " + thn;
  }

  render() {
    // const { msg, token, status } = this.props.user.dataUser;

    // console.log("detail xxxx => ", this.state.data);
    // console.log(this.state.data.data ? this.state.data.data.name_train : "");
    // console.log(this.state.data.length);
    // console.log(this.state);

    return (
      <div>
        <Button
          variant="outline-info "
          value={this.props.id}
          onClick={this.mutpliClik}
          size="sm"
        >
          Beli
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleModal}
          animation={false}
        >
          {this.state.data.data ? (
            <Modal.Body>
              <div className="mdlBuy">
                <Row>
                  <Row>
                    <Col>
                      <h3>Kereta Api</h3>
                      <p>{this.getTgl()}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                  </Row>
                </Row>

                <Row>
                  <Col>
                    <h4>{this.state.data.data.name_train}</h4>
                    <p>{this.state.data.data.typekeretum.name}</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={1}></Col>
                  <Col sm={11}>
                    <Row>
                      <Col sm={5}>
                        <h5>{this.state.data.data.startTime}</h5>
                        <p>{this.getTgl()}</p>
                      </Col>
                      <Col sm={7}>
                        <h5>{this.state.data.data.startStation}</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={5}>
                        <h5>{this.state.data.data.arivalTime}</h5>
                        <p>{this.getTgl()}</p>
                      </Col>
                      <Col sm={7}>
                        <h5>{this.state.data.data.destinationStation}</h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row style={{ float: "right" }}>
                  <Button
                    variant="primary"
                    onClick={this.handleBuyTiket}
                    // value={this.state.data.data.id}
                  >
                    Buy
                  </Button>
                </Row>
              </div>
            </Modal.Body>
          ) : null}
        </Modal>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     user: state.sigIn
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     userSign1: user => dispatch(signIn(user))
//   };
// };

export default BuyTiket;
// export default connect(mapStateToProps, mapDispatchToProps)(MdlLogin);
