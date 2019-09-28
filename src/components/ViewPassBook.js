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
        localStorage.getItem('data') && this.setState({
            datas: JSON.parse(localStorage.getItem('data')),
        })

        if(!localStorage.getItem('username')){
            this.props.history.push({
              pathname: "/",
            })
          }
    }

    handleClear = () => {

        localStorage.clear();

        alert("Records Cleared!");

        this.setState({
           datas:0
        })
    }

    handleAddTransaction  = () => {
        this.props.history.push({
            pathname: "/transaction_details",
        })
    }

    handleBackToHome = () => {
        this.props.history.push({
            pathname: "/home",
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Passbook
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.passbooklayout}>
                    <Paper className={classes.papers}>
                        <Typography component="h1" variant="h4" align="center">
                            Records
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
                                        variant="contained"
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
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.passbooksubmit}
                                        onClick={this.handleBackToHome}
                                    >
                                        Home
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
