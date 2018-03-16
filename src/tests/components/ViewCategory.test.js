import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import ViewCategory,{ Category } from '../../components/categories/ViewCategory';
import EditCategory from '../../components/categories/EditCategory';
import Navigation from '../../components/other/Navigation';

describe('<ViewCategory/>', () => {
  const component = shallow(<ViewCategory />);
  const preventDefault = jest.fn();

  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render view categories', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should have get categories method', () => {
    expect(component.instance().getCategories({ preventDefault }));
  });
  it('should have edit categories method', () => {
    expect(component.instance().editCategories({ preventDefault }));
  });
  it('should have delete categories method', () => {
    expect(component.instance().deleteCategories({ preventDefault }));
  });
  it('should have handle page method', () => {
    expect(component.instance().handlePage({ preventDefault }));
  });
  it('should have initial state', () => {
    expect(component.state().categories).toEqual([]);
    expect(component.state().q).toEqual("");
    expect(component.state().perPage).toEqual(6);
    expect(component.state().total).toEqual("");
  });
});

describe('<Category/>', () => {
  const params = {
    match: {
      params: {
        category_id: 1,
      },
    },
  };
  const preventDefault = jest.fn();
  const component = shallow(<Category />);
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render view categories', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should delete on click', () => {
    component.find('.btn-danger .delete').simulate('click');
  });
  it('should edit on click', () => {
    component.find('.btn-success .edit').simulate('click');
  });
  it('should delete on click', () => {
    component.find('.btn-success .add').simulate('click');
  });
  it('should edit on click', () => {
    component.find('.btn-success .view').simulate('click');
  });
  it('should edit on click', () => {
    const wrapper = shallow(<EditCategory match={{ params }} />);
    component.find('.btn-success .edit').simulate('click');
    expect(wrapper.instance().handleEditCategory({ preventDefault }));
  });

  it('should render <Navigation /> component', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.length).toEqual(1);
  });
});
