
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Button, FlatList} from 'react-native';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import PostsStore from '../store/PostsStore';



const PostList =  ( { navigation } ) => {

    console.log(PostsStore.posts)
    
    return (
        <>
            <View style={styles.sortbox}>
                <View style={styles.sortBtn}>
                    <Button
                        color='#80bb97'
                        title="ID ↑"
                        onPress={
                            () => {
                                PostsStore.sortPostId()
                            }
                        }
                    />
                </View>
                <View style={styles.sortBtn}>
                    <Button
                        color='#80bb97'
                        title="ID ↓"
                        onPress={
                            () => {
                                PostsStore.sortPostIdRev()
                            }
                        }
                    />
                </View>
            </View>
            
        
            

            <FlatList 
                data={toJS(PostsStore.posts)}
                keyExtractor={item => item.id}
                renderItem={ 
                    ( {item} )  => (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={ 
                                                async () => { 
                                                        
                                                        PostsStore.editPostID = item.id
                                                        await PostsStore.getOnePost(item.id)
                                                        navigation.navigate('EditPage')
                                                }
                                            }
                                        >
                                            <View style = {styles.post}>  
                                                <Text>ID:{item.id}</Text>
                                                <Text style = {styles.title}>{item.title}</Text>
                                                <Text style= {styles.body}>{item.body}</Text>
                                                <Button 
                                                    color="#62ad80"
                                                    title='удалить'
                                                    onPress={ 
                                                                () => { 
                                                                    PostsStore.delPost(item.id)
                                                                }
                                                    }
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )
                } 
            />
        </>
  )
}

export default observer(PostList);



const styles = StyleSheet.create({
    post: {
        backgroundColor: '#fff',
        marginVertical: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        paddingBottom: 5,
        marginBottom: 20,
        paddingTop: 10,
        fontSize: 22,
        fontWeight: '500',
        borderBottomColor: '#ededed',
        borderStyle: 'solid',
        borderColor: '#dfdfdf',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        
    },
    body: {
        paddingBottom: 30,
        fontSize: 16,
        textAlign: 'justify',
    },
    sortbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortBtn: {
        paddingRight: 10,
        paddingBottom: 5,
    }
  });