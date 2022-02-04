
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList} from 'react-native';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import PostsStore from '../store/PostsStore';



const PostList =  ( {postArr, navigation} ) => {

    

    return (
        <View style={styles.container}>
            
                <FlatList 
                    data={postArr} 
                    renderItem={ 
                        ( {item} )  => (
                                            <TouchableOpacity key={item.id}>
                                                <View style = {styles.post}>  
                                                    <Text>ID:{item.id}</Text>
                                                    <Text style = {styles.title}>{item.title}</Text>
                                                    <Text>{item.body}</Text>
                                                    <Button 
                                                        title='Edit' 
                                                        id={item.id} 
                                                        onPress={ 
                                                            () => { 
                                                                    navigation.navigate('EditPage')
                                                                    PostsStore.editPostID = item.id
                                                                    PostsStore.getOnePost(item.id)
                                                            }
                                                        }
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        )
                    } 
                />
            
        </View>
  )
}

export default observer (PostList);



const styles = StyleSheet.create({
    container: {
        
    },
    ViewTitle: {
        paddingBottom: 20,
        paddingTop: 20,
        fontSize: 16,
    },
    post: {
        backgroundColor: '#fff',
        marginVertical: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderStyle: 'solid',
        borderRadius: 10,
    },
    title: {
        paddingBottom: 20,
        paddingTop: 10,
        fontSize: 22,
    },
  });