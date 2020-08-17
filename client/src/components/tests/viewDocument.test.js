import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ViewDocumentComponent} from '../documents/viewDocument';

Enzyme.configure({adapter: new Adapter()});

function setup() {
    // Mock all props the component needs
    const props = {
        currentDocument: {
            name: "Document 1",
            description: "Description of document 1"
        },
        match: {
            params: {
                id: 1
            }
        },
        getDocument: jest.fn(),
        saveDocumentRequest: jest.fn(),
    };

    const wrapper = shallow(<ViewDocumentComponent {...props} />);

    return {
        props,
        wrapper
    };
}

it("renders with static content", () => {
    const {props, wrapper} = setup();
    expect(wrapper.length).toEqual(1);  // Exactly 1 React node is rendered
    expect(wrapper.contains(props.currentDocument.name)).toBe(true); // The document name is displayed
    expect(wrapper.contains(props.currentDocument.description)).toBe(true); // The document description is displayed
});
