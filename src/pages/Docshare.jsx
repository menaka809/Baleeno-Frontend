import React from "react";

import Sidebar from "../components/Sidebar";

export default function Docshare() {
  return (
    <div>
      <Sidebar>
      <br />
      <br />
      <br />
      <div>
        <div className="row">
          <div className="card col-md-4 offset-md-3 offset-md-3">
            <h2 className="text-center">File Sharing Details</h2>
            <div className="card-body">
              <form>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Subject
                  </label>
                  <input
                    type="textl"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Subject"
                  />
                </div>
                <div className="form-group mb-2">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group mb-2">
                  <label or="validationDefault03" className="form-label">
                    Document Category
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="validationDefault03"
                    required
                  >
                    <option selected disabled value="">
                      Access Type
                    </option>
                    <option value="1">Only Prieview</option>
                    <option value="2">Edit</option>
                  </select>
                </div>
                <br />
                <br />
                <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-primary" type="submit">
                    Share
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button class="btn btn-danger" type="button">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </Sidebar>
    </div>
  );
}
