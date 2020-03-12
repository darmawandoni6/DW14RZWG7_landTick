import React, { Component } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import { url } from "../../config/API";

class mdlSearch extends Component {
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
    // const { this.props.data, isLoading, error } = this.props.list;
    // console.log("data order => ", this.props.list);
    console.log("data order lis  => ", this.props.data);

    return (
      <div>
        <div className="font-style">
          <i className="fa fa-search q" onClick={this.handleModal}></i>
        </div>
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
          {/* {dataOrder.length !== 0 ? ( */}
          <Modal.Body>
            <Row>
              <Col>
                <h2>INVOICE</h2>
                {/* <p>{this.props.id}</p> */}
                <p>Kode Invoice : {this.props.data.no_invoice}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col sm={7}>
                        <h3>Kereta Api</h3>
                        <p>{this.returnTgl(this.props.data.createdAt)}</p>
                      </Col>
                      <Col sm={5}>
                        <div className="barcode">
                          <img
                            src={require("../../img/barcode.png")}
                            alt="pic"
                          />
                          <figcaption>Barcode</figcaption>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h3>{this.props.data.keretum.name_train}</h3>
                        <p>{this.props.data.keretum.typekeretum.name}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h5>{this.props.data.keretum.startTime}</h5>
                        <p>{this.props.data.keretum.dateStart}</p>
                      </Col>
                      <Col>
                        <h5>{this.props.data.keretum.startStation}</h5>
                      </Col>
                    </Row>

                    <br />
                    <br />
                    <Row>
                      <Col>
                        <h5>{this.props.data.keretum.arivalTime}</h5>
                        <p>{this.props.data.keretum.dateStart}</p>
                      </Col>
                      <Col>
                        <h5>{this.props.data.keretum.destinationStation}</h5>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}>
                    <div className="bg-upload">
                      <img
                        src={`${url}/${this.props.data.payment.attachment}`}
                        alt="pic"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive>
                  <th>No. Tanda Pengenal</th>
                  <th>Nama Pemesanan</th>
                  <th>No. Handphone</th>
                  <th>Email</th>
                  <tbody>
                    <tr>
                      <td>12989897982323</td>
                      <td>{this.props.data.user.name}</td>
                      <td>{this.props.data.user.phone}</td>
                      <td>{this.props.data.user.email}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="total">
                  <div className="float-left">
                    <h2>Total</h2>
                  </div>
                  <div className="float-right">
                    <h2 style={{ color: "red" }}>
                      {"Rp. " +
                        this.props.data.payment.totalPrice.toLocaleString()}
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          {/* ) : null} */}
        </Modal>
      </div>
    );
  }
}

export default mdlSearch;
