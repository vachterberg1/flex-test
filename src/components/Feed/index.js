import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  AsyncStorage,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function Feed() {
  // troquei para as notíficas serem uma lista
  const [notices, setNotices] = useState([]);
  // As notificas agora são um objeto
  const [newNotice, setNewNotice] = useState({
    title: '',
    news: '',
    author: '',
  });

  // não precisa de async porque não tem nenhum await na função
  function addNotice() {
    if (newNotice.title === '') {
      return;
    }

    // Essa é uma validação complicada de ser feita.
    // O que eu aconselharia fazer aqui seria comparar apenas o titulo para não ser repetido
    // Vou deixar um exemplo comentado abaixo
    // const search = notices.filter(notice => notice.title === newNotice.title);
    const search = notices.filter(notice => notice === newNotice);

    if (search.length !== 0) {
      Alert.alert('Atenção', 'Essa notícia está repetida');
      return;
    }

    setNotices([...notices, newNotice]);
    setNewNotice({
      title: '',
      news: '',
      author: '',
    });

    Keyboard.dismiss();
  }

  // não precisa de async porque não tem nenhum await na função
  function removeNotice(item) {
    Alert.alert(
      'Deletar notícia',
      'Tem certeza que deseja remover essa notícia?',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            //aqui estarão as notificar filtradas (por boa prática é melhor separar cada coisa no codigo)
            // As notíficas serão filtradas por titulo, pois cada notífica deve ter um titulo diferente
            // Seria bom se você desse um ID para cada notifica, assim seria mais facil remover
            const filteredNotices = notices.filter(
              notice => notice.title !== item.title
            );
            setNotices([...filteredNotices]);
            // return; // talvez falte um return aqui
          },
        },
      ]
    );
  }

  useEffect(() => {
    async function carregaDados() {
      const loadeNnotices = await AsyncStorage.getItem('notices');

      if (notices) {
        setNotices(JSON.parse(loadeNnotices));
      }
    }

    carregaDados();
  }, []);

  useEffect(() => {
    async function salvarDados() {
      AsyncStorage.setItem('notices', JSON.stringify(notices));
    }

    salvarDados();
  }, [notices]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior="padding"
      style={{ flex: 1 }}
      enabled={Platform.OS === 'ios'}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri:
              'https://media.glassdoor.com/sqll/1048135/flex-contact-center-squarelogo-1576647816123.png',
          }}
        />

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
          renderItem={({ item }) => (
            <View style={styles.mainNotices}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => removeNotice(item)}>
                <MaterialIcons name="delete-forever" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.form}>
          <Text style={styles.formTextCall}>Adicione sua notícia</Text>
          <TextInput
            style={styles.formName}
            onChangeText={text => setNewNotice(text)}
            value={newNotice}
            placeholder="Título da notícia"
          />
          <TextInput style={styles.formName} placeholder="Autor" />
          <TextInput style={styles.formText} placeholder="Digite sua notícia" />
          <TouchableOpacity
            style={styles.buttonMain}
            onPress={() => addNotice()}
          >
            <Text style={styles.buttonForm}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
