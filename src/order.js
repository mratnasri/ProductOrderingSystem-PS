import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import FormElement from "./FormElement";
import SubmitButton from "./SubmitButton";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { GoogleLogout } from "react-google-login";
import LoginForm from "./LoginForm";
//import axios from "axios";

//let i = 1;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

window.fbAsyncInit = function() {
  window.FB.init({
    appId: "2258971584140282",
    cookie: true,
    xfbml: true,
    version: "v3.3"
  });

  window.FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function AddProduct(props) {
  return (
    <div className="form-group row">
      <div className="col-sm-4" />
      <select
        className="control-label col-sm-2"
        key={props.i.toString()}
        id={"ps" + props.i}
        name={"ps" + props.i}
        htmlFor={"pq" + props.i}
      >
        {props.remProducts.map(prod => (
          <option value={prod.product_id} key={prod.product_id + props.i}>
            {prod.product_name}
          </option>
          /*<option value={prod[1]} key={prod[1] + i}>
            {prod[0]}
          </option>*/
        ))}
      </select>
      <input
        className="form-control col-sm-1"
        type="number"
        placeholder="Quantity"
        id={"pq" + props.i}
        min="1"
        name={"pq" + props.i}
        required
      />
    </div>
  );
}

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    /* const urlProducts =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/product_search?q=clothes&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    fetch(proxyurl + urlProducts, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      }
    })
      .then(response => {
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoadedProds: true,
            hits: result.hits,
            count: result.count
          });
          return result.hits;
        },
        error => {
          this.setState({
            isLoadedProds: true,
            success: false
          });

          console.log(error);
        }
      )
      .then(hits => {
        let p = ["p1", "p2", "p3", "p4", "p5"];

        this.setState({
          chidren: [<AddProduct remProducts={hits} key={1} />]
        });
      });*/
    let p = [
      { product_id: 701643571277, product_name: "Sleeveless Cowl Neck Top" },
      { product_id: 701642853695, product_name: "Quilted Jacket" },
      {
        product_id: 701644336240,
        product_name: "Floral Black and White Dress"
      },
      { product_id: 701643408986, product_name: "Classic Jacket" },
      { product_id: 701642889243, product_name: "Belted Cardigan" },
      { product_id: 701643409006, product_name: "V-Neck Jacket" },
      { product_id: 701644388829, product_name: "Straight Leg Pant" },
      { product_id: 750518703299, product_name: "Black Flat Front Wool Suit" },
      { product_id: 883360511054, product_name: "Modern Blazer" },
      { product_id: 883360525419, product_name: "Slim Fit Pants" }
    ];

    let logoutButton = this.setLogout();

    this.state = {
      num: 1,
      isLoaded: false,
      customer_id: null,
      Authorization: null,
      loader: true,
      success: true,
      prodValid: false,
      billValid: false,
      shipValid: false,
      payValid: false,
      opnameValid: false,
      opcardValid: false,
      opmmValid: false,
      opyyValid: false,
      opcvvValid: false,
      activeKey: "products",
      logoutButton: logoutButton,
      count: 10,
      products: Array.from(p),

      chidren: [<AddProduct remProducts={p} key={1} i={1} />],

      obfname: null,
      oblname: null,
      obphone: null,
      obemail: null,
      obaddress: null,
      obcity: null,
      obstate: null,
      obcountry: null,
      obpin: null,

      osfname: null,
      oslname: null,
      osphone: null,
      osemail: null,
      osaddress: null,
      oscity: null,
      osstate: null,
      oscountry: null,
      ospin: null,

      opname: null,
      opcard: null,
      opmm: null,
      opyy: null,
      opcvv: null
    };
  }

  handleClick() {
    if (this.state.num < this.state.count) {
      let prods = Array.from(this.state.products);

      for (let j = 1; j < this.state.num; j++) {
        let p = document.getElementById("ps" + j).value;
        //console.log(p);
        //let idx = prods.indexOf(p);
        let idx = prods.findIndex(ele => ele.product_id == p);
        prods.splice(idx, 1);
      }

      /* let p = document.getElementById("ps" + (i - 1)).value;
      // let idx = prods.indexOf(p);
      let idx = prods.findIndex(ele => ele.product_id == p);
      // let idx = _.findIndex(prods, ele => ele[1] == p);
      prods.splice(idx, 1);*/

      this.setState({ num: this.state.num + 1 });
      this.state.chidren.push(
        <AddProduct
          remProducts={prods}
          key={this.state.num}
          i={this.state.num}
        />
      );
      //return(<addProduct remProducts={prods}/>)
      //return(this.AddProduct(prods));
      //this.render();
    }
  }

  addProdBasket = async j => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url3 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets/" +
      this.state.basket_id +
      "/items";
    //console.log(j);
    return fetch(proxyurl + url3, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        "If-Match": this.state.etag,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        product_id: document.getElementById("ps" + j).value,
        quantity: parseInt(document.getElementById("pq" + j).value, 10)
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded3: true
          });
          //console.log(j + ": " + this.state.etag);
        },
        error => {
          this.setState({
            isLoaded3: true,
            success: false
          });

          console.log(error);
        }
      );
  };

  prods = async () => {
    var result = await [this.addProdBasket(1)];
    let i = this.state.num;
    for (var j = 2; j < i; j++) {
      await result[j - 2];
      result[j - 1] = this.addProdBasket(j);
      //console.log(await result[j - 1]);
    }

    return result[j - 2];
  };

  submitHandler = async event => {
    event.preventDefault();
    this.setState({
      loader: false
    });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url3 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets/" +
      this.state.basket_id +
      "/items";
    const url4 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets/" +
      this.state.basket_id +
      "/shipments";
    const url5 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets/" +
      this.state.basket_id +
      "/shipments/me/shipping_method";
    const url6 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets/" +
      this.state.basket_id +
      "/billing_address";
    const url7 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets/" +
      this.state.basket_id +
      "/shipments/me/shipping_address";
    const url8 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets/" +
      this.state.basket_id +
      "/customer";
    const url9 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v17_6/baskets/" +
      this.state.basket_id +
      "/payment_instruments";
    const url10 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v17_6/orders";
    var res = await this.prods();

    await res;
    // console.log("start" + res);

    //console.log(this.state.etag);
    /*fetch(proxyurl + url4, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        "If-Match": this.state.etag,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        shipment_id: "me"
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded4: true
          });
        },
        error => {
          this.setState({
            isLoaded4: true,
            success:false
          });
          console.log(error);
        }
      )
      .then(() => {*/
    let res5 = fetch(proxyurl + url5, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        "If-Match": this.state.etag,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        id: "001"
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded2: true,
            basket_id: result.basket_id
          });
        },
        error => {
          this.setState({
            isLoaded2: true,
            success: false
          });

          console.log(error);
        }
      );
    // })
    await res5;
    let res6 = fetch(proxyurl + url6, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        first_name: this.state.obfname,

        last_name: this.state.oblname,

        city: this.state.obcity,

        country_code: this.state.obcountry,

        c_strValue: "",

        address1: this.state.obaddress,

        address2: "",

        state_code: this.state.obstate,

        postal_code: this.state.obpin,

        phone: this.state.obphone
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded6: true
          });
        },
        error => {
          this.setState({
            isLoaded6: true,
            success: false
          });

          console.log(error);
        }
      );
    await res6;
    let res7 = fetch(proxyurl + url7, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        first_name: this.state.osfname,

        last_name: this.state.oslname,

        city: this.state.oscity,

        country_code: this.state.oscountry,

        c_strValue: "",

        address1: this.state.osaddress,

        address2: "",

        state_code: this.state.osstate,

        postal_code: this.state.ospin,

        phone: this.state.osphone
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded7: true
          });
        },
        error => {
          this.setState({
            isLoaded7: true,
            success: false
          });

          console.log(error);
        }
      );
    await res7;
    let res8 = fetch(proxyurl + url8, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        customer_name: this.state.obfname + " " + this.state.oblname,

        customer_id: this.state.customer_id,

        email: this.state.obemail
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded8: true
          });
        },
        error => {
          this.setState({
            isLoaded8: true,
            success: false
          });

          console.log(error);
        }
      );
    await res8;
    let res9 = fetch(proxyurl + url9, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        payment_card: {
          credit_card_token: this.state.opcard,
          security_code: this.state.opcvv,

          holder: this.state.opname,

          card_type: "Visa",

          expiration_month: parseInt(this.state.opmm),

          expiration_year: parseInt(this.state.opyy)
        },

        payment_method_id: "CREDIT_CARD",

        c_strValue: "any custom value"
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded9: true
          });
        },
        error => {
          this.setState({
            isLoaded9: true,
            success: false
          });

          console.log(error);
        }
      );
    await res9;
    let res10 = fetch(proxyurl + url10, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.Authorization,
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        basket_id: this.state.basket_id
      })
    })
      .then(response => {
        this.setState({
          etag: response.headers.get("etag")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded10: true,
            OrderNo: result.order_no
          });
        },
        error => {
          this.setState({
            isLoaded10: true,
            success: false
          });

          console.log(error);
        }
      );
    await res10;
    var ret;
    if (this.state.success) {
      ret = (
        <React.Fragment>
          <br />
          <h1 align="center">
            <font color="green"> Order Placed Succesfully! </font>
          </h1>
          <br />
          <div className="form-group row">
            <div className="control-label col-sm-4"> </div>
            <div className="col-sm-4 ">
              Order Number is {this.state.OrderNo}
            </div>
          </div>
          <center>
            <button className="btn btn-primary" onClick={this.home}>
              Home
            </button>
          </center>
        </React.Fragment>
      );
    } else {
      ret = (
        <React.Fragment>
          <br />
          <h1 align="center">
            <font color="red"> Sorry order could not be Placed! </font>
          </h1>
          <br />
          <div className="form-group row">
            <div className="control-label col-sm-4"> </div>
            <div className="col-sm-4 ">Please try again later</div>
          </div>
          <center>
            <button className="btn btn-primary" onClick={this.home}>
              Home
            </button>
          </center>
        </React.Fragment>
      );
    }
    ReactDOM.render(ret, document.getElementById("root"));
  };

  logout = () => {
    if (this.props.loginType == "facebook") window.FB.logout();
    ReactDOM.render(<LoginForm />, document.getElementById("root"));
  };

  componentDidMount() {
    const url1 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/customers/auth?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const url2 =
      "https://sapient3-evaluation-dw.demandware.net/s/Sites-SiteGenesis-Site/dw/shop/v16_6/baskets";
    fetch(proxyurl + url1, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://example.com:3000",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, accept, authorization, preflight, Content-Type",
        "Access-Control-Expose-Headers": "client_id"
      },
      body: JSON.stringify({
        type: "guest"
      })
    })
      .then(response => {
        this.setState({
          Authorization: response.headers.get("Authorization")
        });
        if (response.status != 200) {
          this.setState({ success: false });
        }
        return response.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded: true,
            customer_id: result.customer_id
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            success: false
          });

          console.log(error);
        }
      )

      .then(() => {
        fetch(proxyurl + url2, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.Authorization,
            Accept: "application/json",
            "Access-Control-Allow-Methods":
              "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://example.com:3000",
            "Access-Control-Allow-Headers":
              "origin, x-requested-with, accept, authorization, preflight, Content-Type",
            "Access-Control-Expose-Headers": "client_id"
          }
        })
          .then(response => {
            this.setState({
              etag: response.headers.get("etag")
            });
            if (response.status != 200) {
              this.setState({ success: false });
            }
            return response.json();
          })
          .then(
            result => {
              this.setState({
                isLoaded2: true,
                basket_id: result.basket_id
              });
            },
            error => {
              this.setState({
                isLoaded2: true,
                success: false
              });

              console.log(error);
            }
          );
      });

    /*
    var request = new XMLHttpRequest();
    var data = { type: "guest" };
    request.open("POST", proxyurl + url, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(data);*/
    /*
    axios
      .post(proxyurl + url, {
        type: "guest"
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });*/

    //console.log(this.state.Authorization);
  }

  home = () => {
    let ret = <OrderForm />;
    ReactDOM.render(ret, document.getElementById("root"));
  };

  myChangeHandler = event => {
    let nam = event.target.id;
    let val = event.target.value;
    this.setState({ [nam]: val });
    let { status, errmsg } = this.validateField(nam, val);
    let node = React.createElement("font", { color: "red" }, errmsg);
    if (status) {
      document.getElementById(nam).style.borderColor = "#ced4da";
    } else {
      document.getElementById(nam).style.borderColor = "red";
    }
    ReactDOM.render(node, document.getElementById(nam + "err"));
  };

  changeTab = val => {
    this.setState({ activeKey: val });
    // this.render();
  };

  setShippingAddress = event => {
    if (event.target.checked) {
      this.setState({
        obos: true,
        osfname: this.state.obfname,
        oslname: this.state.oblname,
        osphone: this.state.obphone,
        osemail: this.state.obemail,
        osaddress: this.state.obaddress,
        oscity: this.state.obcity,
        osstate: this.state.obstate,
        oscountry: this.state.obcountry,
        ospin: this.state.obpin
      });
    } else {
      this.setState({
        obos: false,
        osfname: null,
        oslname: null,
        osphone: null,
        osemail: null,
        osaddress: null,
        oscity: null,
        osstate: null,
        oscountry: null,
        ospin: null
      });
    }
  };

  /* static getDerivedStateFromProps(props, state) {
    var type = props.loginType;
    var logoutButton;
    if (type === "normal") {
      logoutButton = <button type="button" onClick={this.logout} />;
    } else if (type === "google") {
      logoutButton = (
        <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
      );
    }
    return { logoutButton: logoutButton };
  }*/
  setLogout = () => {
    var type = this.props.loginType;
    var logoutButton;
    if (type === "normal") {
      logoutButton = (
        <button type="button" className="btn btn-primary" onClick={this.logout}>
          Logout
        </button>
      );
    } else if (type === "google") {
      logoutButton = (
        <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
      );
    } else if (type === "facebook") {
      logoutButton = (
        <button type="button" className="btn btn-primary" onClick={this.logout}>
          Logout
        </button>
      );
    }
    return logoutButton;
  };

  submitTab = event => {
    event.preventDefault();
    let s = this.state;
    if (event.target.id == "prodForm") {
      this.setState({ prodValid: true });
      this.changeTab("billing");
    } else if (event.target.id == "billForm") {
      if (
        s.obfnameValid &&
        s.oblnameValid &&
        s.obphoneValid &&
        s.obemailValid &&
        s.obaddressValid &&
        s.obcityValid &&
        s.obstateValid &&
        s.obcountryValid &&
        s.obpinValid
      ) {
        this.setState({ billValid: true });
        this.changeTab("shipping");
      }
    } else if (event.target.id == "shipForm") {
      if (
        (s.osfnameValid &&
          s.oslnameValid &&
          s.osphoneValid &&
          s.osemailValid &&
          s.osaddressValid &&
          s.oscityValid &&
          s.osstateValid &&
          s.oscountryValid &&
          s.ospinValid) ||
        s.obos
      ) {
        this.setState({ shipValid: true });
        this.changeTab("payment");
      }
    }
  };

  validateField = (nam, val) => {
    var alphaExp = /^[a-z A-Z]+$/;
    var emailExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let name = nam + "Valid";
    let value = true;
    let status = true;
    let errmsg = null;
    if (nam.includes("name")) {
      value = alphaExp.test(val.trim());
      status = value;
      if (!status) errmsg = "Please enter a valid name";
      else errmsg = null;
    } else if (nam.includes("phone")) {
      value = !isNaN(val) && val.length == 10;
      status = value;
      if (!status) errmsg = "Please enter a valid 10 digit phone no.";
      else errmsg = null;
    } else if (nam.includes("email")) {
      value = emailExp.test(val);
      status = value;
      if (!status) errmsg = "Please enter a valid email id";
      else errmsg = null;
    } else if (nam.includes("address")) {
      value = val.trim().length > 0;
      status = value;
      if (!status) errmsg = "Address is required";
      else errmsg = null;
    } else if (nam.includes("city")) {
      value = alphaExp.test(val.trim());
      status = value;
      if (!status) errmsg = "Please enter a valid city";
      else errmsg = null;
    } else if (nam.includes("state")) {
      value = alphaExp.test(val.trim());
      status = value;
      if (!status) errmsg = "Please enter a valid state";
      else errmsg = null;
    } else if (nam.includes("country")) {
      value = alphaExp.test(val.trim());
      status = value;
      if (!status) errmsg = "Please enter a valid country";
      else errmsg = null;
    } else if (nam.includes("pin")) {
      value = !isNaN(val) && val.trim().length == 6;
      status = value;
      if (!status) errmsg = "Please enter a valid 6 digit pin code";
      else errmsg = null;
    } else if (nam.includes("card")) {
      value = !isNaN(val) && val.length == 16;
      status = value;
      if (!status) errmsg = "Please enter a valid 16 digit card number";
      else errmsg = null;
    } else if (nam.includes("opmm")) {
      value = !isNaN(val) && val >= 1 && val <= 12;
      status = value;
      if (!status) errmsg = "Please enter a valid month (1 to 12)";
      else errmsg = null;
    } else if (nam.includes("opyy")) {
      value = !isNaN(val) && val.length == 4;
      status = value;
      if (!status) errmsg = "Please enter a valid year (YYYY)";
      else errmsg = null;
    } else if (nam.includes("opcvv")) {
      value = !isNaN(val) && val.length == 3;
      status = value;
      if (!status) errmsg = "Please enter a valid 3 digit CVV";
      else errmsg = null;
    }
    this.setState({ [name]: value });
    return { status, errmsg };
  };

  render() {
    var Loader = require("react-loader");
    return (
      <React.Fragment>
        <div className="form-group row">
          <div className="col-sm-10">
            <Tabs
              activeKey={this.state.activeKey}
              id="orderTabs"
              className="col-sm-10"
              onSelect={key => this.setState({ activeKey: key })}
            >
              <Tab eventKey="products" title="Products">
                <br />
                <form
                  id="prodForm"
                  className="form-horizontal"
                  onSubmit={this.submitTab}
                >
                  <div className="form-group row">
                    <div className="control-label col-sm-4"> </div>
                    <label className="control-label col-sm-4">
                      <b>Add Products</b>
                    </label>
                  </div>

                  <div id="prodDiv">{this.state.chidren}</div>
                  <div className="form-group row">
                    <div className="control-label col-sm-4"> </div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => this.handleClick()}
                    >
                      Add Item
                    </button>
                  </div>
                  <SubmitButton id="pSubmit" value="Save and Continue" />
                </form>
              </Tab>
              <Tab eventKey="billing" title="Billing Address">
                <br />
                <form
                  id="billForm"
                  className="form-horizontal"
                  onSubmit={this.submitTab}
                >
                  <div className="form-group row">
                    <div className="control-label col-sm-4"> </div>
                    <label className="control-label col-sm-4">
                      <b>Billing Address</b>
                    </label>
                  </div>
                  <FormElement
                    label="First Name"
                    type="text"
                    id="obfname"
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Last Name"
                    type="text"
                    id="oblname"
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Phone No."
                    type="text"
                    id="obphone"
                    maxLength="10"
                    minLength="10"
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Email Id"
                    type="email"
                    id="obemail"
                    onChange={this.myChangeHandler}
                  />
                  <div className="form-group row">
                    <label
                      className="control-label col-sm-4"
                      align="right"
                      htmlFor="obaddress"
                    >
                      Address :
                    </label>
                    <textarea
                      className="form-control col-sm-4"
                      id="obaddress"
                      placeholder="House no., street, locality"
                      required
                      onChange={this.myChangeHandler}
                    />
                    <div id="obaddresserr" style={{ padding: 2 }} />
                  </div>
                  <FormElement
                    label="City"
                    type="text"
                    id="obcity"
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="State"
                    type="text"
                    id="obstate"
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Country"
                    type="text"
                    id="obcountry"
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Pin Code"
                    type="text"
                    id="obpin"
                    maxLength="6"
                    minLength="6"
                    onChange={this.myChangeHandler}
                  />
                  <SubmitButton id="bSubmit" value="Save and Continue" />
                </form>
              </Tab>
              <Tab eventKey="shipping" title="Shipping Address">
                <br />
                <form
                  id="shipForm"
                  className="form-horizontal"
                  onSubmit={this.submitTab}
                >
                  <div className="form-group row">
                    <div className="control-label col-sm-4"> </div>
                    <label className="control-label col-sm-4">
                      <b>Shipping Address</b>
                    </label>
                  </div>
                  <div className="form-group row">
                    <div className="control-label col-sm-4"> </div>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          id="obos"
                          onChange={this.setShippingAddress}
                        />
                        Same as billing address
                      </label>
                    </div>
                  </div>
                  <FormElement
                    label="First Name"
                    type="text"
                    id="osfname"
                    value={this.state.osfname}
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Last Name"
                    type="text"
                    id="oslname"
                    value={this.state.oslname}
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Phone No."
                    type="text"
                    id="osphone"
                    maxLength="10"
                    minLength="10"
                    value={this.state.osphone}
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Email Id"
                    type="email"
                    id="osemail"
                    value={this.state.osemail}
                    onChange={this.myChangeHandler}
                  />
                  <div className="form-group row">
                    <label
                      className="control-label col-sm-4"
                      align="right"
                      htmlFor="osaddress"
                    >
                      Address :
                    </label>
                    <textarea
                      className="form-control col-sm-4"
                      id="osaddress"
                      placeholder="House no., street, locality"
                      required
                      value={this.state.osaddress ? this.state.osaddress : ""}
                      onChange={this.myChangeHandler}
                    />
                    <div id="osaddresserr" style={{ padding: 2 }} />
                  </div>
                  <FormElement
                    label="City"
                    type="text"
                    id="oscity"
                    value={this.state.oscity}
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="State"
                    type="text"
                    id="osstate"
                    value={this.state.osstate}
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Country"
                    type="text"
                    id="oscountry"
                    value={this.state.oscountry}
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Pin Code"
                    type="text"
                    id="ospin"
                    maxLength="6"
                    minLength="6"
                    value={this.state.ospin}
                    onChange={this.myChangeHandler}
                  />
                  <SubmitButton id="sSubmit" value="Save and Continue" />
                </form>
              </Tab>
              <Tab eventKey="payment" title="Payment">
                <br />
                <form
                  id="payForm"
                  className="form-horizontal"
                  onSubmit={this.submitHandler}
                >
                  <div className="form-group row">
                    <div className="control-label col-sm-4"> </div>
                    <label className="control-label col-sm-4">
                      <b>Payment</b>
                      <br />
                      Enter Card Details:
                    </label>
                  </div>

                  <FormElement
                    label="Name"
                    type="text"
                    id="opname"
                    onChange={this.myChangeHandler}
                  />
                  <FormElement
                    label="Card Number"
                    type="text"
                    id="opcard"
                    maxLength="16"
                    minLength="16"
                    onChange={this.myChangeHandler}
                  />
                  <div className="form-group row">
                    <div className="col-sm-4" />
                    <input
                      className="form-control col-sm-1"
                      type="text"
                      placeholder="MM"
                      id="opmm"
                      min="1"
                      max="12"
                      maxLength="2"
                      minLength="1"
                      required
                      onChange={this.myChangeHandler}
                    />
                    <input
                      className="form-control col-sm-1"
                      type="text"
                      placeholder="YYYY"
                      id="opyy"
                      minLength="4"
                      maxLength="4"
                      required
                      onChange={this.myChangeHandler}
                    />
                    <div className="col-sm-1" />
                    <input
                      className="form-control col-sm-1"
                      type="password"
                      placeholder="CVV"
                      id="opcvv"
                      minLength="3"
                      maxLength="3"
                      required
                      onChange={this.myChangeHandler}
                    />
                    <div id="opmmerr" style={{ padding: 2 }} />
                    <div id="opyyerr" style={{ padding: 2 }} />
                    <div id="opcvverr" style={{ padding: 2 }} />
                  </div>

                  <Loader loaded={this.state.loader} className="spinner">
                    <SubmitButton
                      id="osubmit"
                      value="Order"
                      disabled={
                        !(
                          this.state.prodValid &&
                          this.state.billValid &&
                          this.state.shipValid &&
                          this.state.opnameValid &&
                          this.state.opcardValid &&
                          this.state.opmmValid &&
                          this.state.opyyValid &&
                          this.state.opcvvValid
                        )
                      }
                    />
                  </Loader>
                </form>
              </Tab>
            </Tabs>
          </div>

          <div className="col-sm-2">{this.state.logoutButton}</div>
        </div>
      </React.Fragment>
    );
  }
}

/*var ret = <OrderForm/>


ReactDOM.render( ret, document.getElementById('root'));*/
