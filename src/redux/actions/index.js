export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

const submitLoginForm = (email) => ({
  type: LOGIN_SUBMIT,
  email,
});

export default submitLoginForm;
