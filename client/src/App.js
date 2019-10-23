import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import PhotoPage from "./pages/Photo";

import "./App.scss";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfileListPage from "./pages/ProfileList";
import EditProfilePage from "./pages/EditProfile";
import ProfilePayment from "./pages/ProfilePayment";
import MyJobsPage from "./pages/MyJobs";
import ProfileDetails from "./pages/ProfileDetails";
import MessagesPage from "./pages/Messages";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <PrivateRoute path='/profile' component={EditProfilePage} />
        <PrivateRoute path="/profile-details/:id" component={ProfileDetails} />
        <PrivateRoute path="/sitter-search" component={ProfileListPage} />
        <PrivateRoute path="/messages" component={MessagesPage} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profile-payment" component={ProfilePayment} />
        <Route path="/profile-photo" component={PhotoPage} />
        <Route path="/my-jobs" component={MyJobsPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
