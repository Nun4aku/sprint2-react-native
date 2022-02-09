import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput} from 'react-native';
import { observer } from 'mobx-react';
import UserStore from '../src/store/UserStore';


const LoginPage = () => {

    const [email, onChangeEmail] = React.useState(UserStore.user.email);
    const [password, onChangePassword] = React.useState(UserStore.user.password);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='введите email'
                onChangeText={onChangeEmail}
                value={email}
            />
            
            <TextInput
                style={styles.input}
                placeholder='введите пароль'
                onChangeText={onChangePassword}
                value={password}
               
            />
            <Button
                color='#80bb97'
                title="Login"
                onPress={
                    () => {
                        UserStore.login(email, password)
                    }
                }
            />
        </View>
    )
}

export default observer (LoginPage);


const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderStyle: 'solid',
        borderRadius: 10,
        alignSelf: 'stretch'
    },
  });