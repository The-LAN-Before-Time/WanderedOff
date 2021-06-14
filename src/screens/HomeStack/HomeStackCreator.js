import { LoginScreen, RegistrationScreen, TabbedNavigator } from '../index';
import { connect } from 'react-redux';

const HomeStack = ({ auth }) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer test='test'>
      <Stack.Navigator
        initialRouteName={auth.uid ? 'Tabbed Nav' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name='Tabbed Nav'
          options={{
            headerLeft: () => {
              return null;
            },
          }}
        >
          {(props) => <TabbedNavigator {...props} token={expoPushToken} />}
        </Stack.Screen>
        <Stack.Screen name='Login'>
          {(props) => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name='Registration'>
          {(props) => <RegistrationScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(HomeStack);
