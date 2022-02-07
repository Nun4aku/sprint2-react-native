import React, {useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import { observer } from 'mobx-react';
import PostList from '../src/components/PostList';
import PostsStore from '../src/store/PostsStore';
import EditPage from './EditPage';
import UserStore from "../src/store/UserStore";

const PostsPage = ( { navigation } ) => {

    useEffect( () => {
        
        PostsStore.getPosts()

    },[])

    
    const loadScene = () => {
        navigation.navigate('AddPost')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.btn}>
                <Button 
                    color='#80bb97'
                    title ="Добавить пост" 
                    onPress = {loadScene} />
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