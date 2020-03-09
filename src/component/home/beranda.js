import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Form,
  Card,
  Table
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAlltiket } from "../../_action/kereta";
import Akun from "../../pages/akun";
import "../../css/style.css";

class Beranda extends Component {
  render() {
    // const { data, isLoading, error } = this.props.keretaR;

    return (
      <div>
        <Akun />
        <Jumbotron fluid className="bg-promo">
          <Container className="jumbotron-content">
            <Row>
              <Col>
                <h1>Selamat Pagi, Ticket Seekers</h1>
                <p>Ingin Pulkam dengan Good Deal ?</p>
                <p>Masuk atau Daftar Sekarang !</p>
              </Col>
              <Col>
                <Card>
                  <Card.Img
                    // src={require("../img/promo1.jpg")}
                    src={require("../../img/promo1.jpg")}
                    alt="Card image"
                  />
                  <Card.ImgOverlay>
                    <div>
                      <Card.Img
                        src={require("../../img/promo2.jpg")}
                        alt="Card image"
                      />
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <div className="find-ticket">
            <div className="left-ticket">
              <div className="ticket">
                <img src={require("../../img/train.png")} alt="train" />
                <h5>Tiket Kereta Api</h5>
              </div>
            </div>
            <div className="right-ticket">
              <div>
                <h3>Tiket Kereta Api</h3>
              </div>
              <div className="col-asal">
                <Form>
                  <Form.Group>
                    <Form.Label>Asal</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Small text"
                    />
                  </Form.Group>
                  <Form.Row>
                    <Form.Group>
                      <Form.Label>Tanggal Berangkat</Form.Label>
                      <Form.Control
                        size="sm"
                        type="date"
                        placeholder="Small text"
                      />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                      <Form.Check
                        className="style-chekbox"
                        type="checkbox"
                        label="Pulang Pergi"
                      />
                    </Form.Group>
                  </Form.Row>
                </Form>
              </div>
              <div className="col-change">
                <div className="bg-img">
                  <img src={require("../../img/tujuan.png")} alt="train" />
                </div>
              </div>
              <div className="col-tujuan">
                <Form>
                  <Form.Group>
                    <Form.Label>Asal</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Small text"
                    />
                  </Form.Group>
                  <div className="flex-row">
                    <Form.Group>
                      <Form.Label>Dewasa</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    <span> &nbsp;</span>
                    <Form.Group>
                      <Form.Label>Bayi</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    <span> &nbsp;</span>
                    <div className="btn-position">
                      <button type="button" className="find btn btn-primary ">
                        Cari Tiket
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="space"></div>
          <Table responsive>
            <thead>
              <tr>
                <th>Nama Kereta</th>
                <th>Berangkat</th>
                <th>Tiba</th>
                <th>Durasi</th>
                <th>Harga Per Orang</th>
              </tr>
            </thead>

            <tbody>
              {/* {this.props.keretaR != null
                ? alert("data ad")
                : alert("data tidak ad")} */}
              {/* {data.map(kereta => (
                <tr>
                  <td>{data.name}</td>
                  <td>{data.startTime}</td>
                  <td>{data.arivalTime}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </Container>
        <div className="footer">
          <h1>Doni Darmawan</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state data", state.keretaR);
  return {
    keretaR: state.keretaR
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAlltiket: () => dispatch(getAlltiket())
  };
};

// export default Content;
export default connect(mapStateToProps, mapDispatchToProps)(Beranda);
