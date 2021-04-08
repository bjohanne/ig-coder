import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {loadDocumentFromString} from "../../../state/documents/actions";
import "./statementAccordion.css";

interface IProps {
    loadDocumentFromString: Function
}

const DocumentActionBar = (props: IProps) => {
    const {
        loadDocumentFromString
    } = props;

    const fileInput = useRef(null);
    const [loadFileFeedback, setLoadFileFeedback] = useState<string>("");
    const [fileIsLoading, setFileIsLoading] = useState<boolean>(false);

    const handleSaveFile = () => {
    }

    const handleLoadFile = () => {
        const input = fileInput.current; // shorthand
        if ("files" in input) {
            if (input.files.length === 0) {
                setLoadFileFeedback("Please select a file.");
            } else {
                const file = input.files[0];            // Start reading the file
                setLoadFileFeedback("");
                setFileIsLoading(true);
                const reader = new FileReader();
                reader.readAsText(file);

                reader.onload = () => {                 // Success reading
                    setFileIsLoading(false);
                    setLoadFileFeedback("Upload successful.");

                    loadDocumentFromString(reader.result,   // Send read string to be constructed into a Document
                        () => {                             // Success callback
                            setLoadFileFeedback("File successfully loaded.");
                        },
                        () => {                             // Error callback
                            setLoadFileFeedback("Sorry, the file is invalid and could not be loaded.");
                        }
                    );
                };
                reader.onerror = () => {                // Error with reading
                    setFileIsLoading(false);
                    setLoadFileFeedback("Error reading the file. Please try again.");
                    console.error(reader.error);
                };
            }
        } else {    // 'files' property not supported
            if (input.value === "") {
                setLoadFileFeedback("Please select a file.");
            } else { // If the browser does not support the files property, it will return the path of the selected file instead.
                setLoadFileFeedback("Sorry, the 'files' property is not supported by your browser.");
            }
        }
    }

    const handleExportUIMACAS = () => {
    }

    const handleExportShorthand = () => {
    }

    return (
        <ButtonGroup>
            <DropdownButton id="savefile-dropdown" title="Load file" as={ButtonGroup} className="d-inline-block">
                <Form>
                    <Dropdown.ItemText role="menuitem">
                        <Form.Group>
                            <span>
                                Choose a .json file to load. Warning: Loading a file<br/>
                                will overwrite any existing work.
                            </span>
                            <Form.File id="formcontrol-fileupload" ref={fileInput} label="" />
                        </Form.Group>
                    </Dropdown.ItemText>
                    <Dropdown.ItemText role="menuitem">
                        <Button title="Load a document from a JSON file" role="menuitem"
                                onClick={handleLoadFile} disabled={fileIsLoading}>
                            Upload
                        </Button>
                        <span className="ml-2">{loadFileFeedback}</span>
                    </Dropdown.ItemText>
                </Form>
            </DropdownButton>
            <Button onClick={handleSaveFile} title="Save the document to a JSON file">
                Save file
            </Button>
            <DropdownButton id="export-dropdown" title="Export" as={ButtonGroup} className="d-inline-block">
                <Dropdown.Item onClick={handleExportUIMACAS} title="Export the document to a file" role="menuitem">
                    UIMA CAS
                </Dropdown.Item>
                <Dropdown.Item onClick={handleExportShorthand} title="Export the document to a file" role="menuitem">
                    Shorthand
                </Dropdown.Item>
            </DropdownButton>
        </ButtonGroup>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    loadDocumentFromString: (documentString: string, onSuccess: Function, onError: Function) =>
        dispatch(loadDocumentFromString(documentString, onSuccess, onError))
});

export default connect(
    null,
    mapDispatchToProps
)(DocumentActionBar);
