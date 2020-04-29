import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Login, Register, Dashboard } from './screens'
import { Text, View, StyleSheet } from 'react-native';
import store from './store';

import * as session from './services/session';
import * as routeHistoryActions from './services/routeHistory/actions';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState();
  const routeStack = [
    { name: 'Login', component: Login },
    { name: 'Register', component: Register },
    { name: 'Dashboard', component: Dashboard },
  ];

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (store.getState().services.persist.isHydrated) {
        unsubscribe();
        autoLogin();
      }
    });
  });

  const autoLogin = () => {
    session.refreshToken().then(() => {
      setInitialRoute(routeStack[2]);
    }).catch(() => {
      setInitialRoute(routeStack[0]);
    });
  }

  const renderContent = () => {
    if (!initialRoute) {
      return <Text>Loading...</Text>;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRoute={initialRoute}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        {renderContent()}
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});

export default App;
