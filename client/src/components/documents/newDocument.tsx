import React from "react";
import Spinner from "react-bootstrap/Spinner";
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button,
    TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@material-ui/core';
import Form from "react-bootstrap/Form";
import { VisibilityType } from "../../core/config/enums";

export function NewDocument(props) {
    const {
        loading,
        dialogOpen,
        handleClose,
        data,
        handleChange,
        submitButton,
        handleSubmit
    } = props;

    return (
        <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title"
            maxWidth="sm" fullWidth>
            <Form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Create a new document</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Document name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        required
                        name="name"
                        onChange={handleChange}
                    />
                    <FormControl variant="outlined" className="mt-1" fullWidth required>
                        <InputLabel id="select-visibility-label">
                            Select visibility for the document
                        </InputLabel>
                        <Select
                            labelId="select-visibility-label"
                            label="Select visibility for the document"
                            name="visibility"
                            onChange={handleChange}
                            value={data.visibility}
                        >
                            <MenuItem value="" disabled><em>Visibility</em></MenuItem>
                            <MenuItem value={VisibilityType.private}>Private (project members only)</MenuItem>
                            <MenuItem value={VisibilityType.internal}>Internal (signed in users only)</MenuItem>
                            <MenuItem value={VisibilityType.public}>Public (anyone)</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline={true}
                        rows={6}
                        variant="outlined"
                        name="description"
                        onChange={handleChange}
                    />
                    <FormHelperText
                        id="component-error-text"
                        style={{display:props.data.isFail?'block':'none'}}
                        error={props.data.isFail}>{props.data.failText}
                    </FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" ref={submitButton} color="primary">
                        Confirm
                        {loading && <Spinner animation="border" variant="primary" size="sm"
                            className="ml-3" role="status" />}
                    </Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
}

export default NewDocument;
