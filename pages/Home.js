import React from "react";
import PostsPage from "./PostsPage";
import AddPost from "./AddPost";
import EditPage from './EditPage';
import LoginPage from './LoginPage';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';

//import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserStore from "../src/store/UserStore";
import { observer } from 'mobx-react';

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
    return (
        <NavigationContainer>
                <Drawer.Navigator>
                {
                    UserStore.isAuth ? (
                        <>
                            <Drawer.Screen
                                name="PostsPage"
                                component={PostsPage}
                                options={ 
                                            { 
                                                title: 'Все посты',
                                                headerStyle: { backgroundColor: '#62ad80' },
                                                headerTitleStyle: { color: '#fff'},
                                                headerRight: () => (
                                                    <>
                                                        <View style={styles.btn}>
                                                            <Button
                                                                color="#80bb97"
                                                                title="logout"
                                                                onPress={
                                                                    () => {
                                                                        UserStore.logout()
                                                                    }
                                                                }
                                                            />
                                                        </View>
                                                        <View style={styles.btn}>
                                                            <Button
                                                                color="#80bb97"
                                                                title="logout"
                                                                onPress={
                                                                    () => {
                                                                        navigation.openDrawer();
                                                                    }
                                                                }
                                                            />
                                                        </View>
                                                    </>
                                                ),
                                            }
                                }
                            />
                            <Drawer.Screen
                                name="AddPost"
                                component={AddPost}
                                options={ 
                                            { 
                                                title: 'Добавить пост',
                                                headerStyle: { backgroundColor: '#62ad80' },
                                                headerTitleStyle: { color: '#fff'}
                                            }
                                }
                            />
                            <Drawer.Screen
                                name="EditPage"
                                component={EditPage}
                                options={ 
                                            { 
                                                title: 'Редактировать пост',
                                                headerStyle: { backgroundColor: '#62ad80' },
                                                headerTitleStyle: { color: '#fff'}
                                            }
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Drawer.Screen
                                name="LoginPage"
                                component={ LoginPage }
                                options={ 
                                            { 
                                                title: 'Войти',
                                                headerStyle: { backgroundColor: '#62ad80' },
                                                headerTitleStyle: { color: '#fff'}
                                            }
                                }
                            />
                        </>
                    )
                }
                </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default observer(Home);


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    btn: {
        marginHorizontal: 15,
    },
  });