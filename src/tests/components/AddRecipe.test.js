import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddRecipe from '../../components/AddRecipe';



describe('<AddRecipe/>', () => {
  const params = {
    match: {
      params: {
        id: 1,
      },
    },
  };
  const component = shallow(<AddRecipe match={{ params }} />);
  const preventDefault = jest.fn();
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render add recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should have add recipe method', () => {
    expect(component.instance().handleAddRecipe({ preventDefault }));
  });
});
