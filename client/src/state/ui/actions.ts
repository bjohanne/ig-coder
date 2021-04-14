export const OPEN_SNACKBAR = "OPEN_SNACKBAR";
export const openSnackbar = () => {
    return {
        type: "OPEN_SNACKBAR"
    }
};

export const OPEN_SNACKBAR_WITH_DUR = "OPEN_SNACKBAR_WITH_DUR";
export const openSnackbarWithDur = (duration: number) => {
    return {
        type: "OPEN_SNACKBAR_WITH_DUR",
        duration
    }
};

export const OPEN_SNACKBAR_WITH_DATA = "OPEN_SNACKBAR_WITH_DATA";
export const openSnackbarWithData = (color: string, message: string, duration: number) => {
    return {
        type: "OPEN_SNACKBAR_WITH_DATA",
        color,
        message,
        duration
    }
};

export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const closeSnackbar = () => {
    return {
        type: "CLOSE_SNACKBAR"
    }
};
