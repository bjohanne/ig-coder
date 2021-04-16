import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {IDocument} from "../../../core/model/interfaces";
import {loadDocumentFromString, setSaved} from "../../../state/documents/actions";
import getDateYYYYMMDDHHMM from "../../../core/helpers/date";
import "./statementAccordion.css";

interface IProps {
    currentDocument: IDocument | null,
    loadDocumentFromString: Function,
    setSaved: Function
}

const DocumentActionBar = (props: IProps) => {
    const {
        currentDocument,
        loadDocumentFromString,
        setSaved
    } = props;

    const fileDownloadLink = useRef(null);
    const [fileName, setFileName] = useState<string>("");
    const [fileDownloadUrl, setFileDownloadUrl] = useState<string>("");

    const fileInput = useRef(null);
    const [loadFileFeedback, setLoadFileFeedback] = useState<string>("");
    const [fileIsLoading, setFileIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (fileDownloadUrl !== "") {    // When the URL is set, we can download the file
            fileDownloadLink.current.click();
            setSaved();                             // Set the changed flag to false
            URL.revokeObjectURL(fileDownloadUrl);   // Cleanup
            setFileDownloadUrl("");
            setFileName("");
        }
    }, [fileDownloadUrl, setFileDownloadUrl, setSaved]);

    const handleSaveFile = () => {
        // Generate filename. It contains the document name but whitespace is replaced with underscores.
        const documentNameUnderscore = currentDocument.name.replace(/\s/g,"_");
        setFileName("IGC_" + documentNameUnderscore + "_" + getDateYYYYMMDDHHMM(new Date()) + ".json");
        const jsonString = JSON.stringify(currentDocument, undefined, 2);
        const blob = new Blob([jsonString], {type: "application/json"});
        setFileDownloadUrl(URL.createObjectURL(blob));  // The download process continues in useEffect()
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

    const useExport = false;    // Flag to hide the export button until it's implemented

    const handleExportUIMACAS = () => {
    }

    const handleExportShorthand = () => {
    }

    return (
        <>
            <ButtonGroup>
                <DropdownButton menuAlign="right" id="savefile-dropdown" title="Load file" as={ButtonGroup}
                                className="d-inline-block">
                    <Form>
                        <Dropdown.ItemText role="menuitem"> {/* LOAD */}
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
                <Button title="Save the document to a JSON file" onClick={handleSaveFile}> {/* SAVE */}
                    Save file
                </Button>
                {useExport &&
                <DropdownButton menuAlign="right" id="export-dropdown" title="Export" as={ButtonGroup}
                                className="d-inline-block">
                    <Dropdown.Item onClick={handleExportUIMACAS} title="Export the document to a file" role="menuitem">
                        UIMA CAS
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleExportShorthand} title="Export the document to a file" role="menuitem">
                        Shorthand
                    </Dropdown.Item>
                </DropdownButton>
                }
            </ButtonGroup>
            {/* Hidden download link */}
            <a style={{display: "none"}}
               download={fileName}
               href={fileDownloadUrl}
               ref={fileDownloadLink}
            >Save file</a>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documents.currentDocument
});

const mapDispatchToProps = (dispatch: any) => ({
    loadDocumentFromString: (documentString: string, onSuccess: Function, onError: Function) =>
        dispatch(loadDocumentFromString(documentString, onSuccess, onError)),
    setSaved: () => dispatch(setSaved())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentActionBar);
