import React, { useState } from 'react';
import { Image, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, TextInput, FlatList,
  TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import commonStyle from '../components/Style';
import { DownloadFixImg, DownloadImg, ViewMoreImg } from '../assets';
const { width, height } = Dimensions.get("window");

const MyDashboardScreen = () => {
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
      <Header screen='My Downloads' />
        <ScrollView>
        <View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
        </View><View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
        </View><View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
        </View><View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
        </View><View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
        </View><View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
        </View><View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
        </View><View style={commonStyle.section}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:'https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg'}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                    CII Young Indians Conf..
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>02 Nov 2024</Text>
                  </View>

                  <TouchableOpacity style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
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
    marginHorizontal:15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
     width:'93%',
  },
  eventImg:{
    width:width/3.4,
    height:width/3.4,
  },
  left:{
    width:'35%',
  },
  right:{
    width:'65%',
    padding:10
  },
  date:{
    fontSize:12
  },
  viewMore:{
    color:'gray',
    fontSize:12,
    marginTop:4
  }
});

export default MyDashboardScreen;
