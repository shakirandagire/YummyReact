import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Navigation from '../../components/other/Navigation';
import Logout from '../../components/auth/Logout';

const component = shallow(<Navigation />);
describe('<Navigation/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render navigation', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render <Logout /> component', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper.length).toEqual(1);
  });

});

