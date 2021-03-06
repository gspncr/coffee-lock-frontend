import React from 'react';
import {useState} from "react";

export default class Form{
    
    constructor(props) {
      super(props);
      this.state = {name: ''};
  
    }
  
    handleChange(event) {
      this.setState({name: event.target.value});
      this.setProps({name: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.name);
      
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }