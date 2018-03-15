import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddCategory from '../../components/AddCategory';

const component = shallow(<AddCategory />);
describe('<AddCategory/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render view categories', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

