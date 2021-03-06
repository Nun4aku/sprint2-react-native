
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Button, FlatList, TextInput, Image, Modal} from 'react-native';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import PostsStore from '../store/PostsStore';
import { NavigationContainerRefContext, useNavigation } from '@react-navigation/native';
import type { addPostInterface, onePostInterface } from '../interfaces/Interfaces';



const PostList =  ():JSX.Element => {

    const navigation = useNavigation();
    const [delModal, setDelModal] = useState(false)
    const [postIdForModal, setPostIdForModal] = useState('')
    const [postTitleForModal, setPostTitleForModal] = useState('')

    return (
        <>
            <View style={styles.sortbox}>
                <View style= {{flexDirection: 'row'}}>
                    {
                        (PostsStore.sortOrderByID =='UP') ? 
                        (
                            <View style={styles.sortBtn}>
                                <Button
                                    color='#80bb97'
                                    title="ID ↑"
                                    onPress={
                                        () => {
                                            PostsStore.sortPostIdRev()
                                        }
                                    }
                                />
                            </View>
                        ) 
                        :
                        (PostsStore.sortOrderByID =='DOWN') ? 
                        (
                            <View style={styles.sortBtn}>
                                <Button
                                    color='#80bb97'
                                    title="ID ↓"
                                    onPress={
                                        () => {
                                            PostsStore.sortPostId()
                                        }
                                    }
                                />
                            </View>
                        )
                        : 
                        (<View></View>)
                        
                    } 
                </View>

                <View>
                    <TextInput 
                        style = {styles.search}
                        value = {PostsStore.searchQuery}
                        onChangeText = { (text) => {
                            PostsStore.setSearchQuery(text)
                            PostsStore.totalPosts
                        }}
                        placeholder="search"
                    /> 
                </View>
            </View>

            
            <FlatList 
                data={toJS(PostsStore.totalPosts)}
                //keyExtractor={item => item.id}
                renderItem={ 
                    ( {item}: {item: onePostInterface} ):JSX.Element  => (
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
                                                <View style = {styles.title_and_logo}>
                                                    <Text style = {styles.title}>{item.title}</Text>
                                                    <View>
                                                        {
                                                            (item.done == true) ?
                                                            (
                                                                <TouchableOpacity 
                                                                    onPress={
                                                                            () => {
                                                                                item.done = false
                                                                                PostsStore.doOnePost(item.id, toJS(item))
                                                                            }
                                                                }>
                                                                    <Image
                                                                        style={styles.logo}
                                                                        source={require('../img/correct.png')}
                                                                    />
                                                                </TouchableOpacity>
                                                            ) : 
                                                            (item.done == false) ? (
                                                                <TouchableOpacity 
                                                                    onPress={
                                                                            () => {
                                                                                item.done = true
                                                                                PostsStore.doOnePost(item.id, toJS(item))
                                                                            }
                                                                }>
                                                                    <Image
                                                                        style={styles.logo}
                                                                        source={require('../img/notOk.png')}
                                                                    />
                                                                </TouchableOpacity>
                                                            ) : (<></>)
                                                        }
                                                    </View>
                                                </View>
                                                
                                                <Text style= {styles.body}>{item.body}</Text>

                                                <Button 
                                                    color="#62ad80"
                                                    title='удалить'
                                                    onPress={ 
                                                                () => { 
                                                                    setDelModal(true)
                                                                    setPostIdForModal(item.id)
                                                                    setPostTitleForModal(item.title)
                                                                }
                                                    }
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )
                } 
            />
            <Modal 
                visible = {delModal} 
            >
                <View style={styles.modal}>
                    <Text style = {styles.title_modal}>Вы точно хоите удалить запись?</Text>
                    <View style = {styles.id_title}>
                        <Text >ID: {postIdForModal}</Text>
                        <Text>Название: {postTitleForModal}</Text>
                    </View>
                    <View style = {styles.delBtn}>
                        <View style = {styles.sortBtn}>
                            <Button 
                                color="#62ad80"
                                title='удалить'
                                onPress={ 
                                            () => { 
                                                PostsStore.delPost(postIdForModal)
                                                setDelModal(false)
                                            }
                                }
                            />
                        </View>
                        <View style = {styles.sortBtn}>
                            <Button
                                title='нет'
                                color="#f16565"
                                onPress={ () => setDelModal(false) }
                            />
                        </View>
                    </View>
                </View>
                
            </Modal>
        </>
  )
}

export default observer(PostList);



const styles = StyleSheet.create({
    modal: {
        flex:1,
        padding: 50,
        display: 'flex',
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    id_title:{
        textAlign: 'left',
        margin: 20,
    },
    delBtn: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    post: {
        backgroundColor: '#fff',
        marginVertical: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    title: {
        paddingBottom: 5,
        paddingTop: 10,
        fontSize: 22,
        fontWeight: '500',
    },
    title_modal: {
        paddingBottom: 5,
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '500',
    },
    body: {
        paddingBottom: 30,
        fontSize: 16,
        textAlign: 'justify',
    },
    sortbox: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortBtn: {
        paddingRight: 10,
        paddingBottom: 5,
    },
    search: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        width: 170,
    },
    logo: {
        width: 25,
        height: 25,
        marginLeft: 20,
      },
    title_and_logo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ededed',
        borderStyle: 'solid',
        borderColor: '#dfdfdf',
        borderBottomWidth: 1,
        marginBottom: 20,
      },
  });