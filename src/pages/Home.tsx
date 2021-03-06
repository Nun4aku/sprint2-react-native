import React from "react";
import PostsPage from "./PostsPage";
import AddPost from "./AddPost";
import EditPage from './EditPage';
import LoginPage from './LoginPage';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import UserStore from "../store/UserStore";
import { observer } from 'mobx-react';

export type RootStackParamList = {
    PostsPage: undefined,
    AddPost: undefined,
    EditPage: undefined,
    LoginPage: undefined,
    Profile: { name: string };
  };

const Stack = createStackNavigator<RootStackParamList>();


function Home(): JSX.Element {
    return (
        <NavigationContainer>
                <Stack.Navigator>
                {
                    UserStore.isAuth ? (
                        <>
                            <Stack.Screen
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
                                                    </>
                                                ),
                                            }
                                }
                            />
                            <Stack.Screen
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
                            <Stack.Screen
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
                            <Stack.Screen
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
                </Stack.Navigator>
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