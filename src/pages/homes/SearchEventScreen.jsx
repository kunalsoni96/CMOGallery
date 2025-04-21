import React, { useState } from 'react';
import { Image, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, TextInput, FlatList,
  TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import commonStyle from '../components/Style';
const { width, height } = Dimensions.get("window");

const SearchEventScreen = () => {
  const data = [
    { id: 1, uri: "https://indiacsr.in/wp-content/uploads/2024/01/Vishnu-Deo-Sai-Chief-Minister-of-Chhattisgarh-_IndiaCSR.jpg", height: 200 },
    { id: 2, uri: "https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg", height: 250 },
    { id: 3, uri: "https://i.pinimg.com/736x/0a/cf/a0/0acfa0865c9b7315d4d2f2eb50615422.jpg", height: 266 },
    { id: 4, uri: "https://i.pinimg.com/736x/18/b7/e1/18b7e17b779525b3f0c629800f3f623d.jpg", height: 300 },
    { id: 5, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 200 },
    { id: 6, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 250 }
  ];

  const [image, setImage] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Header screen='Search' />
        <View style={commonStyle.section}>
            <TextInput placeholder='Email Id' style={{...commonStyle.textInput, backgroundColor:colors.border}} />
        </View>
        <ScrollView>
        <View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} />
                </View>
                <View style={styles.right}></View>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
  },
  card:{
    flexDirection:"row",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 16,
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
     width:'93%',
     padding:10,
  },
  eventImg:{
    width:width/4,
    height:width/4,
  },
  left:{
    width:'30%',
    borderRadius:10,
    overflow:"hidden"
  },
  right:{
    width:'70%'
  }
});

export default SearchEventScreen;
