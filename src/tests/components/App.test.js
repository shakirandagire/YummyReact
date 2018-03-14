import React from 'react';
import App  from '../../components/App';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

const component = shallow(< App/>);

describe('<App/>',() => {
  it('should render properly', () =>{
    expect(component.length).toBe(1)
  })
  it('should render app',() =>{
    expect(shallowToJson(component)).toMatchSnapshot();
})
})

