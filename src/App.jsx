import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class App extends React.Component {
  constructor(props){
    super(props);
    const username = cookies.get('name');
    this.state = {
      data: [],
      name: '',
      coffeeOrdered: []
    }

    if(username){
      this.state.name = username;
    } else{
      this.state.noname = 'Name not set - please set your name'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event) {
    this.setState({name: event.target.value});
    
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.name);
    cookies.set('name', this.state.name, { path: '/' });
    event.preventDefault();
    console.log(cookies.get('name'));
  }

  handleButton= value => () => {
    if(value){
      axios.get('https://coffee-be.gspncr.com/redeemDrink/'+value)
      .then(res => {
        const coffeeOrdered = res.data;
        this.setState({ coffeeOrdered });
      })
    } else{
      alert(this.state.noname = 'Name not set - please set your name')
    }
  };

  /* commented out til i find a better way to handle notifications. triggers is experimental https://web.dev/notification-triggers/#scheduling-a-notification
  handleNotification= value => () => {
    if(value){
      console.log(value);

      var img = './logo-192.png';
      var text = 'HEY! it is coffee time';
      var dts = Math.floor(value);
      
      
      Notification.requestPermission().then(function(result) {
        console.log(result);
        if(result === 'granted'){
          console.log('you granted notifications')
          var notification = new Notification('Coffee Lock', { body: text, icon: img, timestamp: dts, showTrigger: dts });
        } else{
          alert('you didnt grant notifications, or unsupported')
        }
      }); 
    } 
  };*/

  componentDidMount() {
    axios.get(`https://coffee-be.gspncr.com/`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
  }

  render() {
    return (
      <div className="app">
      <h1>Coffee Lock Frontend</h1>
        <div className="stats">
          <h2>time to coffee: {this.state.data.countdownToCoffee}</h2>
          <h3>next redemption available at: {this.state.data.timeOfUnlock}</h3>
          <h4>coffees consumed today: {this.state.data.coffeesRedeemedToday}</h4>
          <h4>^ correct as of: {this.state.data.asOf}</h4>
          <h3>Logged in as: {this.state.name}</h3>
          <h4>last locked by: {this.state.data.lastLockedBy}</h4>
          <i>if the date is not today, great news, no coffees redeemed today!</i>
        </div>
        <div className="ordering">
          <button onClick={this.handleButton(this.state.name)}>Grab a coffee</button>
          <h3>Coffee request is: {this.state.coffeeOrdered.lockRequest} {this.state.coffeeOrdered.explanation}</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Set or change name: <input type="text" value={this.state.name} onChange={this.handleChange} placeholder={this.state.name} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}