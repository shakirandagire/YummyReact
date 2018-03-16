import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
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
  it('should change state', () => {
    component.setState({ categoryname: 'brunch', category_description: 'breakfast and lunch' });
    expect(component.find('[name="categoryname"]').props().value).toEqual('brunch');
    expect(component.find('[name="category_description"]').props().value).toEqual('breakfast and lunch');
  });
  it('renders a form', () => {
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });
});

