

const styles = (theme) => ({
    '@global': {
        body: {
            backgroundColor: '#50d07d'
        },
    },
    root: {
        width: '100%'
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
        width: '80%'
    },
    login: {
        margin: theme.spacing(3, 0, 2),
    },
    close: {
        padding: theme.spacing(0.5),
    },
    appBar: {
        position: 'relative',
        width: "100%"
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
    thismonth_layout:{
        width:'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    thismonth_papers:{
        width: '50%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
            width:'100%'
        },
    },
    card: {
        width:'50%',
        marginRight: '5px',
        marginTop: '10px',
        overflowX:'auto'
       
    },
    title: {
        fontSize: 14,
    },
    papers: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        overflowX: 'auto',
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    submits: {
        margin: theme.spacing(2, 1, 1),
        width: "40%",
    },
   
    passbooklayout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    passbooksubmit: {
        margin: theme.spacing(3, 2, 2),
        width: 'auto'
    },
    
   
    icon_style: {
        margin: theme.spacing(1),
    },
    textbutton: {
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },

});

export default styles;