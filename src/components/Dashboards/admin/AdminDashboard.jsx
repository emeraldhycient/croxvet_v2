import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import Sidebar from "./Sidebar";
import LineCharts from "../common/LineCharts";
import Piechart from "../common/Piechart";
import Layout from "../common/Layout";

function AdminDashboard() {
  const [totaldeposit, settotaldeposit] = useState("");
  const [totaluser, settotaluser] = useState("");

  const gettotalusers = () => {
    axios
      .get("https://api.croxvest.com/api/admin/totalusers.php")
      .then((res) => {
        //console.log(res);
        settotaluser(res.data.data.users);
      })
      .catch((err) => console.log(err));
  };

  const getdeposit = () => {
    axios
      .get("https://api.croxvest.com/api/admin/totaldeposits.php")
      .then((res) => {
        //console.log(res);
        settotaldeposit(res.data.data.amount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    gettotalusers();
    getdeposit();
  }, []);

  return (
    <Layout Sidebar={Sidebar}>
      <div className="container mt-5">
        <div className="row mb-5">
          <div
            className="col-md-5 mt-auto ml-auto mr-auto mb-4 border"
            id="box"
          >
            <div className=" pb-3">
              <h4 className="pl-1 text-light">Total Members</h4>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#ff5860",
                }}
              ></div>
              <h5 className="pl-3 mt-4 text-light">
                <i className="fa fa-user mr-1"></i>
                {totaluser ? totaluser : "00.00"}
              </h5>
            </div>
            <div id="iconholder" className=" w-25">
              <i className="fa fa-users fa-3x icon"></i>
            </div>
          </div>
          <div
            className="col-md-5 mt-auto ml-auto mr-auto mb-4 border "
            id="box"
          >
            <div className=" pb-3">
              <h4 className="pl-1 text-light">Total Deposit</h4>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#ff5860",
                }}
              ></div>
              <h5 className="pl-3 mt-4 text-light">
                <i className="fa fa-dollar mr-1"></i>
                {totaldeposit ? totaldeposit : "00.00"}
              </h5>
            </div>
            <div className=" w-25" id="iconholder">
              <i className="fa fa-puzzle-piece fa-3x icon"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-5 mb-5  mt-auto ml-auto mr-auto  border  d-flex justify-content-center align-items-center table-responsive">
            <LineCharts />
          </div>
          <div className="col-md-5 mb-5   mt-auto ml-auto mr-auto  border  d-flex justify-content-center align-items-center table-responsive">
            <Piechart />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
