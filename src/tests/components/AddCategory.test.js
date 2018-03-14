import React from 'react';
// import ReactDOM from 'react-dom';
import AddCategory from '../../components/addcategories';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

const component = shallow(< AddCategory/>);
describe('<AddCategory/>',() => {
  it('should render properly', () =>{
    expect(component.length).toBe(1)
  })

  it('should render view categories',() =>{
    expect(shallowToJson(component)).toMatchSnapshot();
})
})

