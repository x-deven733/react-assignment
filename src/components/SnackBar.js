import React from 'react';
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarWrapper from './SnackBarWrapper'


export default function SnackBar(props) {

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        props.onClose(false)
    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={props.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <SnackBarWrapper
                onClose={handleClose}
                variant={props.type}
                message={props.message}
            />
        </Snackbar>
    )
}

SnackBar.prototypes = {
    type: PropTypes.string,
    open: PropTypes.string,
    message: PropTypes.string,
    onClose:PropTypes.func
}
