import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "../App.scss";
import Button from "@material-ui/core/Button";
import { EditBox } from './reusable/components';
import { Snackbar, IconButton, Typography } from "@material-ui/core";

export const snackbarmsg = "wow";

const initalState = {
  name: "",
  nameError: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  snackbaropen: false,
  confirmPassword: "",
  errors: ""
};

class SignUpPage extends Component {
  state = initalState;

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = event => {
    if (event.target.value.match("^[a-zA-Z]*$") != null) {
      this.setState({ name: event.target.value });
    }
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  emailValidate = () => {
    let emailError = "";
    var re = /[^@]+@[^.]+..+/;
    var test = re.test(this.state.email);
    if (!test === true) {
      emailError = "Invalid email";
    }

    if (emailError) {
      this.setState({ emailError });
      return false;
    }
    this.setState({ emailError: undefined });
    return true;
  };

  nameValidate = () => {
    let nameError = "";

    if (this.state.name.length < 1) {
      nameError = "Please enter your name";
    }

    if (nameError) {
      this.setState({ nameError });
      return false;
    }
    this.setState({ nameError: undefined });
    return true;
  };

  passwordValidate = () => {

    this.setState({ emailError: undefined });
    return true;
  };

  nameValidate = () => {
    let nameError = "";

    if (this.state.name.length < 1) {
      nameError = "Please enter your name";
    }

    if (nameError) {
      this.setState({ nameError });
      return false;
    }
    this.setState({ nameError: undefined });
    return true;
  };

  passwordValidate = () => {
    let passwordError = "";

    if (this.state.password.length < 6) {
      passwordError = "Password is too short";
    }

    if (passwordError) {
      this.setState({ passwordError });
      this.setState({
        snackbaropen: true,
        snackbarmsg: "Password is too short!"
      });

      return false;
    }
    this.setState({ passwordError: undefined });
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const emailIsValid = this.emailValidate();
    const nameIsValid = this.nameValidate();
    const passwordIsValid = this.passwordValidate();
    if (emailIsValid && nameIsValid && passwordIsValid) {
      console.log(this.state);
      this.setState(initalState);

      const { name, email, password, confirmPassword } = this.state;

      const newUser = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }

      axios.post('/users/register', newUser)
        .then(res => {
          const { token } = res.data;
          const decoded = jwt_decode(token);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem("userId", decoded.id);
          this.props.history.push('/');
        })
        .catch(err => {
          this.setState({
            errors: err.response.data.error  // Error messages from backend
          });
        });
    }
  };

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  enableEdit = event => {
    this.setState({ disabled: false });
  };

  handleEnterButton = event => {
    if (event.keyCode === 13) { document.getElementById('signup-button').click() }
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            ></IconButton>
          ]}
        />
        <Grid container spacing={3} justify="center" xs={12}>
          <div className="infoBox ">
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={3} justify="center">
                <Grid item xs={12} className="center">
                  <h1>Sign Up</h1>
                </Grid>

                <Grid container justify="center">
                  <Grid item xs={12} className="center">
                    <Typography color="error">
                      {this.state.nameError}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className="center">
                    <Typography color="error">
                      {this.state.emailError}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className="center">
                    <Typography color="error">
                      {this.state.passwordError}
                    </Typography>
                  </Grid>
                </Grid>

                <EditBox
                  className="center"
                  xs={12}
                  sm={7}
                  fullWidth={true}
                  id="outlined-name"
                  label="Name"
                  name="name"
                  onChange={this.handleNameChange}
                  type="text"
                  value={this.state.name}
                />

                <EditBox
                  xs={12}
                  sm={7}
                  fullWidth={true}
                  id="outlined-email"
                  label="Email"
                  name="name"
                  onChange={this.handleEmailChange}
                  type="email"
                  value={this.state.email}
                />

                <EditBox
                  xs={12}
                  sm={7}
                  fullWidth={true}
                  id="outlined-password"
                  label="Password"
                  name="password"
                  onChange={this.handlePasswordChange}
                  type="password"
                  value={this.state.password}
                />

                <EditBox
                  xs={12}
                  sm={7}
                  fullWidth={true}
                  id="outlined-confirm-password"
                  label="Confirm Password"
                  name="confirmPassword"
                  onChange={this.handleConfirmPasswordChange}
                  type="password"
                  value={this.state.confirmPassword}
                  onKeyDown={this.handleEnterButton}
                />

                <Grid item xs={12} sm={7} className="center">
                  <Button
                    id="signup-button"
                    variant="contained"
                    onClick={this.handleSubmit}
                    fullWidth
                    className="submit-button"
                    size="large"
                  >
                    Sign Up
                      </Button>
                </Grid>

                <Grid item xs={12} className="center">
                  <p>
                    Already have an Account? <a href="../login">Login</a>
                  </p>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </div>
    );
  }
}

export default SignUpPage;
