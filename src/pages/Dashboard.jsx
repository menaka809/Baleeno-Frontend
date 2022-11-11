import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";

import Sidebar from "../components/Sidebar";

import {isLoggedIn} from "../controllers/user"

export default function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn()
    .then((res) => {
      // console.log(res)
      if (!res.isLoggedIn) {
        swal({
          title: "Error!",
          text: "First you need to login to the system",
          icon: 'error',
          dangerMode: true,
          button: false,
        })
        setTimeout(
            () => navigate("/userLogin"), 
            1000
        );
      }
    })
  }, [])


  return (
    <div>
      <Sidebar>
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-13 offset-md-5 offset-md-5">
            <h1 className="text-center">Baleeno Documents Management System</h1>
            <br />
            <br />
            <div class="d-grid gap-2 col-6 mx-auto">
              <button class="btn btn-primary btn-lg" type="button">
                Guideline And Policies
              </button>
              <br />
              <button class="btn btn-secondary btn-lg" type="button">
                Forms
              </button>
              <br />
              <button class="btn btn-success btn-lg" type="button">
                Insurance,Opd coverage
              </button>
              <br />
              <button class="btn btn-danger btn-lg" type="button">
                Templates
              </button>
              <br />
              <button class="btn btn-warning btn-lg" type="button">
                Calender
              </button>
              <br />
              <button class="btn btn-info btn-lg" type="button">
                Training Materials
              </button>
              <br />
              <button class="btn btn-primary btn-lg" type="button">
                Tech Project
              </button>
              <br />
              <button class="btn btn-dark btn-lg" color=" $teal" type="button">
                DXM - DRM
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
      </Sidebar>
    </div>
  );
}
