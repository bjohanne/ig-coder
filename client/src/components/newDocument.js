import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addDocument } from "../state/actions";

export function NewDocumentComponent(props) {
  /**
    Submits the "Create New Document" form.
    If the form is invalid (e.g. required fields not filled),
    the form is not submitted.
  */
  function submitDocument(e) {
    e.preventDefault();
    const form = document.getElementById("newDocumentForm");
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        description: formData.get("description")
      }
      props.addDocument(data);
    }
  }

  useEffect(() => {
    if (props.addedDocument.id) { // A document has been set in state (not null)
      window.location.href = `/documents/${props.addedDocument.id}`;  // Redirect to the newly created document
    }
  });

  return (
    <div className="card mx-auto" style={{maxWidth: 800 + "px"}}>
      <div className="card-body p-5 text-center">
        <form className="px-5 py-3" id="newDocumentForm">
          <div className="form-group">
            <input type="text" className="form-control" name="name" placeholder="Document Name" required/>
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="6" name="description" resize="vertical" placeholder="Document Description"></textarea>
          </div>
          <button type="submit" className="btn btn-primary" onClick={submitDocument}>Create New Document</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  addedDocument: state.reducer.document
});

const mapDispatchToProps = dispatch => ({
  addDocument: (documentData) => dispatch(addDocument(documentData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDocumentComponent);
