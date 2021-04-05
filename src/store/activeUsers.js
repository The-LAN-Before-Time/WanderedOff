const INITIAL_STATE = {
  userList: {},
  loaded: false,
};

const SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';
const RESET_ACTIVE_USERS = 'RESET_ACTIVE_USERS';

export const setActiveUsers = (data) => ({
  type: SET_ACTIVE_USERS,
  data,
});

export const resetUsers = () => ({
  type: RESET_ACTIVE_USERS,
});

export default (state = INITIAL_STATE, action) => {
  let max = 0;
  switch (action.type) {
    case SET_ACTIVE_USERS:
      Object.entries(action.data).forEach(([id, user]) => {
        if (!state.userList[id]) {
          Object.values(state.userList).forEach((userData) => {
            if (userData.index > max) {
              max = userData.index;
            }
          });
          max++;
          action.data[id].index = max;
        } else {
          action.data[id].index = state.userList[id].index;
        }
      });
      return { userList: action.data, loaded: true };
    case RESET_ACTIVE_USERS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
