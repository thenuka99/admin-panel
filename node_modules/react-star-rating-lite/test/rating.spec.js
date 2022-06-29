import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Rating from '../src/rating.js';

describe('Rating Test Cases', function() {
  it('Should render the component', function() {
    let wrapper = shallow(<Rating/>).find('.react-star-rating-lite');
    expect(wrapper.exists()).toBe(true);
  });
  it('Should render the component with props', function() {
    let wrapper = shallow(<Rating {...{value:2,weight:30,readonly:false,color:'orange',onClick: function(){}}}/>);
    let container = wrapper.find('.react-star-rating-lite');
    expect(container.exists()).toBe(true);
    container.children().simulate('click',{target:{tagName: 'SPAN',getAttribute:(attr) => 2}});
  });
  it('Should render the component with props and simulate onclick', function() {
    let wrapper = shallow(<Rating {...{value:2,weight:30,readonly:false,color:'orange',onClick: function(){}}}/>);
    let container = wrapper.find('.react-star-rating-lite');
    expect(container.exists()).toBe(true);
    container.children().simulate('click',{target:{tagName: 'SVG',parentNode:{target:{tagName:'SVG',getAttribute:(attr) => 2}}}});
  });
  it('Should render the component with props and simulate mouseleave', function() {
    let wrapper = shallow(<Rating {...{value:2,weight:30,readonly:false,color:'orange',onClick: function(){}}}/>);
    let container = wrapper.find('.react-star-rating-lite');
    expect(container.exists()).toBe(true);
    container.children().simulate('mouseleave');
  });
  it('Should render the component with props and simulate mouseover', function() {
    let wrapper = shallow(<Rating {...{value:2,weight:30,readonly:false,color:'orange',onClick: function(){}}}/>);
    let container = wrapper.find('.react-star-rating-lite');
    expect(container.exists()).toBe(true);
    container.children().simulate('mouseover',{target:{tagName: 'SPAN',getAttribute:(attr) => 2}});
  });
});
