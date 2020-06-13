import React, {useEffect, useState} from 'react'

import {View, Text, Image, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Alert, AsyncStorage} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

import styles from './styles'

export default function Feed(){

    const [notices, setNotices] = useState({
        title: "",
        news: "",
        author: ""
    });
    const [newNotices, setNewNotices] = useState('');

    async function addNotice() {

        if(newNotices === ""){
            return;
        }

        const search = notices.filter(notices => notices === newNotices);

        if(search.length !== 0) {
            Alert.alert("Atenção", "Essa notícia está repetida");
            return;
        }


        setNotices([...notices, newNotices]);
        setNewNotices('');

        Keyboard.dismiss();


    } 


    async function removeNotice(item){

        Alert.alert("Deletar notícia",
                    "Tem certeza que deseja remover essa notícia?",
                    [
                        {
                            text: "Cancelar", 
                            onPress: () => {
                                return;
                            },
                            style: 'cancel'
                        },
                        {
                            text: "Confirmar",
                            onPress: () => setNotices(notices.filter(notices => notices !== item ))
                        }
                    ]
        )

    }

    useEffect(() => {
        async function carregaDados(){
            const notices = await AsyncStorage.getItem("notices");

            if(notices){
                setNotices(JSON.parse(notices))
            }
        }

        carregaDados();
    }, [])

    useEffect(() => {
        async function salvarDados(){
            AsyncStorage.setItem("notices", JSON.stringify(notices))
        }

        salvarDados();
    }, [notices, ])

    return(
     <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{flex: 1}}
        enabled={Platform.OS === 'ios'}
     >
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: 'https://media.glassdoor.com/sqll/1048135/flex-contact-center-squarelogo-1576647816123.png'}}/>

            <View style={styles.search}>
                <TextInput
                    placeholder="Procurar notícias"
                    style={styles.inputSearch}
                />
            </View>

            <FlatList
                style={styles.notices}
                data={notices}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.mainNotices}>
                        <Text>{item}</Text>
                        <TouchableOpacity
                            onPress={() => removeNotice(item)}
                        >
                            <MaterialIcons name="delete-forever" size={20} color="red"/>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.form}>
                <Text style={styles.formTextCall}>Adicione sua notícia</Text>
                <TextInput style={styles.formName} onChangeText={text => setNewNotices(text)} value={newNotices}placeholder="Título da notícia"/>
                <TextInput style={styles.formName} placeholder="Autor"/>
                <TextInput style={styles.formText} placeholder="Digite sua notícia"/>
                <TouchableOpacity
                    style={styles.buttonMain}
                    onPress={() => addNotice()}
                >
                    <Text style={styles.buttonForm}>Enviar</Text>
                </TouchableOpacity>
            </View>


        </View>
     </KeyboardAvoidingView>  
    )
}