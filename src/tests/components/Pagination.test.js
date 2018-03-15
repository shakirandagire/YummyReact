import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Pagination from '../../components/Pagination';

const component = shallow(<Pagination />);

describe('<Pagination/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render pagination', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

