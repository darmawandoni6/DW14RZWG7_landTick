import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Admin from "../../pages/admin";
import { connect } from "react-redux";
import { type } from "../../_action/typekereta";
import { insertTiket } from "../../_action/kereta";
import { BaseUrl, headerAutorization } from "../../config/API";
import axios from "axios";

class Transaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: {},
      name_train: "",
      id_type: 0,
      dateStart: "",
      startStation: "",
      startTime: "",
      destinationStation: "",
      arivalTime: "",
      price: 0,
      qty: 0,
      save: false,
      msgError: ""
    };
  }
  componentDidMount() {
    this.props.type();
  }

  handleSave = async e => {
    e.preventDefault();
    try {
      if (this.validasi()) {
        const data = {
          // [e.target.name]: e.target.value
          name_train: this.state.name_train,
          id_type: this.state.id_type,
          dateStart: this.state.dateStart,
          startStation: this.state.startStation,
          startTime: this.state.startTime,
          destinationStation: this.state.destinationStation,
          arivalTime: this.state.arivalTime,
          price: this.state.price,
          qty: this.state.qty
        };
        console.log(`${BaseUrl}/addTiket`);
        console.log(data);
        const insert = await axios({
          method: "POST",
          url: `${BaseUrl}/addTiket`,
          headers: headerAutorization,
          data
        });
        console.log(insert);
      }
    } catch (error) {
      console.log(error.message);
    }

    // this.validasi(this.state.data);
  };
  validasi() {
    let msg = "";
    let returnData = false;
    if (
      this.state.name_train == "" ||
      this.state.dateStart == "" ||
      this.state.startStation == "" ||
      this.state.startTime == "" ||
      this.state.destinationStation == "" ||
      this.state.arivalTime == "" ||
      this.state.id_type == 0 ||
      this.state.price <= 0 ||
      this.state.qty <= 0
    ) {
      msg = "Data harus disi semua";
      this.setState({
        msgError: msg
        // save:false
      });
      returnData = false;
    } else {
      this.setState({
        msgError: ""
        // save:true
      });
      returnData = true;
    }
    return returnData;
  }
  change = e => {
    if (e.target.name == "price" || e.target.name == "qty") {
      if (e.target.value < 0) {
        this.setState({
          [e.target.name]: 0
        });
      } else {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  render() {
    const { dataType, isLoading, error } = this.props.dataType;
    // console.log("type => ", dataType);
    return (
      <div>
        <Admin />
        <br />

        <Container>
          <h1>Tambah Tiket</h1>
          <br />

          {this.state.msgError !== "" ? (
            <div className="alert alert-danger ">
              <i className="fa fa-exclamation-triangle" /> &nbsp; Data wajib
              diisi semua
            </div>
          ) : (
            <div className="alert alert-danger display ">
              <i className="fa fa-exclamation-triangle" /> &nbsp; Data wajib
              diisi semua
            </div>
          )}
          <Form onSubmit={this.handleSave}>
            <Form.Group>
              <Form.Label>Nama Kereta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Kereta"
                name="name_train"
                value={this.state.name_train}
                onChange={this.change}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jenis Kereta</Form.Label>
              <Form.Control
                as="select"
                name="id_type"
                value={this.state.id_type}
                onChange={this.change}
              >
                <option value="0"></option>
                {dataType.length > 0
                  ? dataType.map(tipe => (
                      <option value={tipe.id} key={tipe.id}>
                        {tipe.name}
                      </option>
                    ))
                  : null}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tanggal Keberangkatan</Form.Label>
              <Form.Control
                type="date"
                name="dateStart"
                value={this.state.dateStart}
                onChange={this.change}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stasiun Keberangkatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Stasiun Keberangkatan"
                name="startStation"
                value={this.state.startStation}
                onChange={this.change}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jam Keberangkatan</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={this.state.startTime}
                onChange={this.change}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stasiun Tujuan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Stasiun Tujuan"
                name="destinationStation"
                value={this.state.destinationStation}
                onChange={this.change}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jam Tiba</Form.Label>
              <Form.Control
                type="time"
                name="arivalTime"
                value={this.state.arivalTime}
                onChange={this.change}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga Tiket</Form.Label>
              <Form.Control
                type="number"
                placeholder="Harga Tiket"
                name="price"
                value={this.state.price}
                onChange={this.change}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Qty</Form.Label>
              <Form.Control
                type="number"
                name="qty"
                value={this.state.qty}
                onChange={this.change}
              />
            </Form.Group>
            <Button variant="outline-info" type="submit">
              Save
            </Button>
          </Form>
        </Container>
        <br />
        <br />
        <div className="footer">
          <h1>Doni Darmawan</h1>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    dataType: state.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    type: () => dispatch(type()),
    insertTiket: data => dispatch(insertTiket(data))
  };
};

// export default Transaksi;
export default connect(mapStateToProps, mapDispatchToProps)(Transaksi);
