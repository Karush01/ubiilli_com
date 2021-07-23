import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        borderBottom: "1px solid #E1E1E1"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


export default withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>

            <IconButton
                onClick={onClose}
                aria-label="close"
                className={classes.closeButton}>
                <CloseIcon/>
            </IconButton>

        </MuiDialogTitle>
    );
});





