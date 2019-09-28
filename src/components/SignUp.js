import React, { Component } from 'react';
import { Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import SnackBar from './SnackBar';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';

class SignUp extends Component {
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
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleInputData = this.handleInputData.bind(this);
  }

  // setting the values of when user enters the details
  handleInputData(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let errors = this.state.errors;
    const validUsernameRegex = RegExp(/[^A-Za-z0-9_]/);

    switch (name) {
      case 'username':
        errors.username = validUsernameRegex.test(value) ? 'Invalid Username' : (value.length !==0 && value.length < 5 ? 'Username must be 5 characters long!' : '');
        break;
      case 'password':
        errors.password = (value.length !==0 && value.length < 8) ? 'Password must be 8 characters long!' : '';
        break;
      default:  break;
    }
    this.setState({errors, [name]: value});
  }


  //login button
  handleSignUp(event) {

    const validateForm = (errors) => {
      let valid = true;
      Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      return valid;
    }

    if(!validateForm(this.state.errors)){
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Invalid Form!'
      })
    }else if (this.state.username === '') {
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Please Enter Your Username!'
      })
    } else if (this.state.password === '') {
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Please Enter Your Password!'
      })
    }
    else {
      localStorage.setItem('username',this.state.username);
      localStorage.setItem('password',this.state.password);

      this.props.history.push({
        pathname: "/transaction_details",
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

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white' }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{ paddingTop: 10 }}>
            Sign Up
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
            {errors.username.length > 0 && <span style={{ color: 'red' }}>{errors.username}</span>}
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
            {errors.password.length > 0 && <span style={{ color: 'red' }}>{errors.password}</span>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSignUp}
            >
              Sign Up
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
    );
  }
}

export default withStyles(styles)(SignUp);



