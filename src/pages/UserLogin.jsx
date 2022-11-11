import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logInUser } from "../controllers/user";

import swal from "sweetalert";

import loginImage from "../img/img.jpg";

export default function UserLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const onAddUser = () => {
    if (mobile == "" && password == "") {
      swal("Please fill the from to proceed");
    } else if (mobile == "") {
      swal("Please enter the mobile number");
    } else if (password == "") {
      swal("Please enter the password");
    } else {
      let newItem = {
        mobile: mobile,
        password: password,
      };
      logInUser(newItem)
        .then((result) => {
          if (result != undefined) {
            console.log(result);
            if (result.message == "Invalid username or password") {
              swal({
                title: "Error!",
                text: result.message,
                icon: "error",
                dangerMode: true,
                button: false,
              });
            } else {
              localStorage.setItem("token", result.token);
              swal({
                title: "Success!",
                text: "Login successfull",
                icon: "success",
                timer: 2000,
                button: false,
              });
              setTimeout(() => navigate("/dashboard"), 2000);
            }
          } else {
            swal({
              title: "Error!",
              text: "Something went wrong went wrong. Try again",
              icon: "error",
              dangerMode: true,
              button: false,
            });
          }
        })
        .catch((err) => {
          swal({
            title: "Error!",
            text: "Something went wrong with the network. Try reloading page",
            icon: "error",
            dangerMode: true,
            button: true,
          }).then((reload) => {
            window.location.reload();
          });
        });
    }
  };

  const onReset = () => {
    setMobile("");
    setPassword("");
  };

  return (
    <div>
      <section class="h-100 bg-dark" style={{ height: "100%" }}>
        <div class="container py-5 h-100 d-flex justify-content-center">
          <div class="row d-flex justify-content-center align-items-center h-100 my-5">
            <div class="col">
              <div class="card card-registration my-4">
                <div class="row g-0 d-flex justify-content-center ">
                  <div class="col-xl-6 d-none d-xl-block">
                    <img
                      src={loginImage}
                      alt="Sample photo"
                      class="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                        width: "600px",
                      }}
                    />
                  </div>
                  <div class="col-xl-6 d-flex align-items-center">
                    <div class="card-body p-md-5 text-black">
                      <h3 class="mb-5 text-uppercase">User login form</h3>

                      <div class="row">
                        <div class="col-md-12 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="form3Example1m"
                              class="form-control form-control-lg"
                              onChange={(e) => setMobile(e.target.value)}
                              value={mobile}
                            />
                            <label class="form-label" for="form3Example1m">
                              Mobile Number
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12 mb-4">
                          <div class="form-outline">
                            <input
                              type="password"
                              id="form3Example1m"
                              class="form-control form-control-lg"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                            <label class="form-label" for="form3Example1m">
                              Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-start">
                        {" "}
                        <p>
                          Don't have an account{" "}
                          <a href="/userRegistration">Register here</a>
                        </p>{" "}
                      </div>
                      <div class="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          class="btn btn-light btn-lg"
                          onClick={onReset}
                        >
                          Reset all
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-lg ms-2"
                          onClick={onAddUser}
                        >
                          Submit form
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
