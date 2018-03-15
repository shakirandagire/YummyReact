import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import EditCategory from '../../components/categories/EditCategory';

describe('<EditCategory/>', () => {
  const params = {
    match: {
      params: {
        id: 1,
      },
    },
  };

  const component = shallow(<EditCategory match={{ params }} />);
  const preventDefault = jest.fn();
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render edit categories', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should have edit category method', () => {
    expect(component.instance().handleEditCategory({ preventDefault }));
  });
  it('should have initial state', () => {
    expect(component.state().categoryname).toEqual("");
    expect(component.state().category_description).toEqual("");
  });
});

