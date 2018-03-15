import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Login from '../../components/auth/Login';

const component = shallow(<Login />);
const preventDefault = jest.fn();
describe('<Login/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render login', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have handle login method', () => {
    expect(component.instance().handleLogin({ preventDefault }));
  });
});
