import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Select from 'react-select';
import swal from 'sweetalert';
import Switch from "react-switch";

import Sidebar from "../components/Sidebar";
import {addDocument} from '../controllers/document.js';
import {isLoggedIn} from "../controllers/user"

export default function () {

  const navigate = useNavigate();

  const [userId, setUserId] = useState("")
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [canEdit, setCanEdit] = useState(true);

  const categoryArr = [
    { value: 'Guideline And Policies', label: 'Guideline And Policies' },
    { value: 'Forms', label: 'Forms' },
    { value: 'Insurance,Opd coverage', label: 'Insurance,Opd coverage' },
    { value: 'Templates', label: 'Templates' },
    { value: 'Calender', label: 'Calender' },
    { value: 'Training Materials', label: 'Training Materials' },
    { value: 'Tech Project', label: 'Tech Project' },
  ]

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
      } else {
        setUserId(res.user.id);
        setOwner(res.user.name);
      }
    })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title === '' && owner === '' && category === '' && file==null) {
      swal("Enter details to proceed");
    } else if (title === '') {
        swal("Enter the title");
    } else if (owner === '') {
      swal("Enter the owner");
    } else if (category === '') {
      swal("Select the category");
    } else if (file == null) {
      swal("Please select a file");
    }  else {
      const data = new FormData();
            data.append('title', title);
            data.append('category', category);
            data.append('owner', owner);
            data.append('canEdit', canEdit);
            data.append('des', des);
            data.append('note', note);
            data.append('file', file);            
            if (file !== null) {
                swal({
                    title: "Info!",
                    text: "Please wait while your document is uploading to our servers",
                    icon: 'info',
                    timer: 2000,
                    button: false,
                });
            }
            await addDocument(data)
            .then((res) =>{
              if (res.success) {
                swal({
                  title: "Success!",
                  text: "New document Add Successfully",
                  icon: 'success',
                  timer: 3500,
                  button: true,
                });
              } else {
                if (res.type == "Invalid file type") {
                  swal({
                    title: "Error!",
                    text: res.message,
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                  });
                } else if (res.type == "Multer Error") {
                  swal({
                    title: "Error!",
                    text: res.message.message,
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                  });
                } else {
                  swal({
                    title: "Error!",
                    text: "Something went wrong. Try again",
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                  });
                }                
              }               
            })
            .catch((err) => {
                console.error(err);
                swal({
                    title: "Error!",
                    text: "Something went wrong when adding the item. Try reloading page",
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                })
                .then((reload) => {
                    window.location.reload();
                });
            })
    }
  }

  const onReset = () => {
    setTitle("");
    setCategory("");
    setNote("");
    setFile(null);
    setCanEdit(true);
    setDes("");
  }

  return (
    <div>
      <Sidebar>
      {" "}
      {/* <br /> */}
      <div className="container">
        <div className="row">
          <div className="card col-md-15 offset-md-9 offset-md-9">
            <h2 className="text-center">Outgoing Documents</h2>
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
                    onChange={(e) => setTitle(e.target.value)} value={title}
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
                    className="form-control disabled"
                    id="validationDefault02"
                    required
                    disabled
                    onChange={(e) => setOwner(e.target.value)} value={owner}
                  />
                </div>
                <div className="form-group mb-2">
                  <label or="validationDefault03" className="form-label">
                    Document Category
                  </label>
                  <Select
                    isClearable
                    isSearchable
                    options={categoryArr}
                    onChange={(e) => setCategory(e.value)}
                  />
                  {/* <select
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
                  </select> */}
                </div>
                <div className="form-group mb-2 d-flex align-items-center mt-3">
                  <label for="validationDefault02" className="form-label" style={{marginRight: "30px"}}>
                    Document can edit
                  </label>
                  <Switch onChange={() => {setCanEdit(!canEdit)}} checked={canEdit} />
                </div>

                <div className="form-group mb-2">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => setDes(e.target.value)} value={des}
                  ></textarea>
                </div>
                {/* <div className="form-group mb-2">
                  <label className="form-label">Submited Date</label>
                  <input
                    type="date"
                    placeholder="Enter the document title"
                    name="documenTitle"
                    className="form-control"
                  />
                </div> */}
                <div className="form-group mb-2">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Note
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={(e) => setNote(e.target.value)} value={note}
                  ></textarea>
                </div>
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile02"
                    onChange={e => setFile(e.target.files[0])}
                  />
                  <label class="input-group-text" for="inputGroupFile02">
                    Upload
                  </label>
                </div>
                <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-primary" type="submit" onClick={onSubmit}>
                    Submit
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button class="btn btn-danger" type="button" onClick={onReset}>
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
