import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';

import LoginScreen from '../../../src/screens/loginScreen/LoginScreen';
import { Provider } from 'react-redux';

const store = configureStore();

let tree;

beforeEach(() => {
  tree = render(
    <Provider store={store({value: null})}>
      <LoginScreen />
    </Provider>
  );
});

describe('<LoginScreen />', () => {
  it("<LoginScreen /> RENDERS CORRECTLY", () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  
  it("<LoginScreen /> HAS TWO TEXTINPUTS", () => {
    const { getAllByRole } = tree;

    const textInputs = getAllByRole("form");

    expect(textInputs.length).toBe(2);
  });


  it("<LoginScreen /> EMAIL INPUT CHANGE EVENT", () => {
    const { getByTestId } = tree;

    const emailInput = getByTestId("emailInput");

    // expect(emailInput).toBeTruthy();

    fireEvent.changeText(emailInput, "daniel@gmail.com");

    expect(emailInput.props.value).toBe("daniel@gmail.com");
  });


  it("<LoginScreen /> PASSWORD INPUT CHANGE EVENT", () => {
    const { getByTestId } = tree;

    const passwordInput = getByTestId("passwordInput");

    // expect(passwordInput).toBeTruthy();

    fireEvent.changeText(passwordInput, "123456");

    expect(passwordInput.props.value).toBe("123456");
  });


  it("<LoginScreen /> LOGIN BUTTON PRESS EVENT", () => {
    // const mockOnPress = jest.fn();

    const { getByTestId } = tree;

    const loginButton = getByTestId("loginButton");
    
    fireEvent.press(loginButton);

    // expect(mockOnPress).toHaveBeenCalled();
  });
});