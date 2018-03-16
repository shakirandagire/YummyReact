import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddCategory from '../../components/categories/AddCategory';
import Navigation from '../../components/other/Navigation';


describe('<AddCategory/>', () => {
  const component = shallow(<AddCategory />);
  const preventDefault = jest.fn();
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render add categories', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should have add category method', () => {
    expect(component.instance().handleAddCategory({ preventDefault }));
  });

  it('should have initial state', () => {
    expect(component.state().categoryname).toEqual("");
    expect(component.state().category_description).toEqual("");
  });
  it('renders a form', () => {
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });

  it('should change state', () => {
    component.setState({ categoryname: 'brunch', category_description: 'breakfast and lunch' });
    expect(component.find('[name="categoryname"]').props().value).toEqual('brunch');
    expect(component.find('[name="category_description"]').props().value).toEqual('breakfast and lunch');
  });

  it('should render form inputs', () => {
    expect(component.find('.categoryname').length).toEqual(1);
    expect(component.find('.category_description').length).toEqual(1);
  });
  it('should render <Navigation /> component', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.length).toEqual(1);
  });
});

