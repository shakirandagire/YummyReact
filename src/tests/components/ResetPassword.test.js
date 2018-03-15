import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Register from '../../components/auth/ResetPassword';

const component = shallow(<Register />);
const preventDefault = jest.fn();

describe('<ResetPassword />', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render pagination', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have reset password method', () => {
    expect(component.instance().handleResetPassword({ preventDefault }));
  });
});
