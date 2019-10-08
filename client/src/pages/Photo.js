import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import axios from "axios";

import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import "../App.scss";

const photoPageStyle = theme => ({
  photoContainer: {
    margin: theme.spacing.unit * 2
  }
});

class PhotoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imageUrl: ""
    };
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
  }

  async handlePhotoChange(event) {
    console.log(event.target.files);
    this.setState({
      file: event.target.files[0],
      imageUrl: ""
    });
  }

  handleSubmit = event => {
    let image = this.state.file;
    let formData = new FormData();
    formData.append("image", image);

    axios
      .post("/files/image-upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        // res.data.imageUrl has the public image url you can use
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="pageArea">
        <div className="menuArea">
          <MenuList>
            <MenuItem component={Link} to="/">
              Edit Profile
            </MenuItem>
            <MenuItem component={Link} to="/profile-photo">
              Profile Photo
            </MenuItem>
            <MenuItem component={Link} to="/payment">
              Payment
            </MenuItem>
            <MenuItem component={Link} to="/security">
              Security
            </MenuItem>
            <MenuItem component={Link} to="/settings">
              Settings
            </MenuItem>
          </MenuList>
        </div>
        <div className="settingsArea">
          <div className={classes.photoContainer}>
            <div>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <img src={this.state.image} alt="" />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      name="pic"
                      accept="image/*"
                      encType="multipart/form-data"
                      onChange={this.handlePhotoChange}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(photoPageStyle)(PhotoPage);
