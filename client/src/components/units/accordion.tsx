import React, {useState, useRef} from "react";
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {addEntryToDocument} from "../../state/actions";
import Chevron from "./chevron";
import Toggle from "react-toggle";
import "./accordion.css";

let newEntryRoot: HTMLElement | null;

/*
	This component governs the Create New Entry form.
*/

const Accordion = (props: any) => {
    const [active, setActiveState] = useState(true);
    const [height, setHeightState] = useState("500px");
    const [rotate, setRotateState] = useState("accordion__icon rotate");
    const [hasDeontic, setHasDeontic] = useState(false);
    const [entryContent, setContent] = useState("");

    const content = useRef<HTMLDivElement>(null);

    const toggleAccordion = () => {
        setActiveState(!active);
        setRotateState(active ? "accordion__icon" : "accordion__icon rotate");
        if (content.current !== null) {
            setHeightState(active ? "0px" : `${content.current.scrollHeight}px`);
        }
    };

    const save = () => {
        // send as action and close - when the state gets updated with a new entry, it appears in the entries list
        let payload = {documentId: props.documentId, content: entryContent, hasDeontic: hasDeontic};
        props.addEntryToDocument(payload);
        props.close();
    };

    const changeDeontic = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasDeontic(e.target.checked);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target;
        setContent(value);
    };

    const RenderAccordion = () => {
        return (
            <div className="accordion__section">
                <div className="accordion-header">
                    <button className="accordion" onClick={toggleAccordion}>
                        <Chevron className={`${rotate}`} width={10} fill={"#777"}/>
                        <strong className="accordion__title">#1</strong>
                    </button>
                    <Toggle
                        id='has-deontic-status'
                        defaultChecked={false}
                        aria-labelledby='biscuit-label'
                        onChange={changeDeontic} />
                    <span id='biscuit-label' className="ml-2">Has a Deontic component</span>
                </div>
                <div ref={content} style={{maxHeight: `${height}`}} className="accordion__content">
                    {props.content &&
                    <div className="accordion__text" dangerouslySetInnerHTML={{__html: props.content}}/>
                    }
                    {!props.content &&
                    <textarea value={entryContent}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
                              className="new-entry-text-area"/>
                    }
                </div>
                <div className="accordion__actionbar">
                    <div className="accordion__button">
                        <button type="button" className="btn btn-primary" onClick={save}>Save</button>
                    </div>
                    <div className="accordion__button">
                        <button type="button" className="btn btn-secondary" onClick={props.close}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    };

    if ((newEntryRoot = document.getElementById('accordion-root')) != null) {
        return ReactDOM.createPortal(RenderAccordion(), newEntryRoot);
    }

    throw new Error("Missing required dom-node for new entry component!")
};

const mapDispatchToProps = (dispatch: any) => ({
    addEntryToDocument: (documentData: any) => dispatch(addEntryToDocument(documentData))
});

export default connect(
    null,
    mapDispatchToProps
)(Accordion);
