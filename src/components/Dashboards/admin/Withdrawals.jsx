import React, { useState, useEffect } from "react";
import "../styles.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";

function Withdrawals() {
  const [withdrawals, setwithdrawals] = useState("");
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
      url: "https://api.croxvest.com/api/admin/withdrawal.php",
      data: formdata,
    })
      .then((res) => {
        window.alert(res.data.message);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  const deletewithdrawal = (id) => {
    axios
      .get(`https://api.croxvest.com/api/admin/deletewithdrawal.php?id=${id}`)
      .then((res) => {
        window.alert(res.data.message);
      })
      .catch((err) => window.alert(err.response.data.message));
  };

  useEffect(() => {
    axios
      .get("https://api.croxvest.com/api/admin/withdrawal.php?all=all")
      .then((res) => {
        let mod = Object.values(res.data.data.withdrawal);
        setwithdrawals(mod);
      })
      .catch((err) => window.alert(err.response.data.message));

    axios
      .get("https://api.croxvest.com/api/admin/withdrawal.php?unprocessed=all")
      .then((res) => {
        let mod = Object.values(res.data.data.withdrawal);
        setunprocessed(mod);
      })
      .catch((err) => window.alert(err.response.data.message));
  }, []);

  return (
    <Layout Sidebar={Sidebar}>
      <div className="container">
        <div className="row">
          <div className="col-md-11 ml-auto mr-auto mt-4 mb-5 shadow bg-white pt-2">
            <h5 className="ml-2 text-dark">Withdrawal Request</h5>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#cacaca",
              }}
            ></div>
            <div className="table-responsive mt-3">
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <th className="text-dark">userid</th>
                    <th className="text-dark">wallet</th>
                    <th className="text-dark">amount</th>
                    <th className="text-dark">currency</th>
                    <th className="text-dark">date</th>
                    <th className="text-dark">action</th>
                  </tr>

                  {unprocessed ? (
                    unprocessed.map((withdrawal, i) => (
                      <tr key={i}>
                        <td>
                          <h5 className="mb-0 text-muted">{withdrawal.userid}</h5>
                        </td>
                        <td>{withdrawal.wallet}</td>
                        <td>
                          <i className="fa fa-dollar mr-1"></i>
                          {withdrawal.amount}
                        </td>
                        <td>{withdrawal.currency}</td>
                        <td>{withdrawal.createdAt}</td>
                        <td>
                          <span
                            className="btn btn-primary text-light"
                            onClick={(e) =>
                              processWithdrawal(
                                withdrawal.userid,
                                withdrawal.amount
                              )
                            }
                          >
                            Process
                          </span>
                          <span
                            className="btn btn-danger text-light"
                            onClick={(e) => deletewithdrawal(withdrawal.id)}
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
            <h5 className="ml-2 text-dark">Withdrawal History</h5>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#cacaca",
              }}
            ></div>
            <div className="table-responsive mt-3">
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <th className="text-dark">userid</th>
                    <th className="text-dark">wallet</th>
                    <th className="text-dark">amount</th>
                    <th className="text-dark">currency</th>
                    <th className="text-dark">status</th>
                    <th className="text-dark">date</th>
                  </tr>
                  {withdrawals ? (
                    withdrawals.map((withdrawal, i) => (
                      <tr key={i}>
                        <td>
                          <h5 className="mb-0">{withdrawal.userid}</h5>
                        </td>
                        <td>{withdrawal.wallet}</td>
                        <td>
                          <i className="fa fa-dollar mr-1"></i>
                          {withdrawal.amount}
                        </td>
                        <td>{withdrawal.currency}</td>
                        <td>
                          <span className="text-warning">
                            {withdrawal.status}
                          </span>
                        </td>
                        <td>{withdrawal.createdAt}</td>
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

export default Withdrawals;
