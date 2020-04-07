import React from "react";

export function NewEntryComponent(props: any) {

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="card-title">{"{Document Name Here}"}</h2>
                        <small className="text-muted">{"{Document Description Here}"}</small>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h2>New Entry goes here</h2>
                <p>First, we display an empty root node using D3</p>
                <p>Second, when user hover over the root node and click edit, the entry editor modal will popup</p>
                <p>Third, when user finish filling in the entry and click save, we repopulate the D3 tree</p>
                <p>
                    Tree JSON and populate code can be found &nbsp;
                    <span>
                        <a href={"https://github.com/bloonguyen1207/d3tree"}>here</a>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default NewEntryComponent;
