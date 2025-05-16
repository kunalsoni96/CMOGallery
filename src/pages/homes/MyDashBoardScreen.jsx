import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, FlatList,
  TouchableOpacity, ImageBackground } from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import commonStyle from '../components/Style';
import { DownloadImg } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos, getUserDownloadHistory } from '../../redux/actions/EventAction';
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get("window");

const MyDashboardScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.login.user)
  const loader = useSelector(state=>state.login.loading)
  const userDownloadHistory = useSelector(state=>state.event.userDownloadHistory)
  const isFocused = useIsFocused();
  useEffect(()=>{
    dispatch(getUserDownloadHistory(user.userId))

    if (isFocused) {
      console.log('Screen is focused');
    }
  },[isFocused])

  const downloadHandle = async() => {
      let data = await dispatch(getPhotos({id:item._id, limit:'full', page:2}));
      
      if(data?.payload){
       let result = data?.payload?.data?.photos?.map((value)=>{
          return value.image
        })

        await downloadAndZipImages(result)
      }
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
                <View style={styles.left}>
                    <ImageBackground 
                    imageStyle={{ borderRadius: 15 }} 
                    style={styles.eventImg}
                    source={{uri:item?.image}} >
                      <View style={{...commonStyle.directoryContent}}>
                        <View>
                        <Text style={{...commonStyle.imageCountText, fontSize:14}}>{item.photoCount}</Text>
                        <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                        </View>
                      </View>
                      </ImageBackground>
                </View>
                <View style={styles.right}>
                  <Text style={commonStyle.title}>
                  {item?.title?.length > 15 ? item?.title?.substring(0, 15) + '...' : item?.title}
                  </Text>

                  <View style={{paddingVertical:10}}>
                    <Text style={styles.date}>{item?.date}</Text>
                  </View>

                  <TouchableOpacity 
                  onPress={() => downloadHandle(item?._id)}
                  style={{flexDirection:'row', borderWidth:1, width:'70%', borderColor:colors.border, borderRadius:5, padding:5, justifyContent:'center'}}>
                    <Text style={styles.viewMore}> Download </Text>
                    <Image source={DownloadImg} style={{width:25, height:25}} />
                  </TouchableOpacity>
                </View>
            </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header screen='My Downloads' />
        <View style={commonStyle.section}>
            <FlatList
            data={userDownloadHistory}
            renderItem={renderItem}
            keyExtractor={(item, index)=>index}
            />
        </View>
       
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
    marginTop:10
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
