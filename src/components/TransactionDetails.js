import React, { Component } from 'react';
import { Button, CssBaseline, Typography, AppBar, Toolbar, Paper, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './style/listcell.css'
import styles from './styles';

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
      selectedValue: 'expense',
      netAmount: 0,
      totalIncome: [],
      totalExpense: []
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlepassbook = this.handlepassbook.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('data') && this.setState({
      arr: JSON.parse(localStorage.getItem('data')),

    })

    localStorage.getItem('totalIncome') && this.setState({
      totalIncome: JSON.parse(localStorage.getItem('totalIncome')),
    })

    localStorage.getItem('totalExpense') && this.setState({
      totalExpense: JSON.parse(localStorage.getItem('totalExpense')),
    })

    localStorage.getItem('totalAmount') && this.setState({
      netAmount: JSON.parse(localStorage.getItem('totalAmount')),
    })
  }


  handleOnChange(event) {
    
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ 
      [name]: value 
    })
    event.preventDefault();
  }

  handleDate(date) {
    this.setState({
      date: date,
    })
  }

  handleSubmit(event) {

    if (this.state.amount === '' || this.state.description === '') {
      alert("Please fill up the details!!");
    }
    else {
      var obj = {};
      var amt;
      var id;

      id = this.state.date.getMonth() + 1;

      if (this.state.selectedValue === 'expense') {

        amt = parseFloat(this.state.netAmount) - parseFloat(this.state.amount);



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


        localStorage.setItem('totalAmount', this.state.netAmount)

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

        localStorage.setItem('totalAmount', this.state.netAmount)
      }

      console.log("Object::::" + JSON.stringify(obj))

      this.state.arr.push(obj);

      let data = 'data';
      localStorage.setItem(data, JSON.stringify(this.state.arr));


      if (this.state.selectedValue === 'expense' && id === currentMonth) {
        this.state.totalExpense.push(this.state.amount);

        localStorage.setItem('totalExpense', JSON.stringify(this.state.totalExpense))
      }
      else if (this.state.selectedValue === 'income' && id === currentMonth) {
        this.state.totalIncome.push(this.state.amount);

        localStorage.setItem('totalIncome', JSON.stringify(this.state.totalIncome))
      }

      this.resetForm();
    }


    event.preventDefault();

  }

  resetForm() {
    this.setState({
      amount: '',
      description: '',
      date: new Date()
    })
  }

  handlepassbook() {
    this.props.history.push({
      pathname: "/passbook",
    })
  }

  render() {
    localStorage.setItem('totalAmount', (this.state.netAmount))
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="#50d07d" className={classes.appBar}>
          <Toolbar>
            <div className='titlebar-container'>
              <Typography variant="h6" noWrap>Transaction Details </Typography>
                <div className='titlebar-user-details'>
                  <div>Amount : {parseFloat(this.state.netAmount)}</div>
                  x_deven733
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
                  type='number'
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
            </div>
          </Paper>
        </main>
      </React.Fragment >
    );
  }
}

export default withStyles(styles)(TransactionDetails);
