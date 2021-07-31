import React, { Component } from "react";
import { render } from 'react-dom';
import Cards from "react-credit-cards";
import './creditcard.css';
import 'react-credit-cards/es/styles-compiled.css';
import {
    Button,
    Checkbox,
    Form,
    Transition,
    Header,
    Icon,
    Card
  } from "semantic-ui-react";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
  } from "./utils";
class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null
    };
  }
  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };
  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div className="credit-card-container">
        <div className="App-payment">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
        
        <Card>
        <Form>
          <Form.Field>
          <label>Card Number</label>

              <input
                type="tel"
                name="number"
                className="form-control"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
           </Form.Field>
           <Form.Field>
          <label>Card Name</label>

              <input
                type="text"
                name="name"
                className="form-control"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
         </Form.Field>
         <Form.Group  widths='equal'>

             <Form.Field>
         <label>Expiration Date</label>

                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
        </Form.Field>
        <Form.Field>
         <label>CW</label>

                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
           </Form.Field>
            </Form.Group>
            {/* <input type="hidden" name="issuer" value={issuer} /> */}
            <Form.Field>
            <Button>Submit</Button>

            </Form.Field>
        
          </Form>     
        </Card>
         
        </div>
      </div>
    );
  }
}

export default CreditCard;
