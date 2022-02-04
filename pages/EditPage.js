import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput} from 'react-native';
import { observer } from 'mobx-react';
import PostsStore from '../src/store//PostsStore';

const EditPage = ( { navigation } ) => {

    
    return (
        <View style={styles.container}>
            <Text>Редактируем пост ID: {PostsStore.editPostID}</Text>

            
            <TextInput 
                style={styles.input}
                name = 'title'
                value = {PostsStore.onePost.title}
            />
            <TextInput 
                multiline={true}
                numberOfLines={20}
                style={styles.input}
                name = 'body'
                value = {PostsStore.onePost.body}
            />
            
        </View>
    )
}

export default observer (EditPage);



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