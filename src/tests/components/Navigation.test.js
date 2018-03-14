import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Navigation from '../../components/Navigation';

const component = shallow(<Navigation />);
describe('<Navigation/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render navigation', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

