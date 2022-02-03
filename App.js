import React, { useEffect }from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react';
import PostsStore from './src/store/PostsStore';
import PostList from './src/components/PostList';
import PostForm from './src/components/PostForm';


function App() {

  useEffect( () => {
    setTimeout ( async() => {
      PostsStore.getPosts()
    }, 1000)
  },[])


  return (
    <SafeAreaView>
      
      <View style={styles.topMenu}>
        <Text style={styles.topMenuText}>Шапка</Text>
      </View>

      <PostForm />

      <PostList postArr={PostsStore.posts}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default observer(App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topMenu: {
    backgroundColor: '#66a981',
    padding: 22,
  },
  topMenuText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
