import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import EditRecipe from '../../components/recipes/EditRecipe';


describe('<EditRecipe/>', () => {
  const params = {
    match: {
      params: {
        id: 1,
      },
    },
  };
  const preventDefault = jest.fn();
  const component = shallow(<EditRecipe match={{ params }} />);
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render edit recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have edit recipe method', () => {
    expect(component.instance().handleEditRecipe({ preventDefault }));
  });
  it('should have initial state', () => {
    expect(component.state().recipename).toEqual("");
    expect(component.state().recipe_description).toEqual("");
    expect(component.state().instructions).toEqual("");
  });
});
