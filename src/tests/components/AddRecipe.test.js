import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddRecipe from '../../components/recipes/AddRecipe';

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
  it('should have initial state', () => {
    expect(component.state().recipename).toEqual("");
    expect(component.state().recipe_description).toEqual("");
    expect(component.state().instructions).toEqual("");
  });
  it('should change state', () => {
    component.setState({ recipename: 'brunch', recipe_description: 'breakfast and lunch',instructions: 'Sauages and eggs' });
    expect(component.find('[name="recipename"]').props().value).toEqual('brunch');
    expect(component.find('[name="recipe_description"]').props().value).toEqual('breakfast and lunch');
    expect(component.find('[name="instructions"]').props().value).toEqual('Sauages and eggs');
  });
  it('renders a form', () => {
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });
  it('should render form inputs', () => {
    expect(component.find('.recipename').length).toEqual(1);
    expect(component.find('.recipe_description').length).toEqual(1);
    expect(component.find('.instructions').length).toEqual(1);
  });
});
