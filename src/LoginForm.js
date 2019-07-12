import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import FormElement from "./FormElement";
import SubmitButton from "./SubmitButton";
import OrderForm from "./order";
//import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  submitHandler = event => {
    event.preventDefault();
    var tempUser = [
      document.getElementById("luser").value,
      document.getElementById("lpass").value
    ];
    //event.preventDefault();
    if (checkUser(tempUser)) {
      //document.getElementById('lmsg').innerHTML = '<font color = "green"> successfully logged in! </font>';
      //window.open('/order.html', '_self');
      this.setState({ isLoggedIn: true });
      var ret = <OrderForm />;
      ReactDOM.render(ret, document.getElementById("root"));
    } else
      document.getElementById("lmsg").innerHTML =
        '<font color = "red"> username or password invalid! </font>';
  };

  render() {
    return (
      <React.Fragment>
        <br />
        <h1 align="center"> Login </h1>
        <br />
        <div align="center" id="lmsg" />
        <br />

        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <FormElement label="Username" type="text" id="luser" />
          <FormElement label="Password" type="password" id="lpass" />
          <SubmitButton id="lsubmit" value="Login" />
        </form>
      </React.Fragment>
    );
  }
}

function checkUser(tempUser) {
  const users = [["admin", "pass"], ["trialuser", "trialpass"]];

  for (let i = 0; i < users.length; i++) {
    const [user, pass] = users[i];
    if (tempUser[0] === user && tempUser[1] === pass) return true;
  }

  return false;
}
