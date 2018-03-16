import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Register from '../../components/auth/ResetPassword';

const component = shallow(<Register />);
const preventDefault = jest.fn();

describe('<ResetPassword />', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render pagination', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have reset password method', () => {
    expect(component.instance().handleResetPassword({ preventDefault }));
  });
  it('should have initial state', () => {
    expect(component.state().email).toEqual("");
    expect(component.state().new_password).toEqual("");
    expect(component.state().security_question).toEqual("");
    expect(component.state().security_answer).toEqual("");
  });
  it('should change state', () => {
    component.setState({ email: 'shakira@gmail.com', new_password: '1234567', security_question: "food", security_answer: "rice" });
    expect(component.find('[name="email"]').props().value).toEqual('shakira@gmail.com');
    expect(component.find('[name="new_password"]').props().value).toEqual('1234567');
    expect(component.find('[name="security_question"]').props().value).toEqual('food');
    expect(component.find('[name="security_answer"]').props().value).toEqual('rice');
  });
  it('renders a form', () => {
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });
});
