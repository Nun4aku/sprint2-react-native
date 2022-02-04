import React, { useEffect }from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import PostsStore from './src/store/PostsStore';
import { toJS } from 'mobx';

import Navigate from './navigate';

function App() {

  useEffect( () => {
    setTimeout ( async() => {
      PostsStore.getPosts()
    }, 1000)
  },[])


  return (
      <Navigate />
  );
}

export default observer(App);


