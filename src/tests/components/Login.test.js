import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Login from '../../components/login';

const component = shallow(<Login />);
describe('<Login/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render login', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
