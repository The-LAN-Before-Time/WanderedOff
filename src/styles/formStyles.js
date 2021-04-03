import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    height: 120,
    width: 100,
    alignSelf: 'center',
    margin: 30,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
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
  buttonDanger: {
    marginTop: 20,
    height: 47,
    padding: 13,
    borderRadius: 5,
    backgroundColor: '#d9202b',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonConfirm: {
    marginTop: 20,
    height: 47,
    padding: 13,
    borderRadius: 5,
    backgroundColor: '#198754',
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
  switch: {
    marginLeft: 15,
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingRight: 10,
  },
  errorText: {
    color: '#d9202b',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  }
});
