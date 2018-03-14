import React from 'react';
import EditCategory from '../../components/editcategories';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';



describe('<EditCategory/>',() => {
    const params = {
        match: {
            params: {
              id: 1,
            },
          },
        };
  const component = shallow(< EditCategory match={{params}}/>);
  it('should render properly', () =>{
    expect(component.length).toBe(1)
  })

  it('should render edit categories',() =>{
    expect(shallowToJson(component)).toMatchSnapshot();
})

})

