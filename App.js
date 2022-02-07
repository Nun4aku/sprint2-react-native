import React, { useEffect }from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import PostsStore from './src/store/PostsStore';
import { toJS } from 'mobx';

import Navigate from './navigate';
import Home from './pages/Home';

function App() {


  return (
      <Home />
  );
}

export default observer(App);


