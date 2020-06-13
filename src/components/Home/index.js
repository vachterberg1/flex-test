import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {View, TouchableOpacity, Image, Text} from 'react-native'

import styles from './styles'

export default function Home(){

    const navigation = useNavigation();

    function navigateToFeed(){
        navigation.navigate('feed')
    }

    return(
        <View style={styles.container}>
            <Image  style={styles.logo} source={{uri: 'https://media.glassdoor.com/sqll/1048135/flex-contact-center-squarelogo-1576647816123.png'}}/>
            <TouchableOpacity onPress={navigateToFeed} style={styles.bgButton}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>       
        </View>
    )
}