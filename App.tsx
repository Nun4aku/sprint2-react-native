import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Home from './pages/Home';


function App(): JSX.Element {

  return(
    <>
      <Home />
    </>
  );
}

export default observer(App);


