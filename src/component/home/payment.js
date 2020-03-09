import React, { Component } from "react";
import MdlInfo from "./mdlInfo";
import { Container, Row, Col, Table } from "react-bootstrap";
import "../../css/style.css";

import { connect } from "react-redux";
import { getPaymnent } from "../../_action/payment";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tgl: new date()
    };
  }

  componentDidMount() {
    this.props.getPaymnent();
  }

  sum(data) {
    let sumHsl = 0;
    for (var t = 0; t <= data.length - 1; t++) {
      sumHsl = sumHsl + data[t].payment.totalPrice;
    }
    return sumHsl;
  }

  tgl() {
    let months = [
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

    let myDays = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jum'at",
      "Sabtu"
    ];
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    month = months[month];
    let thisDay = date.getDay();
    thisDay = myDays[thisDay];
    let yy = date.getFullYear();

    return thisDay + ", " + day + " " + month + " " + yy;
  }

  render() {
    const { dataPayment, isLoading, error } = this.props.Payment;

    return (
      <div>
        <Container>
          <h1>Invoce</h1>
          <Row className="invoce-info">
            <Col sm={7}>
              <div className="invoce">
                <div className="img-warning">
                  <img src={require("../../img/warning.png")} />
                </div>
                <div>
                  <p>
                    Silakan melakukan pembayaran memalui M-Banking, E-Banking
                    dan ATM Ke No.rek Yang Tertera.
                  </p>
                  <p>No.rek : 09812312312</p>
                </div>
              </div>
              <br />
              <div className="detail-payment">
                <div>
                  <div className="logo-tiket">E-Tiket</div>
                </div>
                <div className="table-detail">
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>No. Tanda Pengenal</th>
                        <th>Nama Pemesan</th>
                        <th>No. Handphone</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPayment.length > 0 ? (
                        <tr>
                          <td>9812389812398</td>
                          <td>{dataPayment[0].user.name}</td>
                          <td>{dataPayment[0].user.phone}</td>
                          <td>{dataPayment[0].user.email}</td>
                        </tr>
                      ) : null}
                    </tbody>
                  </Table>
                </div>
              </div>
              <br />
              <div className="rincian-payment">
                <div>
                  <h4>Rincian Harga</h4>
                </div>
                <div className="rincian">
                  {dataPayment.length > 0
                    ? dataPayment.map((data, index) =>
                        data.payment.status === "Pending" ? (
                          <Row>
                            <Col sm={7}>{data.keretum.name_train} x1</Col>
                            <Col sm={5}>{data.keretum.typekeretum.name}</Col>
                          </Row>
                        ) : null
                      )
                    : null}
                  <br />
                  <div className="bg-total">
                    <Row>
                      <Col sm={6}>
                        <b>
                          <h4>Total</h4>
                        </b>
                      </Col>
                      <Col sm={6}>
                        <b>{"Rp. " + this.sum(dataPayment).toLocaleString()}</b>
                      </Col>
                    </Row>
                    <MdlInfo />
                  </div>
                </div>
                <div className="rincian-bukti">
                  <div className="bukti-transfer">
                    <img src={require("../../img/foto.png")} />
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={5}>
              {dataPayment.map((data, index) =>
                data.payment.status === "Pending" ? (
                  <Row className="h-tiket">
                    <div className="row1">
                      <div className="col-tgl">
                        <h3>Kereta Api</h3>
                        <p>{this.tgl()}</p>
                      </div>
                      <div className="col-inv">
                        <div className="barcode">
                          <img src={require("../../img/barcode.png")} />
                          <figcaption>{data.no_invoice}</figcaption>
                        </div>
                      </div>
                    </div>
                    <div className="row2">
                      <h3>{data.keretum.name_train}</h3>
                      <p>{data.keretum.typekeretum.name}</p>
                    </div>
                    <div className="row3">
                      <Row>
                        <Col sm={1}></Col>
                        <Col sm={5}>
                          <h4>{data.keretum.startTime}</h4>
                          <p>{this.tgl()}</p>
                          <br />
                          <h4>{data.keretum.arivalTime}</h4>
                          <p>{this.tgl()}</p>
                        </Col>
                        <Col sm={6}>
                          <h4>{data.keretum.startStation}</h4>
                          <br />
                          <h4>{data.keretum.destinationStation}</h4>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                ) : null
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// export default Payment;
const mapStateToProps = state => {
  return {
    Payment: state.getPayment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPaymnent: () => dispatch(getPaymnent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
