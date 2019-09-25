import React, { Component } from 'react';
import {CssBaseline,AppBar,Toolbar,Paper,Typography,Button,Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import 'date-fns';
import styles from './styles';




class ViewPassBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
        };
        this.handleClear = this.handleClear.bind(this);
        this.handleAddTransaction = this.handleAddTransaction.bind(this);
    }
    componentWillMount() {
        localStorage.getItem('data') && this.setState({
            datas: JSON.parse(localStorage.getItem('data')),

        })
    }


    componentDidMount() {

        if (this.state.datas !== null) {
            this.state.datas.map((item, index) => (
                console.log(item.income)
            ))
        }


        console.log("View pass book Data:::" + JSON.stringify(this.state.datas));
    }

    handleClear() {
        localStorage.clear();
    }


    handleAddTransaction() {
        this.props.history.push({
            pathname: "/transaction_details",
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
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
                        {this.state.datas !== "" ? (
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
                                </div>
                            </div>

                        ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <h1>Record Empty! Please enter some transactions details!</h1>
                                </div>
                            )}

                    </Paper>

                </main>
            </React.Fragment >
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
