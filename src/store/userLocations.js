const INITIAL_STATE = {
  list: {},
  center: {},
  loaded: false,
};

const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const updateLocation = (data) => ({
  type: UPDATE_LOCATION,
  data,
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      const newUserLocations = {
        ...state,
        [action.data.userId]: action.data.location,
      };
      let center = { latitude: 0, longitude: 0 };
      if (Object.keys(newUserLocations).length) {
        center = Object.values(newUserLocations).reduce(
          (centerSum, user) => ({
            latitude: user.latitude + centerSum.latitude,
            longitude: user.longitude + centerSum.longitude,
          }),
          { latitude: 0, longitude: 0 }
        );
        center.longitude =
          center.longitude / Object.keys(newUserLocations).length;
        center.latitude =
          center.latitude / Object.keys(newUserLocations).length;
      }
      return { list: newUserLocations, center: center, loaded: true };
    default:
      return state;
  }
};
