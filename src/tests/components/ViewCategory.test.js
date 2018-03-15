import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViewCategory from '../../components/ViewCategory';

const component = shallow(<ViewCategory />);
const preventDefault = jest.fn();

describe('<ViewCategory/>', () => {
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
});

