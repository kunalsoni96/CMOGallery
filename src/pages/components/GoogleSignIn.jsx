import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import commonStyle from './Style';
import { GoogleImg } from '../assets';
const { height, width } = Dimensions.get('window');

const GoogleSignIn = () => {
  return (
    <View style={commonStyle.section}>
    <TouchableOpacity onPress={() => {}} style={commonStyle.googleBtn}> 
            <Image source={GoogleImg} />
            <Text> Sign In With Google</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  
});

export default GoogleSignIn;
