import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Form,
  Card,
  Button
} from "react-bootstrap";

import Buy from "./mdlBuytiket";

import { connect } from "react-redux";
import { getAlltiket } from "../../_action/kereta";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      asal: "Asal",
      tujuan: "Tujuan",
      tiket: {}
    };
  }

  componentDidMount() {
    console.log("ambil", this.getTgl());

    this.props.getAlltiket(this.getTgl());
  }
  changeSearch = () => {
    this.setState({
      change: !this.state.change
    });
  };
  buyTiket2 = e => {
    alert(e.target.value);
  };

  getTgl() {
    let tgl = new Date();

    let hari = tgl.getDate();
    if (hari < 10) hari = "0" + hari;

    let bulan = tgl.getMonth() + 1;
    if (bulan < 10) bulan = "0" + bulan;

    let tahun = tgl.getFullYear();

    console.log("tgl => " + tahun + "-" + bulan + "-" + hari);

    return tahun + "-" + bulan + "-" + hari;
  }

  waktu(time1, time2) {
    let x = time1;
    let y = time2;

    let jam_x = parseInt(x.substring(0, 2)) * 60;
    let jam_y = parseInt(y.substring(0, 2)) * 60;
    let menit_x = parseInt(x.substring(3, 5));
    let menit_y = parseInt(y.substring(3, 5));
    let hasil_x = jam_x + menit_x;
    let hasil_y = jam_y + menit_y;
    let selisih = hasil_y - hasil_x;
    let jam = Math.floor(selisih / 60);
    let menit = selisih - jam * 60;

    if (jam < 0) jam = jam * -1;
    let time = jam + "jam " + menit + "menit";
    return time;
  }
  handleOnSubmit(e) {}
  render() {
    const { dataKereta } = this.props.keretaR;

    return (
      <div>
        {/* <Home/> */}
        <Jumbotron fluid className="bg-promo">
          <Container className="jumbotron-content">
            <Row>
              <Col className="home-color">
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
                    <Form.Label>
                      {this.state.change ? this.state.tujuan : this.state.asal}
                    </Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Jakarta" />
                  </Form.Group>
                  <Form.Row>
                    <Form.Group>
                      <Form.Label>Tanggal Berangkat</Form.Label>
                      <Form.Control
                        size="sm"
                        type="date"
                        min={this.getTgl()}
                        value={this.getTgl()}
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
                <div className="bg-img" onClick={this.changeSearch}>
                  <img src={require("../../img/tujuan.png")} alt="train" />
                </div>
              </div>
              <div className="col-tujuan">
                <Form>
                  <Form.Group>
                    <Form.Label>
                      {!this.state.change ? this.state.tujuan : this.state.asal}
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Surabaya"
                    />
                    {/* <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Surabaya"
                    /> */}
                  </Form.Group>
                  {/* <div className="flex-row"> */}

                  <Row>
                    <Col sm={3}>
                      <Form.Group>
                        <Form.Label>Dewasa</Form.Label>
                        <Form.Control type="number" placeholder="1" />
                      </Form.Group>
                    </Col>
                    <Col sm={3}>
                      <Form.Group>
                        <Form.Label>Bayi</Form.Label>
                        <Form.Control type="number" placeholder="1" />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>&nbsp;</Form.Label>
                        <div className="btn-cari">
                          <Button variant="outline-info">Cari Tiket</Button>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* </div> */}
                </Form>
              </div>
            </div>
          </div>
          <div className="space"></div>

          <Row>
            <Col className="b-h">
              <span>Nama Kereta</span>
            </Col>
            <Col className="b-h">
              <span>Berangkat</span>
            </Col>
            <Col className="b-h">
              <span>Tiba</span>
            </Col>
            <Col className="b-h">
              <span>Durasi</span>
            </Col>
            <Col className="b-h-p">
              <span>Harga Per Orang</span>
            </Col>
          </Row>
          <br />
          {dataKereta.map((kereta, index) => (
            <Row className="border-tiket" onClick={this.buyTiket} key={index}>
              <Col className="bhi">
                <h5>{kereta.name_train}</h5>
                <p>{kereta.typekeretum.name}</p>
              </Col>
              <Col className="bhi">
                <h5>{kereta.startTime}</h5>
                <p>{kereta.startStation}</p>
              </Col>
              <Col className="bhi">
                <h5>{kereta.arivalTime}</h5>
                <p>{kereta.destinationStation}</p>
              </Col>
              <Col className="bhi">
                <h5>{this.waktu(kereta.startTime, kereta.arivalTime)}</h5>
              </Col>
              <Col className="bhip">
                <h5>{"Rp. " + kereta.price.toLocaleString()}</h5>
                <Buy id={kereta.id} />
              </Col>
            </Row>
          ))}
          <div className="space"></div>
        </Container>
        <div className="footer">
          <h5>Copyright©Doni darmawan</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    keretaR: state.keretaR
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAlltiket: keretaR => dispatch(getAlltiket(keretaR))
  };
};

// export default Content;
export default connect(mapStateToProps, mapDispatchToProps)(Content);
