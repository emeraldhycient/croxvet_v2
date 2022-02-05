import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, withRouter, Link, useParams } from "react-router-dom";

import "../styles.css";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";
import Edituser from "./Edituser";

function Users() {
  const location = useLocation();

  const { userid } = useParams();

  const [users, setusers] = useState();
  const [updatestatus, setupdatestatus] = useState("");

  const handleDelete = (id) => {
    axios
      .get(
        `  
https://api.croxvest.com/api/admin/deleteuser.php?userid=${id}`
      )
      .then((res) => {
        window.alert(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get("https://api.croxvest.com/api/admin/users.php")
      .then((res) => {
        let mod = Object.values(res.data.data.users);
        setusers(mod);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout Sidebar={Sidebar}>
      {userid ? (
        <div className="container">
          <div className="row">
            <div className="col-md-7 ml-auto mr-auto mt-4 mb-5 shadow  pt-2">
              <Edituser userid={userid} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        <div className="row">
          <div className="col-md-12 ml-auto mr-auto mt-4 mb-5 shadow pt-2">
            <h5 className="ml-2 text-light">Members Details</h5>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#ff5860",
              }}
            ></div>
            <div className="table-responsive mt-5">
              <table className="table ">
                <tbody>
                  <tr>
                    <th className="text-light">userid</th>
                    <th className="text-light">Username</th>
                    <th className="text-light">email</th>
                    <th className="text-light">password</th>
                    <th className="text-light">plans</th>
                    <th className="text-light">currency</th>
                    <th className="text-light">Reg.Date</th>
                    <th className="text-light">Earnings</th>
                    <th className="text-light">status</th>
                    <th className="text-light">referredby</th>
                    <th className="text-primary">
                      Edit user<i className="fa fa-edit ml-1"></i>
                    </th>
                    <th className="text-danger">
                      Delete<i className="fa fa-trash"></i>
                    </th>
                  </tr>
                  {users ? (
                    users.map((item, i) => (
                      <tr className="text-light" key={i}>
                        <td className="text-light">
                          <h6>{item.userid}</h6>
                        </td>
                        <td className="text-light">
                          <h5 className="mb-0">{item.username}</h5>
                          <small className="mt-0">{item.fullname}</small>
                        </td>
                        <td className="text-light">{item.email}</td>
                        {item.isadmin ? (
                          <td className="text-light">admin password hidden</td>
                        ) : (
                          <td className="text-light">{item.password}</td>
                        )}

                        <td className="text-light">{item.plan}</td>
                        <td className="text-light">{item.currency}</td>

                        <td className="text-light">
                          <i className="fa fa-hourglass-half icon mr-1"></i>
                          <h6 className="text-light">{item.createdAt}</h6>
                        </td>
                        <td className="text-light">
                          <i className="fa fa-dollar icon mr-1"></i>
                          {item.accountbalance}
                        </td>
                        <td className="text-light">{item.status}</td>
                        <td className="text-light">{item.referredby}</td>
                        <td>
                          <button className=" btn btn-primary">
                            <Link
                              to={`${location.pathname}/${item.userid}`}
                              className="text-white"
                            >
                              Edit
                            </Link>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => handleDelete(item.userid)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>no data found</td>
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

export default Users;
