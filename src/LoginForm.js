import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import FormElement from "./FormElement";
import SubmitButton from "./SubmitButton";
import OrderForm from "./order";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
//import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  validResponse = response => {
    //console.log(response);
    this.setState({ isLoggedIn: true });
    var ret = <OrderForm loginType="google" />;
    ReactDOM.render(ret, document.getElementById("root"));
  };

  invalidResponse = response => {
    document.getElementById("lmsg").innerHTML =
      '<font color = "red"> Invalid Login! </font>';
    console.log(response);
  };

  responseFacebook = result => {
    if (result.error) {
      document.getElementById("lmsg").innerHTML =
        '<font color = "red"> Invalid Login! </font>';
      console.log(result.error.message);
    } else {
      this.setState({ isLoggedIn: true });
      var ret = <OrderForm loginType="facebook" />;
      ReactDOM.render(ret, document.getElementById("root"));
    }
  };

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
      var ret = <OrderForm loginType="normal" />;
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
        <center>OR Social Login </center>
        <br />
        <div className="form-group row">
          <div className="control-label col-sm-4"> </div>
          <GoogleLogin
            className="btn btn-primary"
            clientId="303007412789-p2igmujsav2hr59dp23r0dqhr9pvpivk.apps.googleusercontent.com"
            buttonText="google"
            onSuccess={this.validResponse}
            onFailure={this.invalidResponse}
            cookiePolicy={"single_host_origin"}
            autoLoad={false}
          />
          <pre> </pre>
          <FacebookLogin
            appId="2258971584140282"
            autoLoad={false}
            size="medium"
            textButton="facebook"
            fields="name,email,picture"
            callback={this.responseFacebook}
            data-auto-logout-link="true"
          />
        </div>
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
