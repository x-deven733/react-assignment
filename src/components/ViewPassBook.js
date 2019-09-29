import React, { Component } from 'react';
import { CssBaseline, AppBar, Toolbar, Paper, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import 'date-fns';
import styles from './styles';



class ViewPassBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: 0,
            msgOpen: false,
            snackMsg: "",
            snackType: "",
            open: false
        };
    }
    componentDidMount() {

        if(!localStorage.getItem('loggedIn')){
            this.props.history.push({
                pathname: "/",
            })
        }
        
        localStorage.getItem('data') && this.setState({
            datas: JSON.parse(localStorage.getItem('data')),
        })
    }

    //clearing the transaction details 
    handleClear = () => {
        let keysToRemove = ["data", "totalIncome", "totalExpense", "totalAmount"];
        for (var key of keysToRemove) {
            localStorage.removeItem(key);
        }
        alert("Records Cleared!");
        this.setState({
            datas: 0
        })
    }

    handleAddTransaction = () => {
        this.props.history.push({
            pathname: "/transaction_details",
        })
    }

    handleHome = () => {
        this.props.history.push({
          pathname:'home'
        })
      }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <CssBaseline />
                <AppBar color="default" className={classes.appBar}>
                    <Toolbar>
                        <div className='titlebar-container'>
                            <Typography variant="h6" noWrap> Passbook 
                            <Button className={classes.textbutton} onClick={this.handleHome}>Back To Home</Button>
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
                <main className={classes.passbooklayout}>
                    <Paper className={classes.papers}>
                        <Typography component="h1" variant="h4" align="center" >
                            <b>Records</b>
                        </Typography>
                        {this.state.datas !== 0 ? (
                            <div>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Date</StyledTableCell>
                                            <StyledTableCell align="center">Description</StyledTableCell>
                                            <StyledTableCell align="center">Income</StyledTableCell>
                                            <StyledTableCell align="center">Expense</StyledTableCell>
                                            <StyledTableCell align="center">Amount</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.datas.map((item, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="center">{item.date}</StyledTableCell>
                                                <StyledTableCell align="center">{item.description}</StyledTableCell>
                                                <StyledTableCell align="center">{item.income}</StyledTableCell>
                                                <StyledTableCell align="center">{item.expense}</StyledTableCell>
                                                <StyledTableCell align="center">{item.amount}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div style={{ flex: 'display', flexDirection: 'row', textAlign: 'center' }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="text"
                                        color="primary"
                                        className={classes.passbooksubmit}
                                        onClick={this.handleClear}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.passbooksubmit}
                                        onClick={this.handleAddTransaction}
                                    >
                                        Add Transaction
                                    </Button>
                                </div>
                            </div>

                        ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <h1>Record is Empty! Please add some transactions details!</h1>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.passbooksubmit}
                                        onClick={this.handleAddTransaction}
                                    >
                                        Add Transaction
                                    </Button>

                                </div>
                            )}
                    </Paper>

                </main>
            </div>
        );
    }
}



const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#50d07d',
        color: theme.palette.common.white,
        fontSize: 15
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#ADD8E6',
        },
    },
}))(TableRow);

export default withStyles(styles)(ViewPassBook);
