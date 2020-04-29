import React, { PropTypes } from 'react';
import { Text, View, Button } from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import * as session from '../services/session';

const Login = ({ navigation, goTo }) => {
    const login = () => {
        dismissKeyboard();
        session.authenticate('user1@facebook.com', '12345678')
            .then(() => {
                goTo('dashboard');
            })
            .catch((exception) => {
                console.log(exception);
            });
    }
    return (
        <View>
            <Button title="login" onPress={login} />
            <Button title="signup" onPress={() => goTo('register')} />
        </View>
    );
}

export default Login;