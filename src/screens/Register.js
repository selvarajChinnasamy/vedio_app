import React from 'react';
import { Text, Button } from 'react-native';

const Register = ({goTo}) => {
    return (
        <>
        <Text>Register!</Text>
        <Button title="login" onPress={() =>goTo('login')} />
        </>
    );
}

export default Register;