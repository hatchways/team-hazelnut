import React, { Component } from "react";
import "../App.scss";
import NavigationBar from "./Navbar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from "axios";

// import socket.io client
import openSocket from 'socket.io-client';

const messagesPageStyle = theme => ({
  list: {
    maxHeight: "81vh",
    overflow: "auto"

  },

  cardStyle: {
    height: "82vh"
  },

  bigAvatar: {
    width: 50,
    height: 50,
    marginBottom: "5px",
    marginTop: "5px",
    marginLeft: "10px"
  },

  title: {
    border: "0.5px solid #e6e6e6",
    textAlign: "center"
  },
  border: {
    border: "0.5px solid #e6e6e6",
    borderRight: "0px"
  },

  messagesArea: {
    height: "70vh",
    overflow: "auto",
    border: "1px solid red"
  },

  messagingArea: {
    border: "1px solid #e6e6e6"
  },

  textField: {
    width: "100%",
    paddingLeft: "10px"

  },

  input1: {
    height: "8vh"
  },

  buttonContainer: {
    height: "100%",
  },

  sendButton: {
    margin: theme.spacing(1),
    top: "30%",
    backgroundColor: "#f04040"
  },

  sentMessages: {
    textAlign: "right",
    paddingRight:"10px",
  },
  sentMessageLength: {
    padding: "6px"
  },

  test: {
    backgroundColor: "white",
    boxShadow: "0px 0px 4px 0px lightgrey",
    borderRadius: "10px",
    padding: "12px"

  }
});



class MessagesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      message: "",
      messages: [],
      conversationId: "",
      recipientIds: [],
      recipientProfiles: [],
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId")
    }
  }

  componentDidMount() {
    this.socket = openSocket('http://localhost:3001');
    this.socket.on("message", msg => {
      this.setState({ messages: [...this.state.messages, msg]});
    });
    this.getConversations();
    this.getRecipientProfiles();
  };
  
  // GET a list of conversations
  getConversations() {
    axios.get('/conversation/list/', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          conversations: res.data    // Get all conversation
        });
        // save recipient Ids to get their profiles
        res.data.map(con => {
          this.setState({ recipientIds: [...this.state.recipientIds, con.recipientId._id]});
        })  
      })
      .catch(err => {
        console.log("Error fetching and parsing data", err);
      }) 
  }

  // GET a list of recipient profiles
  getRecipientProfiles() {
    let axiosArray = this.state.recipientIds.map(id => 
      axios.get(`/profile/get/${id}`, { headers: { Authorization: `Bearer ${this.state.token}` } }));
    
    axios.all(axiosArray)
      .then(res => {
        res.data.map(profile => {
          this.setState({ recipientProfiles: [...this.state.recipientProfiles, profile] });
        })
      })
      .catch(err => {
        console.log(err);
      }); 
  };

  // Handle message change
  messageChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  // Handle create a new conversation
  createConversation = e => {
    const newConversation = {
      recipientId: e.target.id
    }
    axios.post('/conversation', newConversation, { headers: { Authorization: `Bearer ${this.state.token}` }} )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      }); 
  };
  
  // Handle get a conversation Id to start sending messages
  getConversationId = e => {
    this.setState({ conversationId: e.target.id });
  }
  
  // Handle create a new message
  createMessage = e => {
    e.preventDefault();
    const newMessage = {
      conversationId: this.state.conversationId,
      body: this.state.message
    }
    axios.post(`/conversation/${this.state.conversationId}/message`, newMessage, { headers: { Authorization: `Bearer ${this.state.token}` }} )
    
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });

    this.socket.emit("message", this.state.message);
    this.setState({ message: "" });  
  }




  render() {
    const { classes } = this.props;
    // const message = this.state.messages.map((message, i) => <p key={i}><span className={classes.sentMessageLength}>{message}</span></p> );
    // const message = this.state.messages.map((message, i) => <p key={i}> <span className={classes.sentMessageLength}>{message}</span></p>);
    const message = this.state.messages.map((message, i) => <p key={i} className={classes.sentMessageLength}><span className={classes.test}>{message}</span></p>);
    
    const converId = this.state.conversations.map((con, i) => 
        <Button 
          color="primary" 
          variant="contained" 
          key={i} 
          id={con._id} 
          onClick={this.getConversationId}
        >
          {con.recipientId.name}
        </Button>);


    return (
      <div>
        <NavigationBar></NavigationBar>
        <Grid container>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12} className={classes.title}>
                <h3>Inbox Messages</h3>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.cardStyle}>
                {converId}
                  <List className={classes.list}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </List>
                </Card>
                
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container className={classes.border}>
              <Grid item xs={1}>
                <Avatar
                  alt="Remy Sharp"
                  src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                  className={classes.bigAvatar}
                />
              </Grid>
              <Grid item xs={11}>
                <h3>NAME</h3>
              </Grid>
            </Grid>
            <Grid container className={classes.messagesArea}>
              <Grid item xs={12}>
                <div className={classes.sentMessages}>
                {message}
                </div>
              </Grid>
            </Grid>

            <Grid container className={classes.messagingArea}>
              <Grid item xs={8}>
                <TextField
                  id="standard-bare"
                  name="message"
                  className={classes.textField}
                  placeholder="Reply to Mc Barkly"
                  margin="normal"
                  value={this.state.message}
                  onChange={this.messageChange}
                  inputProps={{ "aria-label": "bare", className: classes.input1 }}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={2}>
                <div className={classes.buttonContainer}>
                <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                fullWidth 
                className={classes.sendButton}
                  onClick={this.createMessage}
                >
        Send
      </Button>
                </div>
              <Grid item xs={1}></Grid>

              
</Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(messagesPageStyle)(MessagesPage);