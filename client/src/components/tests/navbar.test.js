import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Navbar} from '../common/navbar';

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        userLoggedIn: true
    }

    const wrapper = shallow(<Navbar {...props}/>);

    return {
        wrapper
    };
}

it("renders with static content", () => {
    const {wrapper} = setup();
    expect(wrapper.length).toEqual(1);  // Exactly 1 React node is rendered
    expect(wrapper.contains("IG Coder")).toBe(true);  // The text "IG Coder" is displayed
});
