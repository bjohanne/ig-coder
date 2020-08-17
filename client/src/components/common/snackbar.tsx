import React from "react";
import {connect} from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {closeSnackbar} from "../../state/ui/actions";

/*
    Material UI snackbar.

    This component is used in App.tsx to handle all snackbars (only one at a time).
    If we want to show multiple snackbars at once, snackbar stacking isn't supported
    out of the box.
*/

export function SnackbarComponent(props) {
    const {snackbarOpen, snackbarMessage, snackbarColor, snackbarDuration, closeSnackbar} = props;

    return (
        <Snackbar open={snackbarOpen} autoHideDuration={snackbarDuration} onClose={closeSnackbar}>
            <MuiAlert elevation={6} variant="filled" severity={snackbarColor} onClose={closeSnackbar}>
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
    )
}

const mapStateToProps = (state: any) => ({
    snackbarOpen: state.ui.snackbarOpen,
    snackbarMessage: state.ui.snackbarMessage,
    snackbarColor: state.ui.snackbarColor,
    snackbarDuration: state.ui.snackbarDuration
});

const mapDispatchToProps = (dispatch: any) => ({
    closeSnackbar: () => dispatch(closeSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SnackbarComponent);
