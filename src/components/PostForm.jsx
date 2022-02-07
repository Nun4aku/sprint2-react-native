import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

import PostsStore from "../store/PostsStore";
import { observer } from 'mobx-react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";



const PostForm = ( {navigation} ) => {

    

    const [title, onChangeTitle] = useState('');
    const [body, onChangeBody] = useState('');


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                
                onChangeText={onChangeTitle}
                value={title}
            />
            
            <TextInput
                style={styles.input}
                numberOfLines={10}
                multiline={true}

                onChangeText={onChangeBody}
                value={body}
            />
   
            <Button
                color="#62ad80"
                style = {styles.button} 
                title="Создать пост"
                onPress = { 
                    (e) => {
                        e.preventDefault()
                        PostsStore.addPostFunction(title, body)
                        navigation.goBack()
                    }
                 }
            />
            
        </View>
    )
}

export default observer(PostForm);

const styles = StyleSheet.create({
    container: {
        
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderStyle: 'solid',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#66a981',
    },
  });