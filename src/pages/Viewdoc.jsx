import React from "react";

import Sidebar from "../components/Sidebar";

export default function Viewdoc() {
  return (
    <div>
      <Sidebar>
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-15 offset-md-3 offset-md-3">
            <h2 className="text-center">Documents</h2>
            <br />

            <nav class="navbar bg-light">
              <div class="container-fluid">
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </nav>
            <br />

            <div className="table table-striped table-bordered">
              <thead class="table-dark">
                <tr>
                  <th>File Name</th>
                  <th>Owner</th>
                  <th>Author</th>

                  <th>Size</th>
                  <th>Status</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>JBaleeno OPD Claim Docx</td>
                  <td>Mr.Perera</td>
                  <td>Mr.Amal</td>
                  <td>175KB</td>
                  <td>Approved</td>

                  <td>
                    <button type="button" class="btn btn-primary">
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Softlogic life cycle</td>
                  <td>S.Perera</td>
                  <td>S.R.ABeyrathne</td>
                  <td>275KB</td>
                  <td>Approved</td>

                  <td>
                    <button type="button" class="btn btn-primary">
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Baleeno OPD Claim Docx</td>
                  <td>Mr.Sajana Abeyrathne</td>
                  <td>Mr.Menaka</td>
                  <td>17MB</td>
                  <td>Approved</td>

                  <td>
                    <button type="button" class="btn btn-primary">
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>NAT-introduction</td>
                  <td>Mr.Perera</td>
                  <td>Jethaka M.M</td>
                  <td>375KB</td>
                  <td>Approved</td>

                  <td>
                    <button type="button" class="btn btn-primary">
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Company- overview</td>
                  <td>Mr.Perera</td>
                  <td>Mr. Lahiru Bandara Hewage</td>
                  <td>175KB</td>
                  <td>Approved</td>

                  <td>
                    <button type="button" class="btn btn-primary">
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>System-drawback</td>
                  <td>Mr.Amal</td>
                  <td>Menaka J.P.M</td>
                  <td>347MB</td>
                  <td>Approved</td>

                  <td>
                    <button type="button" class="btn btn-primary">
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Guidelines-for strategy</td>
                  <td>MR.Perera</td>
                  <td>Mr.Nihal</td>
                  <td>175KB</td>
                  <td>Approved</td>

                  <td>
                    <button type="button" class="btn btn-primary">
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </div>
          </div>
        </div>
      </div>
      </Sidebar>
    </div>
  );
}
