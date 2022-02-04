import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { observer } from 'mobx-react';
import PostForm from '../src/components/PostForm';

const AddPost = ( {navigation} ) => {
    return (
        <View style={styles.container}>
            <PostForm navigation={navigation}/>
            
        </View>
    )
}

export default observer (AddPost);



const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    
  });