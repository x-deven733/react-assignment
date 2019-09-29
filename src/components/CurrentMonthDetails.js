import React, { Component } from 'react';
import { CssBaseline, AppBar, Toolbar, Paper, Typography, Card, CardContent, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import 'date-fns';
import './style/listcell.css'
import styles from './styles';


class CurrentMonthDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalIncome: [],
            totalExpense: [],
            netIncome: '',
            netExpense: ''
        };
    }

    componentDidMount() {

        if (!localStorage.getItem('loggedIn')) {
            this.props.history.push({
                pathname: "/",
            })
        }

        var netincome = 0;
        var netexpense = 0;
        if (localStorage.getItem('totalIncome') !== null) {
            var arr1 = JSON.parse(localStorage.getItem('totalIncome'))
            for (var i in arr1) {
                netincome = netincome + parseFloat(arr1[i])
            }
        }
        this.setState({
            netIncome: netincome
        })
        if (localStorage.getItem('totalExpense') !== null) {
            var arr2 = JSON.parse(localStorage.getItem('totalExpense'))
            for (var j in arr2) {
                netexpense = netexpense + parseFloat(arr2[j])
            }
        }
        this.setState({
            netExpense: netexpense
        })
    }

    handleHome = () => {
        this.props.history.push({
            pathname: 'home'
        })
    }

    handlePassbook = () => {
        this.props.history.push({
            pathname: "/passbook",
        })
    }

    handleTransaction = () => {
        this.props.history.push({
            pathname: "/transaction_details",
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <div className='titlebar-container'>
                            <Typography variant="h6" noWrap>Monthly Details
                            <Button className={classes.textbutton} onClick={this.handleHome}>Home</Button>
                                <Button className={classes.textbutton} onClick={this.handleTransaction}>Add Transaction</Button>
                                <Button className={classes.textbutton} onClick={this.handlePassbook}>Passbook</Button>
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
                <main className={classes.thismonth_layout} style={{ display: 'flex', justifyContent: 'center' }}>




                    <Paper className={classes.thismonth_papers}>
                        <Typography component="h1" variant="h6" align="center">
                            <b>Transaction Details of this Month</b>
                        </Typography>


                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Total Income
                                </Typography>
                                    <Typography variant="h5" component="h2">
                                        Rs. {this.state.netIncome}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Total Expense
                                </Typography>
                                    <Typography variant="h5" component="h2">
                                        Rs. {this.state.netExpense}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(CurrentMonthDetails);
