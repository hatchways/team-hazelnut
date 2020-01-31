import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "../App.scss";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router-dom";
import { EditBox } from "./reusable/components";

const initalState = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  errors: ""
};

class LoginPage extends Component {
  state = initalState;

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleEnterButton = event => {
    if (event.keyCode === 13) { document.getElementById('loginButton').click() }
  }

  validate = () => {
    let emailError = "";
    var re = /[^@]+@[^.]+..+/;
    var test = re.test(this.state.email);
    if (!test === true) { emailError = "Invalid email"; }

    if (emailError) {
      this.setState({ emailError });
      return false;
    }

    this.setState({ emailError: undefined });
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      const { email, password } = this.state;

      const data = {
        email: email,
        password: password
      };
      axios
        .post("/users/login", data)
        .then(res => {
          const { token } = res.data;
          const decoded = jwt_decode(token);
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("userId", decoded.id);
          this.props.history.push("/profile");
        })
        .catch(err => {
          this.setState({
            errors: err.response.data.error // Error messages from backend
          });
        });
    }
  };

  demoTest = event => {
    event.preventDefault();
    const data = {
      email: "tester@yahoo.com",
      password: "HatchTest123",
    };
    axios
      .post("/users/login", data)
      .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", decoded.id);
        this.props.history.push("/profile");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data.error
        });
      });
  }


  render() {
    return (
      <div>

        <Grid item xs={2}>
          <Button
            id="demoButton"
            variant="contained"
            onClick={this.demoTest}
            fullWidth
            className="submit-button"
            size="large"
          >
            Demo
          </Button>
        </Grid>
        <Grid container spacing={3} justify="center">
          <Grid item xs={3}>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <h1 className="center">Log In</h1>
                </Grid>
                <Grid item>
                  <div style={{ color: "red" }}>
                    {this.state.emailError}
                  </div>
                  <div style={{ color: "red" }}>
                    {this.state.passwordError}
                  </div>
                </Grid>
                <EditBox
                  fullWidth
                  id="outlined-email"
                  name="email"
                  onChange={this.handleEmailChange}
                  onKeyDown={this.handleEnterButton}
                  label="Email"
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                  xs={12}
                />
                <EditBox
                  name="password"
                  id="outlined-password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  onKeyDown={this.handleEnterButton}
                  fullWidth
                  xs={12}
                />
                <Grid item xs={12}>
                  <Button
                    id="loginButton"
                    variant="contained"
                    onClick={this.handleSubmit}
                    fullWidth
                    className="submit-button"
                    size="large"
                  >
                    Login
                      </Button>
                </Grid>

                <Grid item xs={12} className="center">
                  <p>
                    Don't have an Account? <a href="../signup">Register</a>
                  </p>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withRouter(LoginPage);
