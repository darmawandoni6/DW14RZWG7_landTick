import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table
  // Navbar,
  // Form,
  // Dropdown,
  // DropdownButton
} from "react-bootstrap";
import "../../css/style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPaymnent } from "../../_action/payment";

class MyTiket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tgl: new date()
    };
  }
  componentDidMount() {
    this.props.getPaymnent();
  }
  render() {
    var months = [
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
    var months = [
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

    var myDays = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jum&#39;at",
      "Sabtu"
    ];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var thisDay = date.getDay(),
      thisDay = myDays[thisDay];
    var yy = date.getYear();
    var year = yy < 1000 ? yy + 1900 : yy;

    const { dataPayment, isLoading, error } = this.props.Payment;

    if (isLoading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <Container>
          <h1>Tiket Saya</h1>
          {dataPayment.map((data, index) => (
            <Row className="box-tiket">
              <div className="header-tiket">
                <div className="logo-tiket">E-Tiket</div>
                <div className="tgl-tiket">
                  <h2>Kereta Api</h2>
                  <p>
                    {thisDay + ", " + day + " " + months[month] + " " + year}
                  </p>
                </div>
              </div>
              <div className="content-tiket">
                <Row>
                  <Col sm={3}>
                    <b>
                      <h2>{data.keretum.name_train}</h2>
                    </b>
                    <p>{data.keretum.typekeretum.name}</p>
                    <br />
                    <br />
                    <div className="box-status">
                      <span>{data.payment.status}</span>
                    </div>
                  </Col>
                  <Col sm={9}>
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <h4>{data.keretum.startTime}</h4>
                            <p>
                              {thisDay +
                                ", " +
                                day +
                                " " +
                                months[month] +
                                " " +
                                year}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h4>{data.keretum.arivalTime}</h4>
                            <p>
                              {thisDay +
                                ", " +
                                day +
                                " " +
                                months[month] +
                                " " +
                                year}
                            </p>
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
                  <Col />
                </Row>
              </div>
              <div className="footer-tiket">
                <Row>
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
                  <Col sm={2}>
                    <Link to="/payment">
                      <button className="btn-tiket">Bayar Sekarang</button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Row>
          ))}
        </Container>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MyTiket);
