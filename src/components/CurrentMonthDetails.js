import React, { Component } from 'react';
import {CssBaseline,AppBar,Toolbar,Paper,Typography,Card,CardContent} from '@material-ui/core';
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

    componentWillMount() {
        var netincome = 0;
        var netexpense = 0;
        if (localStorage.getItem('totalIncome') !== null) {

            var arr1 = JSON.parse(localStorage.getItem('totalIncome'))
            for (var i in arr1) {
              
                netincome = netincome + parseInt(arr1[i])
            }
        }

        this.setState({
            netIncome: netincome
        })

        if (localStorage.getItem('totalExpense') !== null) {
            var arr2 = JSON.parse(localStorage.getItem('totalExpense'))
            for (var j in arr2) {
                netexpense = netexpense + parseInt(arr2[j])
            }
        }

        this.setState({
            netExpense: netexpense
        })

    }

    componentDidMount(){
        
        if(!localStorage.getItem('username')){
            this.props.history.push({
              pathname: "/",
            })
          }
    }

    render() {

        const { classes } = this.props;

        console.log("TOTAL INCOME::::" + this.state.totalIncome);

        console.log("TOTAL EXPENSE::::" + this.state.totalExpense);

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>

                        <div className='titlebar-container'>
                            <Typography variant="h6" noWrap>Monthly Details </Typography>
                        </div>

                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.papers}>
                        <Typography component="h1" variant="h6" align="center">
                            Details of Current Month
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(CurrentMonthDetails);
