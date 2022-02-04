import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import { Button } from "react-native-web";
import PostList from '../src/components/PostList';
import PostsStore from '../src/store/PostsStore';


const PostsPage = ( { navigation } ) => {

    const loadScene = () => {
        navigation.navigate('AddPost')
    }

    return (
        <View style={styles.container}>
            <Button title ="Добавить пост" onPress = {loadScene} />

            <PostList postArr={PostsStore.posts} />
        </View>
    )
}

export default observer (PostsPage);



const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    
  });