import React, {useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import { observer } from 'mobx-react';
import PostList from '../components/PostList';
import PostsStore from '../store/PostsStore';
import { StackNavigationProp } from '@react-navigation/stack';
import type {RootStackParamList} from './Home';


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'PostsPage'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
};


const PostsPage = ( { navigation }:Props ) => {

    useEffect( () => {
        PostsStore.getPosts()
    },[])

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.btn}>
                <Button 
                    color='#80bb97'
                    title ="Добавить пост" 
                    onPress = { () => navigation.navigate('AddPost') } 
                />
            </View>
            
            <PostList/>
        </SafeAreaView>
    )
}

export default observer(PostsPage);



const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginBottom: 100,
    },
    btn: {
        marginBottom:30,
    }
  });