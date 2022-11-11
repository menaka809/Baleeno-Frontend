import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addUser } from "../controllers/user";

import swal from "sweetalert";

export default function UserRegistration() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const onAddUser = () => {
    if (
      name == "" &&
      email == "" &&
      mobile == "" &&
      password == "" &&
      repeatPass == ""
    ) {
      swal("Please fill the from to proceed");
    } else if (name == "") {
      swal("Please enter the name");
    } else if (email == "") {
      swal("Please enter the email");
    } else if (!validateEmail(email)) {
      swal("Please enter a valid email");
    } else if (password == "") {
      swal("Please enter the password");
    } else if (password.length < 6) {
      swal("Please enter a password with more than 6 characters");
    } else if (password != repeatPass) {
      swal("Passwords imismatched");
    } else {
      let newItem = {
        name: name,
        mobile: mobile,
        email: email,
        password: password,
      };
      addUser(newItem)
        .then((result) => {
          if (result != undefined) {
            console.log(result);
            if (result.message == "Mobile number has already registered") {
              swal({
                title: "Error!",
                text: result.message,
                icon: "error",
                dangerMode: true,
                button: false,
              });
            } else if (result.message == "Couldn't register the user") {
              swal({
                title: "Error!",
                text: result.message,
                icon: "error",
                dangerMode: true,
                button: false,
              });
            } else {
              swal({
                title: "Success!",
                text: "User Registered successfully",
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onReset = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setRepeatPass("");
  };

  return (
    <div>
      <section class="h-100 bg-dark">
        <div class="container py-5 h-100 d-flex justify-content-center">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card card-registration my-4">
                <div class="row g-0 d-flex justify-content-center ">
                  <div class="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo"
                      class="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                        height: "795px",
                      }}
                    />
                  </div>
                  <div class="col-xl-6">
                    <div class="card-body p-md-5 text-black">
                      <h3 class="mb-5 text-uppercase">
                        User registration form
                      </h3>

                      <div class="row">
                        <div class="col-md-12 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="form3Example1m"
                              class="form-control form-control-lg"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                            <label class="form-label" for="form3Example1m">
                              Name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12 mb-4">
                          <div class="form-outline">
                            <input
                              type="email"
                              id="form3Example1m"
                              class="form-control form-control-lg"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                            <label class="form-label" for="form3Example1m">
                              Email
                            </label>
                          </div>
                        </div>
                      </div>

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

                      <div class="row">
                        <div class="col-md-12 mb-4">
                          <div class="form-outline">
                            <input
                              type="password"
                              id="form3Example1m"
                              class="form-control form-control-lg"
                              onChange={(e) => setRepeatPass(e.target.value)}
                              value={repeatPass}
                            />
                            <label class="form-label" for="form3Example1m">
                              Repeat Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-start">
                        <p>
                          Already have an account{" "}
                          <a href="/userLogin">Login here</a>
                        </p>
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
