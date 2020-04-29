import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Login, Register, Dashboard } from './screens'
import { Text, View, StyleSheet } from 'react-native';
import store from './store';

import * as session from './services/session';
import * as routeHistoryActions from './services/routeHistory/actions';


const App = () => {
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(() => {
    console.log('updating roots');
    const unsubscribe = store.subscribe(() => {
      if (store.getState().services.persist.isHydrated) {
        unsubscribe();
        autoLogin();
      }
    });
  });

  const autoLogin = () => {
    session.refreshToken().then(() => {
      goTo('dashboard');
    }).catch(() => {
      goTo('login');
    });
  }

  const goTo = (name) => {
    setCurrentRoute(name);
  }

  const renderContent = () => {
    if (!currentRoute) {
      return <Text>Loading...</Text>;
    }
    if (currentRoute === 'dashboard') {
      return <Dashboard />
    }
    if (currentRoute === 'login') {
      return <Login goTo={goTo} />
    }
    if (currentRoute === 'register') {
      return <Register goTo={goTo} />
    }
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
