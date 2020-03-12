import React, { Component } from "react";
import MdlInfo from "./mdlInfo";
import { Container, Row, Col, Table } from "react-bootstrap";
import "../../css/style.css";

import { connect } from "react-redux";
import { getPaymnent } from "../../_action/payment";

import Axios from "axios";
import { BaseUrl, headerAutorization } from "../../config/API";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      idPayment: 0
    };
  }

  componentDidMount() {
    this.props.getPaymnent();
  }

  imageChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  bayarSekarang = e => {
    console.log("data", e.target.value);

    const formData = new FormData();
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    Axios.post(`${BaseUrl}/upload/${e.target.value}`, formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  };

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
    const { dataPayment } = this.props.Payment;
    // let idPay = 0;
    return (
      <div>
        <Container>
          <h1>Invoce</h1>
          <Row>
            <Col className="invoce-info">
              <Row>
                {/* LEft */}
                <Col sm={7}>
                  {/* DIV PERTAMA */}
                  <Row className="invoce">
                    <Col>
                      <div className="img-warning">
                        <img src={require("../../img/warning.png")} alt="pic" />
                      </div>
                      <div>
                        <p>
                          Silakan melakukan pembayaran memalui M-Banking,
                          E-Banking dan ATM Ke No.rek Yang Tertera.
                        </p>
                        <p>No.rek : 09812312312</p>
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <Row className="detail-payment">
                    <Col>
                      <Row>
                        <Col>
                          <div className="logo-tiket">E-Tiket</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <br />
                          <Table responsive="false">
                            <thead>
                              <tr>
                                <th>No. Tanda Pengenal</th>
                                <th>Nama Pemesan</th>
                                <th>No. Handphone</th>
                                <th>Email</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataPayment.length !== 0 ? (
                                <tr>
                                  <td>9812389812398</td>
                                  <td>{dataPayment[0].user.name}</td>
                                  <td>{dataPayment[0].user.phone}</td>
                                  <td>{dataPayment[0].user.email}</td>
                                </tr>
                              ) : null}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {/* DIV KETIGA */}
                  <br />
                  <div className="rincian-payment">
                    <Row>
                      <Col>
                        <h3>Rincian Harga</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <Col sm={8} className="rincian">
                            <Row>
                              <Col>
                                {dataPayment.map((data, index) => (
                                  <Row>
                                    <Col sm={7}>
                                      {data.keretum.name_train}(
                                      {data.keretum.typekeretum.name}) X1
                                    </Col>
                                    <Col sm={5} style={{ textAlign: "right" }}>
                                      {data.payment.totalPrice.toLocaleString()}
                                    </Col>
                                  </Row>
                                ))}
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Row style={{ backgroundColor: "#cac1c1" }}>
                                  <Col>Total</Col>
                                  <Col
                                    style={{
                                      textAlign: "right",
                                      paddingRight: 15
                                    }}
                                  >
                                    RP. &nbsp;
                                    {dataPayment
                                      ? this.sum(dataPayment).toLocaleString()
                                      : 0}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col
                                style={{ textAlign: "right", paddingTop: 10 }}
                              >
                                {dataPayment.length !== 0 ? (
                                  <button
                                    onClick={this.bayarSekarang}
                                    className="btn-tiket"
                                    value={dataPayment[0].id_payment}
                                  >
                                    Bayar Sekarang
                                  </button>
                                ) : null}
                              </Col>
                            </Row>
                          </Col>
                          <Col sm={4}>
                            <Row>
                              <Col></Col>
                            </Row>
                            <Row>
                              <Col>
                                <input
                                  type="file"
                                  name="myImage"
                                  accept="image/*"
                                  onChange={this.imageChange}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
                {/* Right */}
                <Col sm={5}></Col>
              </Row>
            </Col>
          </Row>
        </Container>

        {/* <Col sm={5}>
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
                                <img
                                  src={require("../../img/barcode.png")}
                                  alt="pic"
                                />
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
                 */}
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
