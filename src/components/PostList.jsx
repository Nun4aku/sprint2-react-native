
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';




const PostList =  ( {postArr} ) => {


    const [modalActive, setModalActive] = useState(false)
    const [modalActiveEdit, setModalActiveEdit] = useState(false)
    const [delID, setDelID] = useState('')
    const [editID, setEditID] = useState('')

    /*
    const arrJS = toJS(postArr)
    var copy = Object.assign({}, arrJS);
    console.log(copy)
    */
      

    return (
        <View style={styles.container}>
            
                {
   
                    postArr.map ( elem =>
                        <TouchableOpacity key={elem.id}>
                            <View style = {styles.post}>  
                                <Text>ID:{elem.id}</Text>
                                <Text style = {styles.title}>{elem.title}</Text>
                                <Text>{elem.body}</Text>
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