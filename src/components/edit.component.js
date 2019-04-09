import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
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

  componentDidMount() {
      axios.get('http://localhost:4000/game/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                name: response.data.name, 
                publisher: response.data.publisher,
                price: response.data.price });
          })
          .catch(function (error) {
              console.log(error);
          })
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
    axios.post('http://localhost:4000/game/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">ATUALIZAR JOGO</h3>
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
                      value="Atualizar Jogo" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}