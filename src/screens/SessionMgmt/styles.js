import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 6,
  },
  heading: {
    fontSize: 30,
  },
  cog: {
    paddingTop: 5,
  },
  text: {
    fontSize: 20,
    color: '#2e2e2d',
  },
  userName: {
    marginLeft: 30,
    fontSize: 20,
    color: '#2e2e2d',
  },
  paddingLeft: {
    paddingLeft: 20,
  },

  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  userContainer: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    // marginTop: -1
  },
  entityText: {
    fontSize: 20,
    color: '#333333',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  sessionName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    height: 47,
    padding: 13,
    borderRadius: 5,
    backgroundColor: '#0061b2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  circleGreen: {
    marginRight: 10,
    width: 15,
    height: 15,
    borderRadius: 150 / 2,
    backgroundColor: '#198754',
  },
  circleRed: {
    marginRight: 10,
    width: 15,
    height: 15,
    borderRadius: 150 / 2,
    backgroundColor: '#d9202b',
  },
  label_underline: {
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    fontWeight: 'bold',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
});
