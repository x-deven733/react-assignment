import React, { Component } from 'react';
import { Button, CssBaseline, Typography, AppBar, Toolbar, Paper, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './style/listcell.css'
import styles from './styles';
import SnackBar from './SnackBar';

var dt = new Date();
var currentMonth = dt.getMonth() + 1;

class TransactionDetails extends Component {

  constructor(props) {

    super(props)
    this.state = {
      arr: [],
      income: '',
      expense: '',
      amount: '',
      description: '',
      date: new Date(),
      selectedValue: 'income',
      netAmount: 0,
      totalIncome: [],
      totalExpense: [],
      msgOpen: false,
      snackMsg: "",
      snackType: ""
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {

    localStorage.getItem('totalAmount') && this.setState({
      netAmount: JSON.parse(localStorage.getItem('totalAmount')),
    })

    localStorage.getItem('data') && this.setState({
      arr: JSON.parse(localStorage.getItem('data')),
    })

    localStorage.getItem('totalIncome') && this.setState({
      totalIncome: JSON.parse(localStorage.getItem('totalIncome')),
    })

    localStorage.getItem('totalExpense') && this.setState({
      totalExpense: JSON.parse(localStorage.getItem('totalExpense')),
    })
  }

  ///////// handling the input details //////////

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'amount') {
      const regexOnlyNumbers = /^[0-9]+(\.[0-9]{1,2})?$/;
      if (event.target.value === '' || regexOnlyNumbers.test(event.target.value)) {
        this.setState({
          [name]: value
        })
      }
    }
    else {
      this.setState({
        [name]: value
      })
    }
    event.preventDefault();
  }

  ///////// handling date //////////
  handleDate(date) {
    this.setState({
      date: date,
    })
  }

  ///////// handling the form submission //////////
  handleSubmit(event) {

    if (this.state.amount === '') {
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Please Enter Amount!'
      })
    } else if (this.state.description === '') {
      this.setState({
        msgOpen: true,
        snackType: 'error',
        snackMsg: 'Please Enter the description of the transaction!'
      })
    }
    else {
      var obj = {};
      var amt;
      var month;
      month = this.state.date.getMonth() + 1;

      if (this.state.selectedValue === 'expense') {
        amt = parseFloat(this.state.netAmount) - parseFloat(this.state.amount);
        if (this.state.netAmount === 0 || amt <= 0) {
          this.setState({
            msgOpen: true,
            snackType: 'error',
            snackMsg: 'Amount balance is low!'
          })
          return;
        }
        else {
          obj = {
            'income': '',
            'expense': this.state.amount,
            'description': this.state.description,
            'date': (this.state.date).toLocaleDateString(),
            'amount': amt,
          }
          this.setState({
            netAmount: amt
          })
          localStorage.setItem('totalAmount', amt)
        }
      } else {
        amt = parseFloat(this.state.netAmount) + parseFloat(this.state.amount);
        obj = {
          'income': this.state.amount,
          'expense': '',
          'description': this.state.description,
          'date': (this.state.date).toLocaleDateString(),
          'amount': amt,
        }
        this.setState({
          netAmount: amt
        })
        localStorage.setItem('totalAmount', amt);
      }

      this.state.arr.push(obj);

      let data = 'data';
      localStorage.setItem(data, JSON.stringify(this.state.arr));

      if (this.state.selectedValue === 'expense' && month === currentMonth) {
        this.state.totalExpense.push(this.state.amount);
        localStorage.setItem('totalExpense', JSON.stringify(this.state.totalExpense))
      }
      else if (this.state.selectedValue === 'income' && month === currentMonth) {
        this.state.totalIncome.push(this.state.amount);
        localStorage.setItem('totalIncome', JSON.stringify(this.state.totalIncome))
      }

      this.resetForm();

      this.setState({
        msgOpen: true,
        snackType: 'success',
        snackMsg: 'Successfully recorded!'
      })
    }
     event.preventDefault();
  }


  //////handling snakbar's close button///////
  snackClose = () => {
    this.setState({
      msgOpen: false
    })
  }

  /////////// resetting the form data after succesfull form submission/////////
  resetForm = () => {
    this.setState({
      amount: '',
      description: '',
      date: new Date()
    })
  }


  //////// navigation to Passbook page /////////
  handlepassbook = () => {
    this.props.history.push({
      pathname: "/passbook",
    })
  }

  handleMonthlyDetails = () => {
    this.props.history.push({
      pathname: "/monthly_details",
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar color="default" className={classes.appBar}>
          <Toolbar>
            <div className='titlebar-container'>
              <Typography variant="h6" noWrap>Transaction Details </Typography>
              <div className='titlebar-user-details'>
                <div>x_deven733</div>
                <div>Amount : ₹ {parseFloat(this.state.netAmount)}</div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.papers}>
            <Typography component="h1" variant="h6" align="center">
              Enter Transaction Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Choose Transaction</FormLabel>
                  <RadioGroup aria-label="transaction"
                    name="selectedValue"
                    value={this.state.selectedValue}
                    onChange={this.handleOnChange}
                    style={{ flex: 'display', flexDirection: 'row' }}>
                    <FormControlLabel value="expense" control={<Radio color="primary" />} label="Debit" />
                    <FormControlLabel value="income" control={<Radio color="primary" />} label="Credit" />
                  </RadioGroup>
                </FormControl>
                <TextField
                  required
                  id="income"
                  name="amount"
                  label="Enter Amount"
                  fullWidth
                  autoComplete="Enter Amount"
                  value={this.state.amount}
                  onChange={this.handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="descriptions"
                  name="description"
                  label="Description of the transaction"
                  type="text"
                  fullWidth
                  autoComplete="Enter Transaction's Description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    naame="date"
                    id="date-picker-dialog"
                    label="Choose Date"
                    format="MM/dd/yyyy"
                    value={this.state.date}
                    onChange={this.handleDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <div style={{ flex: 'display', flexDirection: 'row', textAlign: 'center' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submits}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submits}
                onClick={this.handlepassbook}
              >
                View Passbook
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submits}
                onClick={this.handleMonthlyDetails}
              >
                Current Month Transaction
              </Button>
            </div>
          </Paper>
          <SnackBar
            type={this.state.snackType}
            open={this.state.msgOpen}
            message={this.state.snackMsg}
            onClose={() => this.snackClose()}
          />
        </main>
      </React.Fragment >
    );
  }
}

export default withStyles(styles)(TransactionDetails);
