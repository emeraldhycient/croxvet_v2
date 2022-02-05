import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

function Edituser({ userid }) {
  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  let history = useHistory();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [plan, setplan] = useState("");
  const [currency, setcurrency] = useState("");
  const [accountbalance, setaccountbalance] = useState("");
  const [status, setstatus] = useState("");
  const [fullname, setfullname] = useState("");
  const [isadmin, setisadmin] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();

    toggleloading();

    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("fullname", fullname);
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("email", email);
    formdata.append("accountbalance", accountbalance);
    formdata.append("plan", plan);
    formdata.append("currency", currency);
    formdata.append("isadmin", isadmin);
    formdata.append("status", status);

    axios({
      method: "POST",
      url: "https://api.croxvest.com/api/admin/updateuser.php",
      data: formdata,
    })
      .then((res) => {
        window.alert(res.data.message);
        if (res.data.status === "success") {
          setTimeout(() => {
            history.push("/admin/dashboard/users");
          }, 1000);
        }
      })
      .catch((err) => window.alert(err.response.data.message))
      .finally((e) => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });

    return false;
  };

  useEffect(() => {
    axios
      .get(
        `  
https://api.croxvest.com/api/admin/userdetails.php?userid=${userid}`
      )
      .then((res) => {
        //console.log(res);
        const data = res.data.data.user;
        setusername(data.username);
        setemail(data.email);
        setpassword(data.password);
        setplan(data.plan);
        setcurrency(data.currency);
        setaccountbalance(data.accountbalance);
        setstatus(data.status);
        setfullname(data.fullname);
        setisadmin(data.isadmin);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  }, [userid]);

  return (
    <div>
      <form action="" className="form-group" onSubmit={handlesubmit}>
        <div className="text-center m-2 text-light">
          Edit {fullname} account
        </div>
        <label className="text-muted">username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">fullname:</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">accountbalance:</label>
        <input
          type="text"
          value={accountbalance}
          onChange={(e) => setaccountbalance(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">account plan:</label>
        <input
          type="text"
          value={plan}
          onChange={(e) => setplan(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">currency:</label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setcurrency(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">password:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setstatus(e.target.value)}
          className="form-control mb-2"
        />
        <label className="text-muted">isadmin:</label>
        <input
          type="text"
          value={isadmin}
          onChange={(e) => setisadmin(e.target.value)}
          className="form-control mb-2"
        />
        {isloading ? (
          <button className="btn btn-success  btn-sm  mt-5 mb-3 float-right">
            Update...
          </button>
        ) : (
          <button
            className="btn primary-bg text-light btn-sm  mt-5 mb-3 float-right"
            type="submit"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
}

export default Edituser;
