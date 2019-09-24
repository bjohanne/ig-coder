import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewDocumentComponent from '../newDocument';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(<NewDocumentComponent />);

  return {
    wrapper
  };
}

it('renders with static content', () => {
  const { wrapper } = setup();
  expect(wrapper.length).toEqual(1);  // Exactly 1 React node is rendered
  expect(wrapper.find('input[type="text"][placeholder="Document Name"]').length).toEqual(1); // There is one input for document name
  expect(wrapper.find('textarea[placeholder="Document Description"]').length).toEqual(1); // There is one textarea for document description
  expect(wrapper.find('button').text()).toBe('Create New Document'); // There is one button and it says "Create New Document"
});
