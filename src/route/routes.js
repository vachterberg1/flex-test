import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Feed from '../components/Feed'
import Home from '../components/Home'


export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="home" component={Home}/>
                <AppStack.Screen name="feed" component={Feed}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}