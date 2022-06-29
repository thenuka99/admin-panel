import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Stars from '../src/stars.js';

describe('Stars Test Cases', function() {
  it('Should render the component with stars', function() {
    let wrapper = shallow(<Stars {...{hoverIndex: 4, weight:30, color:'orange'}}/>);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').children().length).toBe(5);
  });
});
