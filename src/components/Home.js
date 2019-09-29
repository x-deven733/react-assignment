import React, { Component } from 'react';
import {Button,CssBaseline,Typography,Container,AppBar,Toolbar} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TimelineIcon from '@material-ui/icons/Timeline';


class Home extends Component {

    componentDidMount(){
        if(!localStorage.getItem('loggedIn')){
            this.props.history.push({
                pathname: "/",
            })
        }
    }

    handleTransaction = () => {
        this.props.history.push({
            pathname: "/transaction_details",
        })
    }

    handlePassbook = () => {
        this.props.history.push({
            pathname: "/passbook",
        })
    }

    handleMonthlyDetails = () => {
        this.props.history.push({
            pathname: "/monthly_details",
        })
    }

    handleLogout = () => {
        localStorage.removeItem('loggedIn');
       this.props.history.push({
           pathname:"/"
       })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <div className='titlebar-container'>
                            <Typography variant="h6" noWrap>Home</Typography>
                            <Button className={classes.textbutton} onClick={this.handleLogout}>Logout</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="xs" style={{ backgroundColor: '#50d07d' }}>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" style={{ paddingTop: 10,color:'white',fontSize:22 }}>
                            <b>Finance Manager</b>
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleTransaction}
                        >
                        <PaymentIcon className={classes.icon_style} />
                            ADD TRANSACTION
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handlePassbook}
                        >
                        <AccountBalanceWalletIcon className={classes.icon_style} />
                            VIEW PASSBOOK
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleMonthlyDetails}
                        >
                        <TimelineIcon className={classes.icon_style}/>
                            CURRENT MONTH DETAILS
                        </Button>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Home);