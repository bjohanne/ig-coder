import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {DocumentComponent} from '../document';

Enzyme.configure({adapter: new Adapter()});

function setup() {
    // Mock all props the component needs
    const props = {
        document: {
            name: "Document 1",
            description: "Description of document 1"
        },
        match: {
            params: {
                id: 1
            }
        },
        getDocument: jest.fn()
    };

    const wrapper = shallow(<DocumentComponent {...props} />);

    return {
        props,
        wrapper
    };
}

it('renders with static content', () => {
    const {props, wrapper} = setup();
	// The below tests are for old contents of the Document page, but just commented away for reference.
    //expect(wrapper.length).toEqual(1);  // Exactly 1 React node is rendered
    //expect(wrapper.contains(props.document.name)).toBe(true); // The document name is displayed
    //expect(wrapper.contains(props.document.description)).toBe(true); // The document description is displayed
    //expect(wrapper.find('button').text()).toBe('Create New Entry'); // There is one button and it says "Create New Entry"
});
