import React, { Component } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";

class MdlDetail extends Component {
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

  returnTgl(tg) {
    let fullTgl = new Date(tg);
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
    const data = this.props.data;
    console.log(data);

    return (
      <div>
        <button className="btn-tiket" onClick={this.handleModal}>
          Detail
        </button>
        <Modal
          show={this.state.showModal}
          onHide={this.handleModal}
          animation={false}
          size="lg"
        >
          <div className="mdl-h-src">
            <div className="logo-tiket">E-Tiket</div>
            <h2 onClick={this.handleModal}>X</h2>
          </div>
          {data !== null ? (
            <Modal.Body>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h3>INVOICE</h3>
                      <p>{"Kode Invoice : " + data.no_invoice}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={5}>
                      <h4>Kereta Api</h4>
                      <p>{this.returnTgl(data.createdAt)}</p>
                    </Col>
                    <Col sm={4}>
                      <div className="barcode">
                        <img
                          src={require("../../img/barcode.png")}
                          alt="picture"
                        />
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <h4>{data.keretum.name_train}</h4>
                      <p>{data.keretum.typekeretum.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      <h5>{data.keretum.startTime}</h5>
                      <p>{data.keretum.dateStart}</p>
                    </Col>
                    <Col sm={8}>
                      <h5>{data.keretum.startStation}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      <h5>{data.keretum.arivalTime}</h5>
                      <p>{data.keretum.dateStart}</p>
                    </Col>
                    <Col sm={8}>
                      <h5>{data.keretum.destinationStation}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Table responsive>
                      <th>No. Tanda Pengenal</th>
                      <th>Nama Pemesanan</th>
                      <th>No. Handphone</th>
                      <th>Email</th>
                      <tbody>
                        <tr>
                          <td>12989897982323</td>
                          <td>{data.user.name}</td>
                          <td>{data.user.phone}</td>
                          <td>{data.user.email}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                  <Row>
                    <Col>
                      <div className="total">
                        <Row>
                          <Col sm={7}>
                            <h2>Total</h2>
                          </Col>
                          <Col sm={5}>
                            <h2 style={{ color: "red", float: "right" }}>
                              {"Rp. " +
                                data.payment.totalPrice.toLocaleString()}
                            </h2>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Body>
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default MdlDetail;
