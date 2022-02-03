
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { observer, toJS } from 'mobx-react';




const PostList =  ( {postArr} ) => {


    const [modalActive, setModalActive] = useState(false)
    const [modalActiveEdit, setModalActiveEdit] = useState(false)
    const [delID, setDelID] = useState('')
    const [editID, setEditID] = useState('')

    console.log(postArr)

    return (
        <View style={styles.container}>
            <Text style={styles.ViewTitle}>Все посты</Text>
            
                {
                    postArr.map ( t =>
                        <TouchableOpacity key={t.id}>
                            <View style = {styles.post}>  
                                <Text>ID:{t.id}</Text>
                                <Text style = {styles.title}>{t.title}</Text>
                                <Text>{t.body}</Text>
                            </View>
                        </TouchableOpacity>
                    ) 
                }
            
        </View>
  )
}

export default observer (PostList);



const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    ViewTitle: {
        paddingBottom: 20,
        paddingTop: 20,
        fontSize: 16,
    },
    post: {
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