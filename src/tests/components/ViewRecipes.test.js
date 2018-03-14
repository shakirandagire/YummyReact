import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViewRecipes from '../../components/viewrecipes';

describe('<ViewRecipes/>', () => {
  const params = {
    match: {
      params: {
        id: 1,
      },
    },
  };
  const component = shallow(<ViewRecipes match={{ params }} />);
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render view recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

