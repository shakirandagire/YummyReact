import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Logout from '../../components/auth/Logout';

describe('<Logout/>', () => {
  const component = shallow(<Logout />);
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render logout', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

