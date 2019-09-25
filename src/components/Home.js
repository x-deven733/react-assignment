import React, { Component } from 'react';
import {Button,CssBaseline,Typography,Container,AppBar,Toolbar} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';


class Home extends Component {

    constructor(props) {
        super(props)
        this.handleTransaction = this.handleTransaction.bind(this);
        this.handlePassbook = this.handlePassbook.bind(this);
        this.handleMonthlyDetails = this.handleMonthlyDetails.bind(this);
    }

    handleTransaction() {
        this.props.history.push({
            pathname: "/transaction_details",
        })
    }

    handlePassbook() {
        this.props.history.push({
            pathname: "/passbook",
        })
    }

    handleMonthlyDetails() {
        this.props.history.push({
            pathname: "/monthly_details",
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="#50d07d" className={classes.appBar}>
                    <Toolbar>
                        <div className='titlebar-container'>
                            <Typography variant="h6" noWrap>Home</Typography>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white' }}>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" style={{ paddingTop: 10 }}>
                            Finance Manager
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleTransaction}
                        >
                            ADD TRANSACTION
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handlePassbook}
                        >
                            VIEW PASSBOOK
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleMonthlyDetails}
                        >
                            CURRENT MONTH DETAILS
                        </Button>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Home);