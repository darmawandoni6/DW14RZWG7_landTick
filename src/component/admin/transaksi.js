import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Admin from "../../pages/admin";
import Search from "./mdlSearch";
import Edit from "./mdlEdit";

import { connect } from "react-redux";
import { getAllorder } from "../../_action/order";

class Transaksi extends Component {
  componentDidMount() {
    this.props.getAllorder();
  }

  render() {
    const { dataOrder, isLoading, error } = this.props.list;
    console.log(dataOrder);

    if (isLoading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <Admin />
        <br />
        <Container>
          <Row>
            <h1>List Transaksi</h1>
          </Row>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Tiket</th>
                <th>Bukti Transfer</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataOrder.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.user.name}</td>
                  <td>{data.keretum.name_train}</td>
                  <td>{data.payment.attachment}</td>

                  <td>{data.payment.status}</td>
                  <td>
                    <Row>
                      <Col>
                        <Search id={data.payment.id} />
                      </Col>
                      <Col>
                        <Edit id={data.payment.id} />
                      </Col>
                      <Col>
                        <div className="font-style">
                          <i className="fa fa-trash e"></i>
                        </div>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <div className="footer-admin">
          <h1>Doni Darmawan</h1>
        </div>
      </div>
    );
  }
}

// export default Transaksi;
const mapStateToProps = state => {
  return {
    list: state.listOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllorder: () => dispatch(getAllorder())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaksi);
