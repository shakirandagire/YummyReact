import React from 'react';
import Pagination  from '../../components/pagination';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

const component = shallow(< Pagination/>);

describe('<Pagination/>',() => {
  it('should render properly', () =>{
    expect(component.length).toBe(1)
  })
  it('should render pagination',() =>{
    expect(shallowToJson(component)).toMatchSnapshot();
})
})

