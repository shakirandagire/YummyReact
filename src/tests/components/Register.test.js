import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Register from '../../components/auth/Register';

const component = shallow(<Register />);
const preventDefault = jest.fn();

describe('<Register/>', () => {
  it('should render properly', () => {
    expect(component.length).toBe(1);
  });
  it('should render pagination', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should have add recipe method', () => {
    expect(component.instance().handleRegister({ preventDefault }));
  });
  it('should have initial state', () => {
    expect(component.state().email).toEqual("");
    expect(component.state().password).toEqual("");
    expect(component.state().security_question).toEqual("");
    expect(component.state().security_answer).toEqual("");
  });
  it('should change state', () => {
    component.setState({ email: 'shakira@gmail.com', password: '1234567', security_question: "food", security_answer: "rice" });
    expect(component.find('[name="email"]').props().value).toEqual('shakira@gmail.com');
    expect(component.find('[name="password"]').props().value).toEqual('1234567');
    expect(component.find('[name="security_question"]').props().value).toEqual('food');
    expect(component.find('[name="security_answer"]').props().value).toEqual('rice');
  });
  it('renders a form', () => {
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });
});
