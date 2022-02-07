import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput} from 'react-native';
import { observer } from 'mobx-react';
import PostsStore from '../src/store//PostsStore';
import { toJS } from "mobx";

const EditPage = ( { navigation } ) => {

    
    const [title, onChangeTextTitle] = useState(PostsStore.onePost.title)
    const [body, onChangeTextBody] = useState(PostsStore.onePost.body)

    return (
        <View style={styles.container}>
            <Text>Редактируем пост ID: {PostsStore.editPostID}</Text>

            
            <TextInput 
                name='title'
                style={styles.input}
                value = {title}
                onChangeText={onChangeTextTitle}
                
            />
            <TextInput
                name='body'
                multiline={true}
                numberOfLines={20}
                style={styles.input}
            
                value = {body}
                onChangeText={onChangeTextBody}
                
            />
            <Button
                color="#62ad80"
                title="Изменить" 
                onPress={
                    () => {
                        PostsStore.editOnePost(title, body)
                        navigation.goBack()
                    }
                }
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