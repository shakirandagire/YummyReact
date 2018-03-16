import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViewRecipes, { Recipe } from '../../components/recipes/ViewRecipe';
import EditRecipe from '../../components/recipes/EditRecipe';

describe('<ViewRecipes/>', () => {
  const params = {
    match: {
      params: {
        category_id: 1,
      },
    },
  };

  const preventDefault = jest.fn();
  const component = shallow(<ViewRecipes match={{ params }} />);
  it('should render view recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
//   it('should have get recipes method', () => {
//     expect(component.instance().getRecipes({ preventDefault }));
//   });
//   it('should have delete recipe method', () => {
//     expect(component.instance().deleteRecipes({ preventDefault }));
//   });
//   it('should have handle page method', () => {
//     expect(component.instance().handlePage({ preventDefault }));
//   });

//   it('should have initial state', () => {
//     expect(component.state().recipes).toEqual([]);
//     expect(component.state().q).toEqual("");
//     expect(component.state().perPage).toEqual(6);
//     expect(component.state().total).toEqual("");
//   });
});

describe('<Recipe />', () => {
  const params = {
    match: {
      params: {
        category_id: 1,
      },
    },
  };

  const preventDefault = jest.fn();
  const component = shallow(<Recipe />);
  it('should render view recipes', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  // it('should edit on click', () => {
  //   const wrapper = shallow(<EditRecipe match={{ params }} />);
  //   component.find('.btn-success .edit').simulate('click');
  //   expect(wrapper.instance().handleEditRecipe({ preventDefault }));
  // });
});

