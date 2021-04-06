const locationArray = [
  { latitude: 45.2760692, longitude: -111.4316507 },
  { latitude: 45.2763292, longitude: -111.4292199 },
  { latitude: 45.2763997, longitude: -111.4269786 },
  { latitude: 45.2774515, longitude: -111.4230361 },
  { latitude: 45.2780184, longitude: -111.4190212 },
  { latitude: 45.2790281, longitude: -111.4145694 },
  { latitude: 45.2811146, longitude: -111.4104974 },
  { latitude: 45.2812254, longitude: -111.4063222 },
  { latitude: 45.2824668, longitude: -111.4043243 },
];

let users = {
  1: {
    userId: '1',
    fullName: 'Freddy Dunst',
    status: 'active',
    notify: false,
  },
  2: {
    userId: '2',
    fullName: 'Jenny Sampson',
    status: 'active',
    notify: false,
  },
  3: {
    userId: '3',
    fullName: 'Brenda Bushwick',
    status: 'active',
    notify: false,
  },
  4: {
    userId: '4',
    fullName: 'Leonard Henderson',
    status: 'active',
    notify: false,
  },
};

const randomLocationNear = (location, meters) => {
  return {
    latitude: location.latitude + (2 * Math.random() - 1) * meters * 0.0000089,
    longitude:
      location.longitude +
      ((2 * Math.random() - 1) * meters * 0.0000089) /
        Math.cos(location.latitude * 0.018),
  };
};

const demoFunction = (steps, distance) => {
  let demoArray = [];
  for (let i = 0; i < locationArray.length - 1; i++) {
    for (let step = 0; step < steps; step++) {
      let currentLocation = {
        latitude:
          locationArray[i].latitude +
          ((locationArray[i + 1].latitude - locationArray[i].latitude) * step) /
            steps,
        longitude:
          locationArray[i].longitude +
          ((locationArray[i + 1].longitude - locationArray[i].longitude) *
            step) /
            steps,
      };
      // console.log('current location: ', currentLocation)
      let newUsers = {};
      let max = i > 0 ? 4 : 3;
      for (let id = 1; id <= max; id++) {
        newUsers[id] = Object.assign({}, users[id]);
        newUsers[id].location = randomLocationNear(currentLocation, distance);
      }
      if (i >= 7) {
        newUsers[4] = demoArray[demoArray.length - 1][4];
      }
      demoArray.push(newUsers);
    }
  }
  return demoArray;
};

export default demoFunction;
