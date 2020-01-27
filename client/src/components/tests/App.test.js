import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const wrapper = mount(<App/>); // Full rendering with child components

    return {
        wrapper
    };
}

it('renders with necessary content', () => {
    const {wrapper} = setup();
    expect(wrapper.find('Provider').length).toEqual(1); // There is one Provider element
    expect(wrapper.find('Navbar').length).toEqual(1); // There is one Navbar element
    expect(wrapper.find('BrowserRouter').length).toEqual(1);  // There is one BrowserRouter element
    expect(wrapper.find('Switch').length).toEqual(1); // There is one Switch element
});
