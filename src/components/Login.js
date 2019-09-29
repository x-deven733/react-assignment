import React, { Component } from 'react';
import { Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import SnackBar from './SnackBar';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: ''
      },
      msgOpen: false,
      snackMsg: "",
      snackType: ""
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputData = this.handleInputData.bind(this);
  }

  // setting the values of when user enters the details
  handleInputData(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }


  //login button
  handleLogin(event) {
    if (this.state.username === "person123" && this.state.password === "12345678") {
      localStorage.setItem('loggedIn', true);
      this.props.history.push({
        pathname: "/home",
      })
    } else if (this.state.username === '') {
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Please Enter Username!'
      })
    } else if (this.state.password === '') {
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Please Enter Password!'
      })
    }
    else {
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Wrong Credentials! Please check your username/password!'
      })
    }
    event.preventDefault();
  }

  //handling close button of snackbar, resetting its initital state to false
  snackClose = () => {
    this.setState({
      msgOpen: false
    })
  }

  componentDidMount() {
    if (localStorage.getItem('loggedIn')) {
      this.props.history.push({
        pathname: "/home",
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

        <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white' }}>
          <CssBaseline />
          <div className={classes.paper} >
            <p style={{ textAlign: 'center'}}>
              <b>Welcome to Personal Finance Manager</b>
            </p>
            <Typography component="h1" variant="h5" style={{ paddingTop: 10 }}>
              Sign in
          </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Enter Your Username"
                name="username"
                autoComplete="username"
                value={this.state.username}
                onChange={this.handleInputData}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter Your Password"
                type="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleInputData}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.login}
                onClick={this.handleLogin}
              >
                Log In
            </Button>
            </form>
          </div>
          <SnackBar
            type={this.state.snackType}
            open={this.state.msgOpen}
            message={this.state.snackMsg}
            onClose={() => this.snackClose()}
          />
        </Container>
      </div>

    );
  }
}

export default withStyles(styles)(Login);



