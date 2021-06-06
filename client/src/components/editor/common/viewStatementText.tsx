import React, {useEffect, useRef} from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {Entry} from "../../../core/model/entry";

interface IProps extends React.HTMLProps<HTMLElement> {
    currentEntry: Entry
}

const ViewStatementText = (props: IProps) => {
    const {currentEntry, className} = props;

    const statementTextArea = useRef(null);

    useEffect(() => {
        if (statementTextArea.current) {
            // For the textarea that displays the statement, adapt the number of rows to the length of the statement
            statementTextArea.current.rows = 1;
            if (statementTextArea.current.scrollHeight > 36) {
                statementTextArea.current.rows = ((statementTextArea.current.scrollHeight - 12) / 24);
            }
        }
    }, []); // Run only once on mount

    return (
        <Row className={className}>
            <Col>                                                   {/* Use rephrased if set, otherwise original */}
                <Form.Control as="textarea" ref={statementTextArea} id="statement-textarea" disabled
                              value={currentEntry.rephrased !== "" ?
                                  `[${currentEntry.rephrased}]` : currentEntry.original}/>
            </Col>
        </Row>
    )
}

export default connect(
    null,
    null
)(ViewStatementText);

