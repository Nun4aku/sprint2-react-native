import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import { observer } from 'mobx-react';
import PostList from '../src/components/PostList';
import PostsStore from '../src/store/PostsStore';
import EditPage from './EditPage';

const PostsPage = ( { navigation } ) => {

    const loadScene = () => {
        navigation.navigate('AddPost')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.btn}>
                <Button title ="Добавить пост" onPress = {loadScene} />
            </View>
            

            <PostList postArr={PostsStore.posts} navigation={navigation}/>
        </SafeAreaView>
    )
}

export default observer (PostsPage);



const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginBottom: 100,
    },
    btn: {
        marginBottom:30,
    }
  });