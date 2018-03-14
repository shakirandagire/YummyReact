import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import EditRecipe from '../../components/editrecipes';


describe('<EditRecipe/>', () => {
  const params = {
    match: {
      params: {
        id: 1,
      },
    },
  };
  const component = shallow(<EditRecipe match={{ params }} />);
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render edit recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
