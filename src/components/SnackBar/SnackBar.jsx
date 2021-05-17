import React from 'react';
import { Snackbar } from '@material-ui/core';

const CustomSnackbar = (props) => {
    const [open, setOpen] = React.useState(props.open);

    const ChangeState = () => {
        if (open !== props.open)
            setOpen(props.open)
    }

    React.useEffect(() => {
        ChangeState()
    }, [props.open])

    const handleClose = (event, reason) => {
        props.close();
        setOpen(!open)
    };

    return (
        <Snackbar
            autoHideDuration={3000}
            open={props.open}
            onClose={handleClose}
            message={props.message}
        />
    )

}
export default CustomSnackbar;