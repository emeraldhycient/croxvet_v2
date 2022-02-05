import React, { useState } from "react";
import { useAtom } from "jotai";
import { useRouteMatch, useParams } from "react-router-dom";
import axios from "axios";
import "../styles.css";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";

function Withdrawal() {
  const match = useRouteMatch();

  const { currency } = useParams();

  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const [wallet, setwallet] = useState("");
  const [amount, setamount] = useState("");

  const Withdraw = (e) => {
    e.preventDefault();

    toggleloading();

    const formdata = new FormData();
    formdata.append("userid", sessionStorage.getItem("userid"));
    formdata.append("wallet", wallet);
    formdata.append("amount", amount);
    formdata.append("currency", currency);

    axios({
      method: "POST",
      url: "https://api.croxvest.com/api/user/withdrawal.php",
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
    <>
      <Layout Sidebar={Sidebar}>
        <h6 className="text-muted ml-5 ">
          <i className="fa fa-compass"></i> {match.path}
        </h6>
        <div className="container mt-3">
          <div className="row">
            <div
              className="col-md-7 ml-auto mr-auto mt-4 mb-5 shadow  pt-2"
              style={{
                backgroundColor: "#28282d",
                borderTop: " 2px solid #ff5860 ",
              }}
            >
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
                    href="/user/dashboard/withdrawal/btc"
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
                    href="/user/dashboard/withdrawal/ethereum"
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
                    href="/user/dashboard/withdrawal/usdt"
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
              <form action="" className="form-group" onSubmit={Withdraw}>
                <div className="row ml-md-5 mt-5">
                  <div className="col-md-4">
                    <h6 className="text-muted"> wallet address</h6>
                    <p className="text-muted"> wallet address</p>
                  </div>
                  <div className="col-md-7">
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-dark"
                          id="basic-addon1"
                        >
                          <i className="fa fa-university fa-2x icon"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setwallet(e.target.value)}
                        value={wallet}
                        placeholder="Enter wallet address"
                        aria-label="Bank Name"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row ml-md-5 mt-2">
                  <div className="col-md-4">
                    <h6 className="text-muted">Amount </h6>
                    <p className="text-muted">minimum amount withdrawable: 0</p>
                  </div>
                  <div className="col-md-7">
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-dark"
                          id="basic-addon1"
                        >
                          <i className="fa fa-dollar fa-2x icon"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setamount(e.target.value)}
                        value={amount}
                        placeholder="Amount to Withdraw"
                        aria-label="amount"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                </div>
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
                    Withdraw Now
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Withdrawal;
