import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViewRecipes from '../../components/ViewRecipe';

describe('<ViewRecipes/>', () => {
  const params = {
    match: {
      params: {
        id: 1,
      },
    },
  };
  const preventDefault = jest.fn();
  const component = shallow(<ViewRecipes match={{ params }} />);
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render view recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have get recipes method', () => {
    expect(component.instance().getRecipes({ preventDefault }));
  });
  it('should have delete recipe method', () => {
    expect(component.instance().deleteRecipes({ preventDefault }));
  });
  it('should have handle page method', () => {
    expect(component.instance().handlePage({ preventDefault }));
  });
});

