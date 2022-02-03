import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

import PostsStore from "../store/PostsStore";
import { observer } from 'mobx-react';

const PostForm = ( {create} ) => {

    const [text, setValue] = useState('')
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='название поста'
                name = 'title'
                //value = {PostsStore.addPost.title}
                onChange = { (e) => PostsStore.setAddPostTitle( e.target ) }
            />
            
            <TextInput
                style={styles.input}
                numberOfLines={10}
                multiline={true}

                name = 'body'
                placeholder='текст поста'
                onChange = { (e) => PostsStore.setAddPostBody( e.target ) }
               
            />
            <Button 
                style = {styles.button} 
                title="Создать пост" 
                onPress={ 
                            (e) =>  { 
                                        e.preventDefault();
                                        PostsStore.addPostFunction()
                                    } 
                        }
            />
        </View>
    )
}

export default observer(PostForm);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
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