import React, {useState, useRef} from "react";
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {addEntryToDocument} from "../../state/actions";
import Chevron from "./chevron";
import Toggle from "react-toggle";
import "./accordion.css";

let newEntryRoot: HTMLElement | null;

const Accordion = (props: any) => {
    const [setActive, setActiveState] = useState("active");
    const [setHeight, setHeightState] = useState("500px");
    const [setRotate, setRotateState] = useState("accordion__icon");
    const [hasDeontic, setHasDeontic] = useState(false);
    const [entryContent, setContent] = useState("");

    const content = useRef<HTMLDivElement>(null);

    const toggleAccordion = () => {
        setActiveState(setActive === "" ? "active" : "");
        setRotateState(setActive === "active" ? "accordion__icon" : "accordion__icon rotate");
        if (content.current !== null) {
            setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        }
    };

    const save = () => {
        // send as action and close - when the state gets updated with a new entry, it appears in the entries list
        let payload = {documentId: props.documentId, content: entryContent, hasDeontic: hasDeontic};
        props.addEntryToDocument(payload);
        props.close();
    };

    const changeDeontic = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasDeontic(!!e.currentTarget.value);
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
                        <Chevron className={`${setRotate}`} width={10} fill={"#777"}/>
                        <strong className="accordion__title">#1</strong>
                    </button>
                    <Toggle
                        id='has-deontic-status'
                        defaultChecked={hasDeontic}
                        aria-labelledby='biscuit-label'
                        onChange={changeDeontic} />
                    <span id='biscuit-label'>Has deontic</span>
                </div>
                <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion__content">
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
                        <button type="button" className="btn btn-success" onClick={save}>Save</button>
                    </div>
                    <div className="accordion__button">
                        <button type="button" className="btn btn-success" onClick={props.close}>Cancel</button>
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
