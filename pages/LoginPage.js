import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput} from 'react-native';
import { observer } from 'mobx-react';
import UserStore from '../src/store/UserStore';
import { toJS } from "mobx";
import { useNavigation } from '@react-navigation/native';

const LoginPage = ( {navigation} ) => {


    const [email, onChangeEmail] = React.useState(UserStore.user.email);
    const [password, onChangePassword] = React.useState(UserStore.user.password);

    return (
        <View style={styles.container}>
            <Text>LoginPage</Text>

            <TextInput
                style={styles.input}
                placeholder='введите email'
                name = 'email'
                //value = { UserStore.user.email }
                //onChange = { (e) => UserStore.setUserEmail(e.target)}
                onChangeText={onChangeEmail}
                value={email}
            />
            
            <TextInput
                style={styles.input}
                name = 'password'
                placeholder='введите пароль'
                //value = { UserStore.user.password }
                //onChange = { (e) => UserStore.setUserPassword(e.target) }
                onChangeText={onChangePassword}
                value={password}
               
            />
            <Button 
                title="Login"
                onPress={
                    () => {
                        UserStore.login(email, password)
                        //navigation.navigate('PostsPage')
                    }
                }
            />
            
        </View>
    )
}

export default observer (LoginPage);



const styles = StyleSheet.create({
    container: {
        padding: 20,
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
    },
  });