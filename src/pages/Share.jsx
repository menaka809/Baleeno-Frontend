import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";

import Select from 'react-select';
import swal from 'sweetalert';
import Switch from "react-switch";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
} from 'mdb-react-ui-kit';

import Sidebar from "../components/Sidebar";
import {getAllDocuments, deleteDocument} from '../controllers/document.js';
import {isLoggedIn} from "../controllers/user"

export default function Share() {

  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [documentList, setDocumentList] = useState([]);

  const [varyingState, setVaryingState] = useState('');
  const [varyingModal, setVaryingModal] = useState(false);
  const [varyingRecipient, setVaryingRecipient] = useState('');
  const [varyingMessage, setVaryingMessage] = useState('');

  const onChangeRecipient = (event: ChangeEvent<HTMLInputElement>) => {
    setVaryingRecipient(event.target.value);
  };

  const onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setVaryingMessage(event.target.value);
  };

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
        setUserName(res.user.name);
      }
    }).catch((err) => {
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
    })
    getAllDocuments().then((res) => {
      if (res.success) {
        setDocumentList(res.files)
      } else {
        swal({
          title: "Error!",
          text: "Something went wrong, Please reload",
          icon: 'error',
          dangerMode: true,
          button: true,
        })
        .then((reload) => {
          window.location.reload();
        });
      }
    })
  }, [])

  const deleteMyDocument = (id) => {
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
              var documents = documentList.filter((e) => e._id !== result.item._id);
              setDocumentList(documents);
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

  const updateMyDocument = (id, canEdit) => {
    if (canEdit) {
      navigate("/viewDocument/" + id + "/edit")
    } else {
      swal({
        title: "Access denied!",
        text: "This document cannot be edited. Please contact the owner",
        icon: "warning",
        button: true,
        dangerMode: true,
      })
    }
  }

  const viewMyDocument = (id) => {
    navigate("/viewDocument/" + id + "/view")
  }

  return (
    <div>
      <Sidebar>
      <br />
      <br />
      {/* <br />
      <br /> */}
      <div className="container" style={{margin: "0px", maxWidth: "1420px"}}>
        <div className="row d-flex justify-content-center">
          <div className="card col-md-14 offset-md-1 offset-md-1" style={{marginLeft: "50px"}}>
            <h2 className="text-center">Shared Documents</h2>

            <div className="table table-striped table-bordered">
              <thead class="table-dark">
                <tr>
                  <th>Document Title</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Owner</th>
                  {/* <th>Shared with</th> */}
                  <th>Created On</th>
                  <th>Last Modified</th>
                  <th>Last Modified By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {documentList.map((value, index) =>  (
                  <tr key={index}>
                    <td>{value.title}</td>
                    <td>{value.category}</td>
                    <td>{value.size}</td>
                    <td>{value.owner}</td>
                    {/* <td>{value.title}</td> */}
                    <td>{value.createdDate.slice(0 ,10)}</td>
                    <td>{value.lastModifiedBy}</td>
                    <td>{value.lastModifiedDate.slice(0 ,10)}</td>
                    <td>
                      <button type="button" class="btn btn-primary mx-2"
                      onClick={() => {
                        setVaryingState('@gmail.com');
                        setVaryingModal(!varyingModal);
                        setVaryingRecipient('@gmail.com');
                      }}>
                        Share
                      </button>
                      <button type="button" class="btn btn-success mx-2"
                        onClick={viewMyDocument.bind(this, value._id)}>
                        View
                      </button>
                      <button type="button" class="btn btn-warning mx-2"
                        onClick={updateMyDocument.bind(this, value._id, value.canEdit)}>
                        Update
                      </button>
                      <button type="button" class="btn btn-danger mx-2"
                        onClick={deleteMyDocument.bind(this, value._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
          </div>
        </div>
      </div>
      </Sidebar>
      <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Share document</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                      value={varyingRecipient}
                      onChange={onChangeRecipient}
                      labelClass='col-form-label'
                      label='Recipient:'
                    />
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBTextArea
                      value={varyingMessage}
                      onChange={onChangeMessage}
                      labelClass='col-form-label'
                      label='Message:'
                    />
                  )}
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setVaryingModal(!varyingModal)}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => {
                swal("Shared! Document has been shared!", {
                  icon: "success",
                  title: "Shared Successfully!",
                  buttons: false,
                  timer: 2000,
                });
                setVaryingModal(!varyingModal)
              }}>Share</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
