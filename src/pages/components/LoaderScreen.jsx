import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native'; // Ensure it's installed correctly
import colors from '../../constants/color';

const { height, width } = Dimensions.get('window');

const LoaderScreen = () => {
  useEffect(() => {
    console.log("Animation file loaded");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LottieView
          source={require('./../../images/animation.json')} // Ensure correct path
          autoPlay
          loop
          style={{width:100, height:100}}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.searchText}>Searching Related Photo...</Text>
      </View>
      
      <View style={{...styles.textArea, top:height/1.2}}>
        <Text style={{...styles.searchText, fontSize:14}}>The latest AI image search.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width,
    height: height,
    elevation: 500,
  },

  searchText:{
    color:colors.primary,
    fontWeight:'bold',
    fontSize:10
    },
    textArea:{
    position:'absolute',
    top:height/1.6,
    width:width,
    alignItems:'center'
    },
    bottomText:{
    color:colors.primary,
    fontWeight:'bold',
    fontSize:14,
    }
});

export default LoaderScreen;
