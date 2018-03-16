import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import EditRecipe from '../../components/recipes/EditRecipe';
import Navigation from '../../components/other/Navigation';

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
  it('should render <Navigation /> component', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.length).toEqual(1);
  });
});
