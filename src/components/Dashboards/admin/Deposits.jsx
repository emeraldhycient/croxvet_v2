import React, { useState, useEffect } from "react";
import "../styles.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";

function Deposits() {
  const [deposits, setdeposits] = useState("");
  const [unprocessed, setunprocessed] = useState("");

  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const processWithdrawal = (i, amount) => {
    let formdata = new FormData();
    formdata.append("update", "update");
    formdata.append("userid", i);
    formdata.append("amount", amount);
    formdata.append("status", "processed");
    axios({
      method: "POST",
      url: "  https://api.croxvest.com/api/admin/deposits.php",
      data: formdata,
    })
      .then((res) => {
        window.alert(res.data.message);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  const deletedeposit = (id) => {
    axios
      .get(`https://api.croxvest.com/api/admin/deletedeposit.php?id=${id}`)
      .then((res) => {
        window.alert(res.data.message);
      })
      .catch((err) => window.alert(err.response.data.message));
  };

  useEffect(() => {
    axios
      .get("https://api.croxvest.com/api/admin/deposits.php?all=all")
      .then((res) => {
        let mod = Object.values(res.data.data.deposit);
        setdeposits(mod);
      })
      .catch((err) => window.alert(err.response.data.message));

    axios
      .get("https://api.croxvest.com/api/admin/deposits.php?unprocessed=all")
      .then((res) => {
        let mod = Object.values(res.data.data.deposit);
        setunprocessed(mod);
      })
      .catch((err) => window.alert(err.response.data.message));
  }, []);

  return (
    <Layout Sidebar={Sidebar}>
      <div className="container">
        <div className="row">
          <div className="col-md-11 ml-auto mr-auto mt-4 mb-5 shadow bg-white pt-2">
            <h5 className="ml-2 text-dark">deposit Request</h5>
            <div
              style={{
                width: "100%",
                height: "1px",
              }}
            ></div>
            <div className="table-responsive mt-3">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th className="text-dark">userid</th>
                    <th className="text-dark">amount</th>
                    <th className="text-dark">currency</th>
                    <th className="text-dark">date</th>
                    <th className="text-dark">action</th>
                  </tr>

                  {unprocessed ? (
                    unprocessed.map((deposit, i) => (
                      <tr key={i}>
                        <td>
                          <h5 className="mb-0 text-dark">{deposit.userid}</h5>
                        </td>
                        <td>
                          <i className="fa fa-dollar mr-1"></i>
                          {deposit.amount}
                        </td>
                        <td>{deposit.currency}</td>
                        <td>{deposit.createdAt}</td>
                        <td>
                          <span
                            className="btn btn-primary text-light"
                            onClick={(e) =>
                              processWithdrawal(deposit.userid, deposit.amount)
                            }
                          >
                            Process
                          </span>
                          <span
                            className="btn btn-danger text-light"
                            onClick={(e) => deletedeposit(deposit.id)}
                          >
                            delete
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>no data to be displayed</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-11 ml-auto mr-auto mt-4 mb-5 shadow bg-white pt-2">
            <h5 className="ml-2 text-dark">Deposit History</h5>
            <div
              style={{
                width: "100%",
                height: "1px",
              }}
            ></div>
            <div className="table-responsive mt-3">
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <th className="text-dark">userid</th>
                    <th className="text-dark">amount</th>
                    <th className="text-dark">currency</th>
                    <th className="text-dark">status</th>
                    <th className="text-dark">date</th>
                  </tr>
                  {deposits ? (
                    deposits.map((deposit, i) => (
                      <tr key={i}>
                        <td>
                          <h5 className="mb-0 text-dark">{deposit.userid}</h5>
                        </td>
                        <td>
                          <i className="fa fa-dollar mr-1"></i>
                          {deposit.amount}
                        </td>
                        <td>{deposit.currency}</td>
                        <td>
                          <span className="text-warning">{deposit.status}</span>
                        </td>
                        <td>{deposit.createdAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>no data to be displayed</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Deposits;
