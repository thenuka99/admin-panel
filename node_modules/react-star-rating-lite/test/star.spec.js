import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Star from '../src/star.js';

describe('Star Test Cases', function() {
  it('Should render the component with filled stars', function() {
    let wrapper = shallow(<Star {...{index: 3,hoverIndex: 4, weight:30, color:'orange'}}/>);
    expect(wrapper.find('span').length).toBe(1);
  });
  it('Should render the component with non filled starts', function() {
    let wrapper = shallow(<Star {...{index: 4,hoverIndex: 3, weight:30, color:'orange'}}/>);
    expect(wrapper.find('span').length).toBe(1);
  });
  it('Should render the component with proper props', function() {
    let wrapper = shallow(<Star {...{index: 4,hoverIndex: 3, weight:30, color:'orange'}}/>);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('span').props()['data-index']).toBe(4);
    expect(wrapper.find('svg').props()['width']).toBe(30);
  });
});
