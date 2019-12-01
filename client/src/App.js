import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import PhotoPage from "./pages/Photo";

import "./App.scss";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProfileListPage from "./pages/ProfileList";
import EditProfilePage from "./pages/EditProfile";
import ProfilePayment from "./pages/ProfilePayment";
import MyJobsPage from "./pages/MyJobs";
import ProfileDetails from "./pages/ProfileDetails";
import PrivateRoute from "./pages/PrivateRoute";
import MessagesPage from "./pages/Messages";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <PrivateRoute path='/profile' component={EditProfilePage} />
        <PrivateRoute path="/profile-details/:id" component={ProfileDetails} />
        <PrivateRoute path="/sitter-search" component={ProfileListPage} />
        <PrivateRoute path="/messages" component={MessagesPage} />
        <PrivateRoute path="/profile-payment" component={ProfilePayment} />
        <PrivateRoute path="/profile-photo" component={PhotoPage} />
        <PrivateRoute path="/my-jobs" component={MyJobsPage} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile-payment" component={ProfilePayment} />
        <Route path="/profile-photo" component={PhotoPage} />
        <Route path="/my-jobs" component={MyJobsPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
