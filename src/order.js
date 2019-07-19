import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import FormElement from "./FormElement";
import SubmitButton from "./SubmitButton";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
//import axios from "axios";

//let i = 1;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

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

    this.state = {
      num: 1,
      isLoaded: false,
      customer_id: null,
      Authorization: null,
      loader: true,
      success: true,
      activeKey: "products",
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
    //let pre = nam.slice(0, 2);
    this.setState({ [nam]: val });

    //console.log(nam + ": " + val);
  };

  changeTab = val => {
    this.setState({ activeKey: val });
    // this.render();
  };

  setShippingAddress = event => {
    if (event.target.checked) {
      this.setState({
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

  render() {
    //console.log("Authorization:" + this.state.Authorization);
    //console.log(this.state.hits);
    /*for(var r=0; r < this.state.num ; r+=1)
		    {chidren.push(<AddProduct remProducts = {this.state.products}/>);}*/
    //console.log(chidren);
    //console.log("in render");
    var Loader = require("react-loader");
    return (
      <React.Fragment>
        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <Tabs
            activeKey={this.state.activeKey}
            id="orderTabs"
            onSelect={key => this.setState({ activeKey: key })}
          >
            <Tab eventKey="products" title="Products">
              <br />
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
              <div className="form-group row">
                <div className="control-label col-sm-4"> </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.changeTab("billing")}
                >
                  Next
                </button>
              </div>
            </Tab>
            <Tab eventKey="billing" title="Billing Address">
              <br />
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
                type="number"
                id="obphone"
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
                  onChange={this.myChangeHandler}
                />
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
                type="number"
                id="obpin"
                onChange={this.myChangeHandler}
              />
              <div className="form-group row">
                <div className="control-label col-sm-4"> </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.changeTab("shipping")}
                >
                  Next
                </button>
              </div>
            </Tab>
            <Tab eventKey="shipping" title="Shipping Address">
              <br />
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
                type="number"
                id="osphone"
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
                  value={this.state.osaddress ? this.state.osaddress : ""}
                  onChange={this.myChangeHandler}
                />
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
                type="number"
                id="ospin"
                value={this.state.ospin}
                onChange={this.myChangeHandler}
              />
              <div className="form-group row">
                <div className="control-label col-sm-4"> </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.changeTab("payment")}
                >
                  Next
                </button>
              </div>
            </Tab>
            <Tab eventKey="payment" title="Payment">
              <br />
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
                type="number"
                id="opcard"
                onChange={this.myChangeHandler}
              />
              <div className="form-group row">
                <div className="col-sm-4" />
                <input
                  className="form-control col-sm-1"
                  type="number"
                  placeholder="MM"
                  id="opmm"
                  required
                  maxLength="2"
                  minLength="2"
                  onChange={this.myChangeHandler}
                />
                <input
                  className="form-control col-sm-1"
                  type="number"
                  placeholder="YYYY"
                  id="opyy"
                  required
                  maxLength="4"
                  minLength="4"
                  onChange={this.myChangeHandler}
                />
                <div className="col-sm-1" />
                <input
                  className="form-control col-sm-1"
                  type="number"
                  placeholder="CVV"
                  id="opcvv"
                  required
                  maxLength="3"
                  minLength="3"
                  onChange={this.myChangeHandler}
                />
              </div>

              <Loader loaded={this.state.loader} className="spinner">
                <SubmitButton id="osubmit" value="Order" />
              </Loader>
            </Tab>
          </Tabs>
        </form>
      </React.Fragment>
    );
  }
}

/*var ret = <OrderForm/>


ReactDOM.render( ret, document.getElementById('root'));*/
