import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
// , Table
import "../../css/style.css";
import Detail from "./mdlDetail";
import { Link } from "react-router-dom";

import Axios from "axios";
import { BaseUrl, headerAutorization } from "../../config/API";
// import { connect } from "react-redux";
// import { getPaymnent } from "../../_action/payment";

class MyTiket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tgl: new date()
      data: []
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      //Consum API
      const data = await Axios({
        method: "GET",
        url: `${BaseUrl}/list-order`,
        headers: headerAutorization
      });
      // console.log(data.data);
      this.setState({
        data: data.data.data
      });

      // this.setState({ data: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  returnTgl() {
    let fullTgl = new Date();
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

    let hari = fullTgl.getDay();
    hari = h[hari];
    let tgl = fullTgl.getDate();
    let bln = fullTgl.getMonth();
    bln = b[bln];
    let thn = fullTgl.getFullYear();
    return hari + ", " + tgl + " " + bln + " " + thn;
  }
  render() {
    console.log("list =>", this.state.data);
    console.log("list =>", this.state.data.length);

    return (
      <div>
        <Container>
          <h1>Tiket Saya</h1>
          {this.state.data.length !== 0
            ? this.state.data.map((data, index) => (
                <Row className="box-tiket">
                  <Col>
                    <Row>
                      <div className="header-tiket">
                        <div className="logo-tiket">E-Tiket</div>
                        <div className="tgl-tiket">
                          <h2>Kereta Api</h2>
                          <p>{this.returnTgl()}</p>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <Col>
                        <Row className="content-tiket">
                          <Col sm={3}>
                            <b>
                              <h2>{data.keretum.name_train}</h2>
                            </b>
                            <p>{data.keretum.typekeretum.name}</p>
                            <br />
                            <br />
                            <div className={data.payment.status}>
                              <span>{data.payment.status}</span>
                            </div>
                          </Col>
                          <Col sm={9}>
                            <Row>
                              <Col>
                                <Row>
                                  <Col>
                                    <h4>{data.keretum.startTime}</h4>
                                    <p>{this.returnTgl()}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h4>{data.keretum.arivalTime}</h4>
                                    <p>{this.returnTgl()}</p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Row>
                                  <Col>
                                    <h4>{data.keretum.startStation}</h4>
                                  </Col>
                                </Row>
                                <br />
                                <br />
                                <Row>
                                  <Col>
                                    <h4>{data.keretum.destinationStation}</h4>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="footer-tiket">
                      <Col sm={10}>
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
                            <tr>
                              <td>9812389812398</td>
                              <td>{data.user.name}</td>
                              <td>{data.user.phone}</td>
                              <td>{data.user.email}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col
                        sm={2}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {data.payment.status !== "Approved" ? (
                          <Link to="/payment">
                            <button className="btn-tiket">
                              Bayar Sekarang
                            </button>
                          </Link>
                        ) : (
                          <Detail data={data} />
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))
            : null}
        </Container>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     Payment: state.getPayment
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getPaymnent: () => dispatch(getPaymnent())
//   };
// };

export default MyTiket;
// export default connect(mapStateToProps, mapDispatchToProps)(MyTiket);
