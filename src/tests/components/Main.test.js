import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Main from '../../components/other/Main';

const component = shallow(<Main />);

describe('<Main/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render main', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should login on click', () => {
    component.find('.btn-default .login').simulate('click');
  });
  it('should register on click', () => {
    component.find('.btn-default .register').simulate('click');
  });
});
