import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "./components/Sidebar";
import Incoming from "./pages/Incoming";
import Share from "./pages/Share";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Usermanagement from "./pages/Usermanagement";
import Outgoing from "./pages/Outgoing";
import Docshare from "./pages/Docshare";
import Viewdoc from "./pages/Viewdoc";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserRegistration from "./pages/UserRegistration";
import UserLogin from "./pages/UserLogin";
import ViewDocument from "./pages/ViewDocument";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Sidebar> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/incoming" element={<Incoming />} />
          <Route path="/outgoin" element={<Outgoing />} />
          <Route path="/share" element={<Share />} />

          <Route path="/Usermanagement" element={<Usermanagement />} />
          <Route path="/viewdoc" element={<Viewdoc />} />
          <Route path="/docshare" element={<Docshare />} />

          <Route path="/userRegistration" element={<UserRegistration />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/viewDocument/:id/:type" element={<ViewDocument />} />
        </Routes>
        {/* </Sidebar> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
