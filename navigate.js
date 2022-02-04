import React from "react";
import PostsPage from "./pages/PostsPage";
import AddPost from "./pages/AddPost";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function Navigate() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="PostsPage"
                    component={PostsPage}
                    //options={ { title: 'Главаня' } }
                />
                <Stack.Screen
                    name="AddPost"
                    component={AddPost}
                    //options={ { title: 'Контакты' } }
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigate;