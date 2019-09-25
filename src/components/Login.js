import React, { Component } from 'react';
import { Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
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
      }
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputData = this.handleInputData.bind(this);
  }

  handleInputData(event) {
    event.preventDefault();

    const target = event.target;
    const value = target.value;
    const name = target.name;

    let errors = this.state.errors;

    const validUsernameRegex = RegExp(/[^A-Za-z0-9]/);

    switch (name) {
      case 'username':
        errors.username = validUsernameRegex.test(value) ? 'Invalid Username' : (value.length < 5 ? 'Username must be 5 characters long!' : '');
        break;
      case 'password':
        errors.password = (value.length < 8) ? 'Password must be 8 characters long!' : '';
        break;
      default:
        break;
    }

     this.setState({ errors, [name]: value })

  }


  handleLogin(event) {
    event.preventDefault();

    const validateForm = (errors) => {
      let valid = true;
      Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      return valid;
    }

    if(validateForm(this.state.errors) && this.state.username === "x_deven733" && this.state.password === "123456") {
      this.props.history.push({
             pathname: "/home",
           })
    }else if ( this.state.username === '' || this.state.password === '') {
         alert("Please fill up the details below!");
       }
  else{
      alert('Invalid Form')
    }
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white' }}>
        <CssBaseline />
        <div className={classes.paper}>
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
              //type="text"
              autoComplete="username"
              value={this.state.username}
              onChange={this.handleInputData}
            />
             {errors.username.length > 0 && <span className='error'>{errors.username}</span>} 

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
            {errors.password.length > 0 && <span className='error'>{errors.password}</span>} 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleLogin}
            >
              Log In
            </Button>
          </form>
        </div>
      </Container>

    );
  }

}

export default withStyles(styles)(Login);



