import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViewCategory from '../../components/ViewCategory';

const component = shallow(<ViewCategory />);

describe('<ViewCategory/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render view categories', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

