import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Register from '../../components/Register';

const component = shallow(<Register />);
const preventDefault = jest.fn();

describe('<Register/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render pagination', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have add recipe method', () => {
    expect(component.instance().handleRegister({ preventDefault }));
  });
});
