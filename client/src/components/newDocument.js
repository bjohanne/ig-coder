import React, { useEffect } from "react";

function NewDocumentComponent(props) {
  return (
    <div className="card mx-auto" style={{maxWidth: 800 + "px"}}>
      <div className="card-body p-5 text-center">
        <form className="px-5 py-3">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Document Name"/>
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="6" placeholder="Document Description"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Create New Document</button>
        </form>
      </div>
    </div>
  );
}

export default NewDocumentComponent;
