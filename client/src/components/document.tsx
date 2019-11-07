import './document.css'
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getDocument, saveDocumentRequest} from "../state/actions";
// import NewEntryEditor from "./editor/newEntry";
// import Accordion from "./units/accordion";
import Document from "../core/model/document";


interface IDocumentEditorProps {
    document: Document,
    getDocument: Function,
    saveDocumentRequest: Function,
    match: any
}

export function DocumentComponent(props: IDocumentEditorProps) {  // Also export the unconnected component for testing
    // TODO: Update getDocument() params when new document is created?
    const {getDocument, match: {params: {id}}} = props;
    useEffect(() => getDocument(id), [getDocument, id]);

    const save = () => {
        props.saveDocumentRequest(props.document);
    };

    return (
        props.document &&
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="card-title">{props.document.documentTitle}</h2>
                        <small className="text-muted">{props.document.documentDescription}</small>
                    </div>
                    <div className="col-md-6 text-right">
                        <a href={`/documents/${props.document.documentId}/entries/new`}
                            className="btn btn-success">Create New Entry
                        </a>
                        {/*<NewEntryEditor*/}
                        {/*    toggle={(show: any) => <button type="button" className="btn btn-success"*/}
                        {/*                                   onClick={show}>Create New Entry</button>}*/}
                        {/*    content={(hide: any) => (*/}
                        {/*        <>*/}
                        {/*            <Accordion close={hide} documentId={props.document.id}/>*/}
                        {/*        </>*/}
                        {/*    )}*/}
                        {/*/>*/}
                    </div>
                </div>

                <div className="card-body" id="accordion-root">
                </div>
            </div>

            <div className="card-body entry-table">
                {/*TODO: Remove this with actual generated table once we have real data*/}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Content</th>
                            <th scope="col">Parent</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</td>
                            <td>N/A</td>
                            <td>
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-primary btn-block">View</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-success btn-block">Edit</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-danger btn-block">Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</td>
                            <td><a href={"#"}> Entry 1 / Condition</a></td>
                            <td>
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-primary btn-block">View</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-success btn-block">Edit</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-danger btn-block">Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</td>
                            <td><a href={"#"}> Entry 2 / Object</a></td>
                            <td>
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-primary btn-block">View</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-success btn-block">Edit</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-danger btn-block">Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    document: state.reducer.document,
    entries: state.reducer.entries
});

const mapDispatchToProps = (dispatch: any) => ({
    getDocument: (document_id: any) => dispatch(getDocument(document_id)),
    saveDocumentRequest: (document: any) => dispatch(saveDocumentRequest(document))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentComponent);
