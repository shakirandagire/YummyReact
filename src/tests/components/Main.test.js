import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Main from '../../components/main';

const component = shallow(<Main />);

describe('<Main/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });

  it('should render main', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

