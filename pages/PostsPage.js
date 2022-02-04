import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import { Button } from "react-native-web";
import PostList from '../src/components/PostList';
import PostsStore from '../src/store/PostsStore';
import EditPage from './EditPage';

const PostsPage = ( { navigation } ) => {

    const loadScene = () => {
        navigation.navigate('AddPost')
    }

    return (
        <View style={styles.container}>
            <View style={styles.btn}>
                <Button title ="Добавить пост" onPress = {loadScene} />
            </View>
            

            <PostList postArr={PostsStore.posts} navigation={navigation}/>
        </View>
    )
}

export default observer (PostsPage);



const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    btn: {
        marginBottom:30,
    }
  });