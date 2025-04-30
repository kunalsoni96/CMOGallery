import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import colors from '../../constants/color';
const {height, width} = Dimensions.get('window')
const LoaderScreen = ({show}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotate = () => {
      rotateAnim.setValue(0); 
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => rotate()); 
    };
    rotate(); 

    return () => rotateAnim.stopAnimation();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.borderCover}>

        </View>
      <Animated.View style={[styles.loaderBorder, { transform: [{ rotate: spin }] }]} />
      {show !='nope' &&
      <>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: 'https://shabdateer.com/wp-content/uploads/2024/04/ewojiiru_400x400-3.jpg',
          }}
          style={styles.profileImage}
        />
      </View>
     
      <View style={styles.textArea}>
        <Text style={styles.searchText}>Searching Related Photo...</Text>
      </View>
      
      <View style={{...styles.textArea, top:height/1.2}}>
        <Text style={{...styles.searchText, fontSize:14}}>The latest AI image search.</Text>
      </View>
      </>
      }
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    width:width,
    height:height,
    elevation:500
  },
  loaderBorder: {
    width: 100,  
    height: 100, 
    borderRadius: 70, 
    borderWidth: 14,
    borderColor: 'transparent',
    borderTopColor: `${colors.primary}`,
    borderRightColor:`${colors.primary}`,
    borderBottomColor: 'transparent', 
    borderLeftColor: 'transparent',
    position: 'absolute',
    zIndex:5,
    elevation:5,
    marginTop:26
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent:'center',
    zIndex: 1, 
    alignItems:'center'
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  borderCover:{
    position:'absolute', 
    width:102, 
    height:102, 
    backgroundColor:'#ececec',
    borderRadius:50, 
    marginTop:23
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
