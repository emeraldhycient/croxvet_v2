import React, { useState, useEffect } from "react";
import "../styles.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";
function Paymentmethod() {
  const [id, setid] = useState("");
  const [bitcoin, setbitcoin] = useState("");
  const [ethereum, setethereum] = useState("");
  const [usdt, setusdt] = useState("");

  const copyText = (e) => {
    let item = document.getElementById(e).value;
    if (navigator.clipboard.writeText(item)) {
      window.alert(`item copied : ${item}`);
    }
  };

  const paymentmethods = () => {
    axios
      .get("https://api.croxvest.com/api/admin/paymentmethods.php?all=all")
      .then((res) => {
        if (res.data.status === "success") {
          let data = res.data.data;
          setid(data.id);
          setbitcoin(data.bitcoin);
          setethereum(data.ethereum);
          setusdt(data.usdt);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("update", "update");
    formdata.append("id", id);
    formdata.append("bitcoin", bitcoin);
    formdata.append("ethereum", ethereum);
    formdata.append("usdt", usdt);

    axios({
      method: "POST",
      url: "https://api.croxvest.com/api/admin/paymentmethods.php",
      data: formdata,
    })
      .then((res) => {
        window.alert(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => window.alert(err.response.data.message));
    return false;
  };

  useEffect(() => {
    paymentmethods();
  }, []);

  return (
    <Layout Sidebar={Sidebar}>
      <div className="container">
        <div className="row">
          <div className="col-md-11 ml-auto mr-auto mt-4 mb-5 shadow bg-white pt-2">
            <h5 className="ml-2 text-dark">Payment methods</h5>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#cacaca",
              }}
            ></div>
            <form action="" className="form-group" onSubmit={handlesubmit}>
              <h6 className="text-center text-dark mt-3 ">
                Edit Settings to your taste
              </h6>
              <div className="row ml-md-5 mt-5">
                <div className="col-md-4">
                  <h6 className="text-muted">BitCoin</h6>
                  <small className="text-muted">
                    click copy to copy the value of the field
                  </small>
                </div>
                <div className="col-md-7">
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text bg-dark text-white"
                        id="basic-addon1"
                        onClick={() => copyText(`btc`)}
                      >
                        <i className="fa fa-copy mr-1 text-white"></i>copy
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="btc"
                      value={bitcoin}
                      onChange={(e) => setbitcoin(e.target.value)}
                      aria-label="btc wallet"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row ml-md-5 mt-5">
                <div className="col-md-4">
                  <h6 className="text-muted">Ethereum</h6>
                  <small className="text-muted">
                    click copy to copy the value of the field
                  </small>
                </div>
                <div className="col-md-7">
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text bg-dark text-white"
                        id="basic-addon1"
                        onClick={() => copyText(`eth`)}
                      >
                        <i className="fa fa-copy mr-1 text-white"></i>copy
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="eth"
                      value={ethereum}
                      onChange={(e) => setethereum(e.target.value)}
                      aria-label="eth wallet"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row ml-md-5 mt-5">
                <div className="col-md-4">
                  <h6 className="text-muted">usdt</h6>
                  <small className="text-muted">
                    click copy to copy the value of the field
                  </small>
                </div>
                <div className="col-md-7">
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text bg-dark text-white"
                        id="basic-addon1"
                        onClick={() => copyText(`ltc`)}
                      >
                        <i className="fa fa-copy mr-1 text-white"></i>copy
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="ltc"
                      value={usdt}
                      onChange={(e) => setusdt(e.target.value)}
                      aria-label="ltc wallet"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                className="btn btn-danger btn-sm  mt-5 mb-3 float-right"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Paymentmethod;
