import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddCategory from '../../components/categories/AddCategory';

const component = shallow(<AddCategory />);
const preventDefault = jest.fn();
describe('<AddCategory/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render add categories', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should have add category method', () => {
    expect(component.instance().handleAddCategory({ preventDefault }));
  });

  it('should have initial state', () => {
    expect(component.state().categoryname).toEqual("");
    expect(component.state().category_description).toEqual("");
  });
});

