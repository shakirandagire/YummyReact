import React from 'react';
import Login from '../../components/login';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

const component = shallow(< Login/>);
describe('<Login/>',() => {
  it('should render properly', () =>{
    expect(component.length).toBe(1)
  })
  it('should render login',() =>{
    expect(shallowToJson(component)).toMatchSnapshot();
})

})