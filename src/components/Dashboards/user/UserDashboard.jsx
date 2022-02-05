import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";
import Charts from "../common/Charts";

function UserDashboard() {
  const [user, setuser] = useState(sessionStorage.getItem("userid"));
  const [userdetails, setuserdetails] = useState("");

  const [pendingamount, setpendingamount] = useState(0);

  const fetchdetails = () => {
    let formdata = new FormData();
    formdata.append("userid", user);
    formdata.append("hash", sessionStorage.getItem("hash"));
    axios({
      method: "POST",
      url: " https://api.croxvest.com/api/user/userdetails.php",
      data: formdata,
    })
      .then((res) => {
        setuserdetails(res.data.data.user);
      })
      .catch((err) => console.log(err));
  };

  const pending = () => {
    axios
      .get(
        `https://api.croxvest.com/api/user/pendingDeposit.php?userid=${user}`
      )
      .then((res) => {
        if (res.data.status === "success") {
          setpendingamount(res.data.data.amount);
        }
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchdetails();
    pending();
  }, []);

  return (
    <Layout Sidebar={Sidebar}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-2">
          <h2 className="text-light">Dashboard</h2>
          <button className="btn btn-danger" style={{ color: "#fafafa" }}>
            <a href="/user/dashboard/deposit/btc" className="text-light">
              MAKE DEPOSIT
            </a>
          </button>
        </div>

        <hr />
        <div className="row mt-4">
          <div className="col-md-3 mb-3">
            <div className="box shadow p-2">
              <h5 className="pl-1 text-light">Account balance</h5>
              <h5 className="pl-3 mt-4 text-light">
                <i className="fa fa-dollar icon"></i>{" "}
                {userdetails.accountbalance
                  ? userdetails.accountbalance
                  : "00.00"}
              </h5>
            </div>
          </div>
          {pendingamount ? (
            <div className="col-md-3 mb-3">
              <div className="box shadow p-2">
                <h5 className="pl-1 text-light">pending Deposit</h5>
                <h5 className="pl-3 mt-4 text-light">
                  <i className="fa fa-dollar icon mr-2"></i>
                  {pendingamount}
                </h5>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="col-md-3 mb-3">
            <div className="box shadow p-2">
              <h5 className="pl-1 text-light">Total Earned</h5>
              <h5 className="pl-3 mt-4 text-light">
                <i className="fa fa-dollar icon"></i>{" "}
                {userdetails.earning ? userdetails.earning : "00.00"}
              </h5>
            </div>
          </div>
          <div
            className={pendingamount ? "col-md-6 mb-3 mt-3" : "col-md-6 mb-3 "}
          >
            <div className="box shadow">
              <h6 className="text-primary mb-2 ml-2">
                Registered on : {userdetails.createdAt}
              </h6>
              <h6 className="text-light mb-5 ml-2 ">
                referral link
                <div className=" card text-light ml-2 bg-info p-2 rounded">
                  https://croxvest.com/signup/{userdetails.email}
                </div>
              </h6>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="box2 p-3 shadow">
            <Charts />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserDashboard;
