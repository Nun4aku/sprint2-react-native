import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

import PostsStore from "../store/PostsStore";
import { observer } from 'mobx-react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";



const PostForm = ( {navigation} ) => {

    

    const [valueTitle, onChangeTextTitle] = useState('Title');
    const [valueBody, onChangeTextBody] = useState('Body');


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='название поста'
                name = 'title'
                value = {PostsStore.addPost.title}
                onChange = { (e) => PostsStore.setAddPostTitle( e.target ) }
            />
            
            <TextInput
                style={styles.input}
                numberOfLines={10}
                multiline={true}

                name = 'body'
                placeholder='текст поста'
                value = {PostsStore.addPost.body}
                onChange = { (e) => PostsStore.setAddPostBody( e.target ) }
               
            />
            <Button
                color="#62ad80"
                style = {styles.button} 
                title="Создать пост"
                onPress = { 
                    (e) => {
                        e.preventDefault()
                        PostsStore.addPostFunction(valueTitle, valueBody)
                        //navigation.goBack()
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