import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import Select from 'react-select';
import swal from 'sweetalert';
import Switch from "react-switch";

import Sidebar from "../components/Sidebar";
import {addDocument, getSelectedDocument, updateDocument, downloadDocument, deleteDocument} from '../controllers/document.js';
import {isLoggedIn} from "../controllers/user"

export default function () {

  const navigate = useNavigate();

  const {id} = useParams();
  const {type} = useParams();
//   console.log(id);
  console.log(type);

  const [edit, setEdit] = useState(false)
  const [userId, setUserId] = useState("")
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [canEdit, setCanEdit] = useState(true);
  const [update, setUpdate] = useState("");
  const [link, setLink] = useState("");

  const categoryArr = [
    { value: 'Guideline And Policies', label: 'Guideline And Policies' },
    { value: 'Forms', label: 'Forms' },
    { value: 'Insurance,Opd coverage', label: 'Insurance,Opd coverage' },
    { value: 'Templates', label: 'Templates' },
    { value: 'Calender', label: 'Calender' },
    { value: 'Training Materials', label: 'Training Materials' },
    { value: 'Tech Project', label: 'Tech Project' },
  ];


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
        setUpdate(res.user.name);
      }
    })
    if (type == "edit") {
        console.log("sssss");
        setEdit(true);
    } else {
        setEdit(false);
    }
    getSelectedDocument(id).then((res) => {
      if (!res.success) {
        swal({
          title: "Error!",
          text: "Something went wrong. Try reloading",
          icon: 'error',
          dangerMode: true,
          button: true,
        })
        .then((reload) => {
          window.location.reload();
        });
      } else {
        setTitle(res.file.title);
        setCategory(res.file.category);
        setDes(res.file.des);
        setNote(res.file.note);
        setLink(res.file.link.substring(8));
        setCanEdit(res.file.canEdit);
        setOwner(res.file.owner);
      }
    })
    .catch((err) => {
      swal({
        title: "Error!",
        text: "Something went wrong. Try reloading",
        icon: 'error',
        dangerMode: true,
        button: true,
      })
      .then((reload) => {
        window.location.reload();
      });
    })
  }, [])

  const onDelete = async (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this document!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
          deleteDocument(id).then((result) => {
            swal("Deleted! Document has been deleted!", {
              icon: "success",
              title: "Delete Successfully!",
              buttons: false,
              timer: 2000,
            });
            navigate("/share")
          });

          swal("Deleted! Document has been deleted!", {
              icon: "success",
              title: "Delete Successfully!",
              buttons: false,
              timer: 2000,
          });
        }
    });
  }

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
            data.append('lastModifiedBy', update);
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
            await updateDocument(id, data)
            .then((res) =>{
              if (res.success) {
                swal({
                  title: "Success!",
                  text: "Document updated Successfully",
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

  return (
    <div>
      <Sidebar>
      {" "}
      {/* <br /> */}
      <div className="container">
        <div className="row">
          <div className="card col-md-17 offset-md-9 offset-md-9">
            <h2 className="text-center">{edit ? "Update Document" : "View Document"}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label for="validationDefault01" className="form-label">
                    Document Title
                  </label>
                  {edit ? (
                  <input
                    type="text"
                    placeholder="Enter the document title"
                    name="documenTitle"
                    className="form-control"
                    id="validationDefault01"
                    required
                    onChange={(e) => setTitle(e.target.value)} value={title}
                  />) : (
                    <input
                    type="text"
                    placeholder="Enter the document title"
                    name="documenTitle"
                    className="form-control"
                    id="validationDefault01"
                    required
                    onChange={(e) => setTitle(e.target.value)} value={title}
                    disabled
                  />
                  )}
                </div>

                {edit ? (
                    <div className="form-group mb-2">
                        <label for="validationDefault02" className="form-label">
                            Document update by
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the Document Owner"
                            name="documenOwner"
                            className="form-control disabled"
                            id="validationDefault02"
                            required
                            disabled
                            onChange={(e) => setUpdate(e.target.value)} value={update}
                        />
                    </div>
                ): (
                    <div className="form-group mb-2">
                        <label for="validationDefault02" className="form-label">
                            Document Owner
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the Document update by"
                            name="documenOwner"
                            className="form-control disabled"
                            id="validationDefault02"
                            required
                            disabled
                            onChange={(e) => setOwner(e.target.value)} value={owner}
                        />
                    </div>
                )}

                <div className="form-group mb-2">
                  <label or="validationDefault03" className="form-label">
                    Document Category
                  </label>
                  {edit ? (
                    <Select
                        isClearable
                        isSearchable
                        options={categoryArr}
                        value = {
                            categoryArr.filter(option => 
                               option.label === category)
                        }
                        onChange={(e) => setCategory(e.value)}
                    />
                  ) : (
                    <Select
                        isClearable
                        isSearchable
                        options={categoryArr}
                        value = {
                            categoryArr.filter(option => 
                               option.label === category)
                        }
                        onChange={(e) => setCategory(e.value)}
                        isDisabled={true}
                    />
                  )}
                </div>
                <div className="form-group mb-2 d-flex align-items-center mt-3">
                  <label for="validationDefault02" className="form-label" style={{marginRight: "30px"}}>
                    Document can edit
                  </label>
                  {edit ? (
                    <Switch onChange={() => {setCanEdit(!canEdit)}} checked={canEdit}/>
                  ) : (
                    <Switch onChange={() => {setCanEdit(!canEdit)}} checked={canEdit} disabled={true}/>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Description
                  </label>
                  {edit ? (
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onChange={(e) => setDes(e.target.value)} value={des}
                    ></textarea>
                  ): (
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onChange={(e) => setDes(e.target.value)} value={des}
                        disabled
                    ></textarea>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Note
                  </label>
                  {edit ? (
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        onChange={(e) => setNote(e.target.value)} value={note}
                    ></textarea>
                  ): (
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        onChange={(e) => setNote(e.target.value)} value={note}
                        disabled
                    ></textarea>
                  )}
                </div>
                <div class="input-group mb-3">
                    {edit ? (
                        <>
                            <input
                                type="file"
                                class="form-control"
                                id="inputGroupFile02"
                                onChange={e => setFile(e.target.files[0])}
                            />
                            <label class="input-group-text" for="inputGroupFile02">
                                Upload
                            </label>
                        </>
                    ) : (
                        <>
                            <label or="validationDefault03" className="form-label me-4">
                              Document
                            </label>
                            <a href={"http://localhost:8063/document/downloadDocument/" + link} style={{width:"400px"}}>{link}</a>
                        </>
                    )}
                  
                </div>
                <div class="d-grid gap-2 d-md-block">
                    {edit ? (
                        <button class="btn btn-primary" type="submit" onClick={onSubmit}>
                            Update
                        </button>
                    ) : (
                        <button class="btn btn-danger" type="submit" onClick={onDelete}>
                            Delete
                        </button>
                    )}
                  &nbsp;&nbsp;&nbsp;
                  {/* <button class="btn btn-danger" type="button" onClick={onReset}>
                    Reset
                  </button> */}
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
