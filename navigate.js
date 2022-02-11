import React from "react";
import PostsPage from "./pages/PostsPage";
import AddPost from "./pages/AddPost";
import EditPage from './pages/EditPage';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function Navigate() {
    return (
        <NavigationContainer>
                <Stack.Navigator >
                    <Stack.Screen
                        name="PostsPage"
                        component={PostsPage}
                        options={ 
                            { 
                                title: 'Все посты',
                                headerStyle: { backgroundColor: '#62ad80' },
                                headerTitleStyle: { color: '#fff'}
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

                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigate;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    
  });