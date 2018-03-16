import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Login from '../../components/auth/Login';

const component = shallow(<Login />);
const preventDefault = jest.fn();
describe('<Login/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should render login', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have handle login method', () => {
    expect(component.instance().handleLogin({ preventDefault }));
  });
  it('should have initial state', () => {
    expect(component.state().email).toEqual("");
    expect(component.state().password).toEqual("");
  });
  it('should change state', () => {
    component.setState({ email: 'shakira@gmail.com', password: '1234567' });
    expect(component.find('[name="email"]').props().value).toEqual('shakira@gmail.com');
    expect(component.find('[name="password"]').props().value).toEqual('1234567');
  });
  it('renders a form', () => {
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });

  it('should render form inputs', () => {
    expect(component.find('.email').length).toEqual(1);
    expect(component.find('.password').length).toEqual(1);
  });
});
