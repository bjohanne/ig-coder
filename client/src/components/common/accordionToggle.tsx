import React, {useState} from "react";
import {useAccordionToggle} from "react-bootstrap";

import "./accordionToggle.css";
import Card from "react-bootstrap/Card";
import Chevron from "../units/chevron";

interface IProps extends React.HTMLProps<HTMLElement> {
    eventKey: string,
    // Text to be shown on the header
    text?: string,
    // Whether this AccordionToggle is first in a stack of AccordionToggles
    isLast?: boolean,
    // Whether this accordion should start open or closed
    openByDefault?: boolean
}

/*
    A custom toggle bar for React-Bootstrap Accordions. The entire bar is clickable.
    Displays a Chevron (small arrow) that rotates based on state, and optionally passed in text.
    Has a prop to tell whether the accordion is open by default, but you must set defaultActiveKey
    on the parent Accordion element separately, and ensure the two match.
*/
export function AccordionToggle(props: IProps) {
    const {eventKey, text, isLast, openByDefault} = props;

    const [toggleState, setToggleState] = useState(openByDefault);
    const [chevronClassName, setChevronClassName] = useState(
        (openByDefault) ? "accordion-icon rotate" : "accordion-icon");

    const decoratedOnClick = useAccordionToggle(eventKey, () => {
        setToggleState(!toggleState);
        setChevronClassName(toggleState ? "accordion-icon" : "accordion-icon rotate");
    });

    return (
        <>
            <Card.Header onClick={decoratedOnClick} className="toggle-header">
                <Chevron className={chevronClassName} width={10} fill={"rgb(129, 144, 165)"}/>
                {text && <span className="ml-3 toggle-header-text">{text}</span>}
            </Card.Header>
            {(!isLast && !toggleState) && <hr className="toggle-divider"/>}
        </>
    );
}

export default AccordionToggle;
