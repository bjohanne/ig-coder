import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../common/navbar';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(<Navbar />);

  return {
    wrapper
  };
}

it('renders with static content', () => {
  const { wrapper } = setup();
  expect(wrapper.length).toEqual(1);  // Exactly 1 React node is rendered
  expect(wrapper.contains("IG Coder")).toBe(true);  // The text "IG Coder" is displayed
  expect(wrapper.contains("Home")).toBe(true);  // The text "Home" is displayed
  expect(wrapper.find('input[type="text"][placeholder="Search"]').length).toEqual(1); // There is one search bar
});
