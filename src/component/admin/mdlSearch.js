import React, { Component } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getDetailorder } from "../../_action/order";

class mdlSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
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
  // mutipleClick = id => {
  //   this.handleModal();
  // };

  render() {
    const { dataOrder, isLoading, error } = this.props.list;
    // console.log("data order => ", dataOrder.length);

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
          {dataOrder.length !== 0 ? (
            <Modal.Body>
              <Row>
                <Col>
                  <h2>INVOICE</h2>
                  <p>Kode Invoice : {dataOrder.no_invoice}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col sm={8}>
                      <Row>
                        <Col sm={7}>
                          <h3>Kereta Api</h3>
                          <p>{this.returnTgl(dataOrder.createdAt)}</p>
                        </Col>
                        <Col sm={5}>
                          <div className="barcode">
                            <img src={require("../../img/barcode.png")} />
                            <figcaption>Barcode</figcaption>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h3>{dataOrder.keretum.name_train}</h3>
                          <p>{dataOrder.keretum.typekeretum.name}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>{dataOrder.keretum.startTime}</h5>
                          <p>{dataOrder.keretum.dateStart}</p>
                        </Col>
                        <Col>
                          <h5>{dataOrder.keretum.startStation}</h5>
                        </Col>
                      </Row>

                      <br />
                      <br />
                      <Row>
                        <Col>
                          <h5>{dataOrder.keretum.arivalTime}</h5>
                          <p>{dataOrder.keretum.dateStart}</p>
                        </Col>
                        <Col>
                          <h5>{dataOrder.keretum.destinationStation}</h5>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={4}>
                      <div className="bg-upload"></div>
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
                        <td>{dataOrder.user.name}</td>
                        <td>{dataOrder.user.phone}</td>
                        <td>{dataOrder.user.email}</td>
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
                        {"Rp. " + dataOrder.payment.totalPrice.toLocaleString()}
                      </h2>
                    </div>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          ) : null}
        </Modal>
      </div>
    );
  }
}

// export default mdlSearch;

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

export default connect(mapStateToProps, mapDispatchToProps)(mdlSearch);
