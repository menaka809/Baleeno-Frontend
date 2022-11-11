import React from "react";

import Sidebar from "../components/Sidebar";

export default function Incoming() {
  return (
    <div>
      <Sidebar>
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-15 offset-md-9 offset-md-9">
            <h2 className="text-center">Incoming Documents</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label for="validationDefault01" className="form-label">
                    Document Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the document title"
                    name="documenTitle"
                    className="form-control"
                    id="validationDefault01"
                    required
                  />
                </div>

                <div className="form-group mb-2">
                  <label for="validationDefault02" className="form-label">
                    Document Owner
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Document Owner"
                    name="documenOwner"
                    className="form-control"
                    id="validationDefault02"
                    required
                  />
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
                      Open this select menu
                    </option>
                    <option value="1">Guideline And Policies</option>
                    <option value="2">Forms</option>
                    <option value="3">Insurance,Opd coverage</option>
                    <option value="3">Templates</option>
                    <option value="3">Calender</option>
                    <option value="3">Training Materials</option>
                    <option value="3">Tech Project</option>
                  </select>
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
                  <label className="form-label">Submited Date</label>
                  <input
                    type="date"
                    placeholder="Enter the document title"
                    name="documenTitle"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-2">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Note
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                  ></textarea>
                </div>
                <br />
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile02"
                  />
                  <label class="input-group-text" for="inputGroupFile02">
                    Upload
                  </label>
                </div>
                <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-primary" type="submit">
                    Submit
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
