import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {DashboardComponent} from '../dashboard';

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
    }

    const wrapper = shallow(<DashboardComponent {...props}/>);

    return {
        wrapper
    };
}

it("renders with static content", () => {
    const {wrapper} = setup();
    expect(wrapper.length).toEqual(1);  // Exactly 1 React node is rendered
    expect(wrapper.contains("The making of IG Coder")).toBe(true);  // The text "The making..." is displayed
    expect(wrapper.contains("Policy Coding - We're trying to make it work!")).toBe(true);  // The text "Policy..." is displayed
    expect(wrapper.find("Button").text()).toBe("Browse your projects"); // There is one button and it says "Browse your projects"
});
