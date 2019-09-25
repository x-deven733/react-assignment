

const styles = (theme) => ({
    '@global': {
        body: {
            backgroundColor: '#50d07d',
        },
    },
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    appBar: {
        position: 'relative',

    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    submits: {
        margin: theme.spacing(3, 3, 3),
        width: "40%",
    },
    papers: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    passbooklayout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: "90%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    passbooksubmit: {
        margin: theme.spacing(3, 2, 2),
        width: '40%'
    },
    card: {
        minWidth: 275,
        marginRight: '5px',
        marginTop: '10px'
    },
    title: {
        fontSize: 14,
    },

});

export default styles;