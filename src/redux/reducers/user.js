const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
