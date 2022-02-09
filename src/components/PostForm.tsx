import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

import PostsStore from "../store/PostsStore";
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';



const PostForm = () => {

    const [title, onChangeTitle] = useState('');
    const [body, onChangeBody] = useState('');
    const navigation = useNavigation();
    

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