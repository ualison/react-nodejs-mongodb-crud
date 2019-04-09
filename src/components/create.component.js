import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePublisherName = this.onChangePublisherName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      publisher: '',
      price:''
    }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangePublisherName(e) {
    this.setState({
      publisher: e.target.value
    })  
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      publisher: this.state.publisher,
      price: this.state.price
    };
    axios.post('http://localhost:4000/game/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      name: '',
      publisher: '',
      price: ''
    })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">CRIAR UM NOVO JOGO</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>NOME:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>PUBLICADORA: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.publisher}
                      onChange={this.onChangePublisherName}
                      />
                </div>
                <div className="form-group">
                    <label>PREÇO: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.price}
                      onChange={this.onChangePrice}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Registrar Jogo" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}