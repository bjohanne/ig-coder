import React from "react";
import { connect } from "react-redux";
import { addDocument } from "../state/actions";

export function NewDocumentComponent(props) {

  function submitDocument(e) {
    e.preventDefault();
    var form = document.getElementById("newDocumentForm");
    if (form.checkValidity()) { // Check for required fields etc.
      var formData = new FormData(form);
      props.addDocument(formData);
      // TODO: Wait for response, then redirect with new ID
    }
  }

  return (
    <div className="card mx-auto" style={{maxWidth: 800 + "px"}}>
      <div className="card-body p-5 text-center">
        <form className="px-5 py-3" id="newDocumentForm">
          <div className="form-group">
            <input type="text" className="form-control" name="name" placeholder="Document Name" required/>
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="6" name="description" resize="vertical" placeholder="Document Description" required></textarea>
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
