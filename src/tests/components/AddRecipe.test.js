import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddRecipe from '../../components/AddRecipe';


const component = shallow(<AddRecipe />);

describe('<AddRecipe/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render add recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
