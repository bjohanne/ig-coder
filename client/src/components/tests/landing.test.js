import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LandingComponent} from '../landing';

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
    }

    const wrapper = shallow(<LandingComponent {...props}/>);

    return {
        wrapper
    };
}

it("renders with static content", () => {
    const {wrapper} = setup();
    expect(wrapper.length).toEqual(1);  // Exactly 1 React node is rendered
    expect(wrapper.contains("Welcome to IG Coder!")).toBe(true);
});
