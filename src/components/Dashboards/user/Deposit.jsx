import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../styles.css";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";
/*import btc from "../../images/btc.jpeg";
import ethereum from "../../images/ethereum.jpeg";
import usdt from "../../images/usdt.jpeg";*/
import logo from "../../../images/crox/croxvest-nobg.png"

function Deposit() {
  const { currency } = useParams();

  const [amount, setamount] = useState("");

  const [paymentproof, setpaymentproof] = useState("");
  const [paymentmethods, setpaymentmethods] = useState("");

  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const changeBanner = () => {
    if (currency === "btc") {
      return (
        <img
          src={logo}
          alt=""
          className="img-fluid"
          style={{ height: "250px", width: "100%" }}
        />
      );
    } else if (currency === "ethereum") {
      return (
        <img
          src={logo}
          alt=""
          className="img-fluid"
          style={{ height: "250px", width: "100%" }}
        />
      );
    } else {
      return (
        <img
          src={logo}
          alt=""
          className="img-fluid"
          style={{ height: "250px", width: "100%" }}
        />
      );
    }
  };

  const changeWallet = () => {
    if (currency === "btc") {
      return (
        <div className="">
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <span
                className="input-group-text bg-dark text-white"
                id="basic-addon1"
                onClick={() => copyText(`btc`)}
              >
                <i className="fa fa-copy mr-1 icon"></i>copy
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="btc"
              value={paymentmethods.bitcoin}
              aria-label="btc wallet"
              aria-describedby="basic-addon1"
              required
            />
          </div>
        </div>
      );
    } else if (currency === "ethereum") {
      return (
        <div className="">
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <span
                className="input-group-text bg-dark text-white"
                id="basic-addon1"
                onClick={() => copyText(`eth`)}
              >
                <i className="fa fa-copy mr-1 icon"></i>copy
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="eth"
              value={paymentmethods.ethereum}
              aria-label="eth wallet"
              aria-describedby="basic-addon1"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <span
                className="input-group-text bg-dark text-white"
                id="basic-addon1"
                onClick={() => copyText(`usdt`)}
              >
                <i className="fa fa-copy mr-1 icon"></i>copy
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="usdt"
              value={paymentmethods.usdt}
              aria-label="usdt address"
              aria-describedby="basic-addon1"
              required
            />
          </div>
        </div>
      );
    }
  };

  const copyText = (e) => {
    let item = document.getElementById(e).value;
    if (navigator.clipboard.writeText(item)) {
      window.alert(`item copied : ${item}`);
    }
  };

  useEffect(() => {
    axios
      .get("https://api.croxvest.com/api/user/paymentmethods.php")
      .then((res) => {
        //console.log(res);
        setpaymentmethods(res.data.data);
      })
      .catch((err) => {});
  }, [currency]);

  const deposit = (e) => {
    e.preventDefault();

    toggleloading();

    const formdata = new FormData();
    formdata.append("userid", sessionStorage.getItem("userid"));
    formdata.append("amount", amount);
    formdata.append("currency", currency);

    axios({
      method: "POST",
      url: "https://api.croxvest.com/api/user/depositrequest.php",
      data: formdata,
    })
      .then((res) => {
        window.alert(res.data.message);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      })
      .finally((e) => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });

    return false;
  };

  return (
    <Layout Sidebar={Sidebar}>
      <div className="container">
        <div className="py-2">
          <h2 className="text-light">Deposit</h2>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-md-10">
            <div className="box shadow p-2">
              <h5 className="ml-2 text-light">Pick Currency</h5>
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a
                    class={
                      currency === "btc"
                        ? "nav-link text-warning d-flex active"
                        : "nav-link text-warning d-flex "
                    }
                    aria-current="page"
                    href="/user/dashboard/deposit/btc"
                  >
                    <img
                      src="https://cryptospot.biz/img/coins/btcis.png"
                      alt=""
                      className="partner__img mr-2"
                      style={{ maxWidth: "20px" }}
                    />
                    BITCOIN
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class={
                      currency === "ethereum"
                        ? "nav-link text-info d-flex active"
                        : "nav-link text-info d-flex "
                    }
                    href="/user/dashboard/deposit/ethereum"
                  >
                    <img
                      src="https://cryptospot.biz/img/coins/ethis.png"
                      alt=""
                      className="partner__img mr-2"
                      style={{ maxWidth: "20px" }}
                    />{" "}
                    ETHEREUM
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class={
                      currency === "usdt"
                        ? "nav-link text-success d-flex active"
                        : "nav-link text-success d-flex "
                    }
                    href="/user/dashboard/deposit/usdt"
                  >
                    <img
                      src="https://cryptospot.biz/img/coins/usdtis.png"
                      alt=""
                      className="partner__img mr-2"
                      style={{ maxWidth: "20px" }}
                    />
                    USDT Tether
                  </a>
                  </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="box2 shadow p-1">
              {changeBanner()}
              <br />
              {changeWallet()}
            </div>
          </div>
          <div className="col-md-6">
            <div className="box2 shadow pt-5">
              <form
                action=""
                className="form-group"
                onSubmit={deposit}
                encType="multipart/form-data"
              >
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-dark text-white"
                      id="basic-addon1"
                    >
                      <i className="fa fa-money fa-2x mr-1 icon"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    id="usdt"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                    aria-label="usdt address"
                    aria-describedby="basic-addon1"
                    placeholder="Enter Deposit Amount"
                    required
                  />
                </div>
                <label htmlFor="" className="text-light">
                  After payment send your payment proof to our support email
                  <a href="mailto:contact@croxvest.com" className="ml-2">
                     contact@croxvest.com
                  </a>
                </label>
                <br />
                {isloading ? (
                  <button
                    className="btn btn-success btn-sm  mt-5 mb-3 float-right"
                    type="submit"
                  >
                    sending request ..
                  </button>
                ) : (
                  <button
                    className="btn btn-danger text-light btn-sm  mt-5 mb-3 float-right"
                    type="submit"
                  >
                    Deposit
                  </button>
                )}{" "}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Deposit;
