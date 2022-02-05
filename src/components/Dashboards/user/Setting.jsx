import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../common/Layout";
import Sidebar from "./Sidebar";

function Settings() {
  const [user, setuser] = useState(sessionStorage.getItem("userid"));
  const [hash, sethash] = useState(sessionStorage.getItem("hashuser"));
  const [userdetails, setuserdetails] = useState("");

  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [userid, setuserid] = useState();

  const submitForm = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", phone);

    toggleloading();

    axios({
      method: "POST",
      url: "https://api.croxvest.com/api/auth/updatesettings.php",
      data: formdata,
    })
      .then((e) => {
        window.alert(e.data.message);
      })
      .catch((err) => window.alert(err.response.data.message))
      .finally(() => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });

    return false;
  };

  const fetchdetails = () => {
    let formdata = new FormData();
    formdata.append("hash", hash);
    formdata.append("userid", user);
    axios({
      method: "POST",
      url: "https://api.croxvest.com/api/user/userdetails.php",
      data: formdata,
    })
      .then((res) => {
        setuserdetails(res.data.data.user);

        setusername(res.data.data.user.username);
        setemail(res.data.data.user.email);
        setuserid(res.data.data.user.userid);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchdetails();
  }, []);

  return (
    <>
      <Layout Sidebar={Sidebar}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-5 mt-auto ml-auto mr-auto mb-4 shadow  p-3">
              <div className="d-flex">
                <div className="circle bg-danger mr-4">
                  <i className="fa fa-user fa-2x text-white"></i>
                </div>
                <div className="">
                  <h6 className="text-muted">hello,welcome !</h6>
                  <h6>
                    <strong className="text-light">
                      {userdetails.username}
                    </strong>
                  </h6>
                  <h6 className="text-muted">
                    <i className="fa fa-phone text-primary mr-2 mr-md-3"></i>
                  </h6>
                  <h6>
                    <i className="fa fa-envelope text-primary mr-2 mr-md-3"></i>
                    <a href="mailto:example@gmail.com" className="text-muted">
                      {userdetails.email}
                    </a>
                  </h6>
                  <h6 className="text-muted">
                    <i className="fa fa-money text-primary mr-2 mr-md-3"></i>
                    Your currency ({userdetails.currency})
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-5 mt-auto ml-auto mr-auto mb-4 shadow  p-0">
              <h5 className="ml-2 text-light">wallet</h5>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#ff5860",
                  marginBottom: "30px",
                }}
              ></div>
              <h6 className="text-primary mb-5 ml-2">
                Registered on : {userdetails.createdAt}
              </h6>

              <div className="btn-group w-100 pl-2 pr-2">
                <button className="btn btn-primary col">
                  <a href="/user/dashboard/deposit" className="text-white">
                    Deposit
                  </a>
                </button>
                <button className="btn btn-danger col">
                  <a href="/user/dashboard/withdraw" className="text-white">
                    Withdraw
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-11 ml-auto mr-auto mt-4 mb-5 shadow  pt-2">
              <h5 className="ml-2 text-light">Update Details</h5>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#ff5860",
                }}
              ></div>
              <form action="" className="form-group" onSubmit={submitForm}>
                <div className="row ml-md-5 mt-5">
                  <div className="col-md-4">
                    <h6 className="text-muted">Username</h6>
                    <small className="text-muted">
                      update this information only if need *.
                    </small>
                  </div>
                  <div className="col-md-7">
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-dark"
                          id="basic-addon1"
                        >
                          <i className="fa fa-user text-white"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        onChange={(e) => setusername(e.target.value)}
                        className="form-control"
                        value={username}
                        placeholder="update username"
                        aria-label="update username"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row ml-md-5 mt-5">
                  <div className="col-md-4">
                    <h6 className="text-muted">Email</h6>
                    <small className="text-muted">
                      update this information only if need *.
                    </small>
                  </div>
                  <div className="col-md-7">
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-dark"
                          id="basic-addon1"
                        >
                          <i className="fa fa-envelope text-white"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        className="form-control"
                        placeholder="update email"
                        aria-label="update email"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row ml-md-5 mt-5">
                  <div className="col-md-4">
                    <h6 className="text-muted">password</h6>
                    <small className="text-muted">
                      update this information only if need *.
                    </small>
                  </div>
                  <div className="col-md-7">
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-dark"
                          id="basic-addon1"
                        >
                          <i className="fa fa-lock text-white"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        onChange={(e) => setphone(e.target.value)}
                        value={phone}
                        className="form-control"
                        placeholder="update password"
                        aria-label="update phone"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                </div>
                {isloading ? (
                  <button className="btn btn-success btn-sm  mt-5 mb-3 float-right">
                    Updating ..
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm  mt-5 mb-3 float-right"
                    type="submit"
                  >
                    Update
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

export default Settings;
