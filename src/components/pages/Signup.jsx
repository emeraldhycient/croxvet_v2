import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loading from "../../images/Ripple-1s-200px.gif";

function Signup() {
  const history = useHistory();
  const { referralid } = useParams();

  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const [fname, setfname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    toggleloading();

    const formdata = new FormData();
    formdata.append("fullname", fname);
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("email", email);
    formdata.append("country", "country");
    formdata.append("plan", "plan");
    formdata.append("currency", "Currency");
    formdata.append("isadmin", "");
    formdata.append("referredby", referralid);

    axios({
      method: "POST",
      url: "https://api.croxvest.com/api/user/createaccount.php",
      data: formdata,
    })
      .then((res) => {
        if (res.data.status === "success") {
          window.alert(res.data.message);
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
        console.log(e);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });

    return false;
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container mt-5 mb-5">
        <div className="row my-3 mx-1">
          <div className="col-md-7 col-12 m-auto bg-white border pt-2">
            <h3 className="textprimary text-center mt-5">Signup</h3>
            <form
              action=""
              method="post"
              className="form-group mt-4 px-1"
              onSubmit={submitForm}
            >
              <input
                type="text"
                className="form-control form-control-lg mb-3"
                name="fullname"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
                placeholder=" Full name"
                aria-label="your fullname"
                aria-describedby="basic-addon1"
                required
              />

              <input
                type="text"
                className="form-control form-control-lg mb-3"
                onChange={(e) => setusername(e.target.value)}
                value={username}
                placeholder="username"
                aria-label="your username"
                aria-describedby="basic-addon2"
                required
              />

              <input
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                className="form-control  form-control-lg mb-3"
                placeholder="Password"
                aria-label="your password"
                aria-describedby="basic-addon1"
                required
              />

           

              <input
                type="email"
                className="form-control form-control-lg mb-3"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                placeholder="email"
                aria-label="your email"
                aria-describedby="basic-addon1"
                required
              />

            
              {isloading ? (
                <button className="btn btn-lg col primary text-white float-right mx-2 my-4">
                  <img
                    src={loading}
                    style={{ width: "30px", height: "30px" }}
                    alt=""
                  />{" "}
                  Register
                </button>
              ) : (
                <button
                  className="btn btn-lg col primary text-white float-right mx-2 my-4"
                  type="submit"
                >
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
