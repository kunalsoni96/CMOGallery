import { useNavigation } from '@react-navigation/native';
import {View, TouchableOpacity, Text, StyleSheet, 
    ImageBackground, Image, Dimensions, Share} from 'react-native';
import commonStyle from './Style';
import { DownloadImg, LinkImg, ShareImg, DownloadingImg } from '../assets';
import Clipboard from '@react-native-clipboard/clipboard';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { downloadAndZipImages } from '../../utils/zipCreate';
import { useState } from 'react';
import { getPhotos, recordDownloadHistory } from '../../redux/actions/EventAction';
import { useDispatch, useSelector } from 'react-redux';
const { width } = Dimensions.get('window')
const ImageCard = ({ item,  customHeight, downloadingImgs }) => {
    const user = useSelector(state=>state.login.user)
    const navigation = useNavigation();
    const [downloadProcess, setDownloadProcess] = useState(false)
    const dispatch = useDispatch()
    const clickEventHandle = async() => {
      let data = JSON.parse(await AsyncStorage.getItem('events')) || [];
      let result = data;
      if(!data.includes(item?._id)){
        result.unshift(item?._id)
      }
      AsyncStorage.setItem('events', JSON.stringify(result))
      navigation.navigate('ImageListScreen', { id: item?._id, title:item?.name })
    }
    const copyToClipboard = (uri) => {
        Clipboard.setString(uri);
      };

    const onShare = async (uri) => {
    try {
        const result = await Share.share({
        message: (uri),
        url: uri, 
        });
        if (result.action === Share.sharedAction) {
        if (result.activityType) {
            console.log('Shared with activity type: ', result.activityType);
        } else {
            console.log('Content shared');
        }
        } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
        }
    } catch (error) {
        console.error(error.message);
    }
    };


    const downloadZipHandle = async() => {
      // setDownloadProcess(true)
      let data = await dispatch(getPhotos({id:item._id, limit:'full', page:2}));
      
      if(data?.payload){
       let result = data?.payload?.data?.photos?.map((value)=>{
          return value.image
        })
       
        // await downloadAndZipImages(selectedImages)
      
      const date = new Date(item?.date);

      const day = String(date.getDate()).padStart(2, '0');  
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      console.log(user)
       let object = {
          title: item.name,
          image: item.cover,
          photoCount: item?.photo_count,
          date: formattedDate,
          photoUrls: result
        }

       let response = await dispatch(recordDownloadHistory({download:object, userId:user.userId}))
       console.log(response, 'response--')
      }
      // setDownloadProcess(false)
    }

    
    return (
      <View style={styles.imageCard}>
        <TouchableOpacity
          style={{ borderRadius: 15, overflow: 'hidden' }}
          onPress={()=> clickEventHandle()}
        >
          <ImageBackground
            source={{ uri: item?.cover }}
            style={{ width: '100%', height: customHeight }}
            resizeMode="cover"
            imageStyle={{borderRadius:15}}
          >
            <View style={commonStyle.directoryContent}>
              <View>
                <Text style={commonStyle.imageCountText}>{item.photo_count}</Text>
                <Text style={commonStyle.photosText}>photos</Text>
              </View>
              <View style={styles.eventDateSection}>
                <Text style={styles.eventDate}>{item?.date}</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.imgBottomSection}>
            <Text style={commonStyle.title}>{item?.name?.length > 15 ? item?.name?.substring(0, 15) + '...' : item?.name}</Text>
            <View style={commonStyle.linksSection}>
             
              {downloadProcess ?
                <LottieView
                source={DownloadingImg}
                autoPlay
                loop
                style={{width:30, height:30}}
              />
                :
              <TouchableOpacity onPress={()  => downloadZipHandle()}>
                <Image source={DownloadImg} style={commonStyle.linkIMg} />  
              </TouchableOpacity>
              }
              <TouchableOpacity onPress={() => onShare(`https://nbdigital.online/album/${item?._id}`)}>
                <Image source={ShareImg} style={commonStyle.linkIMg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>copyToClipboard(`https://nbdigital.online/album/${item?._id}`)}>
                <Image source={LinkImg} style={commonStyle.linkIMg} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    );
    }

const styles = StyleSheet.create({
    imageCard:{
    marginVertical:10, 
    width: '95%',
    },
    
    eventDateSection:{
    width: width / 4, 
    justifyContent: "center", 
    alignItems: "flex-end" 
},
    eventDate: {
    fontSize: 11,
    color: "white",
    position: "absolute",
    bottom: 2,
    right: 0, 
    },
    imgBottomSection:{
        marginTop:10
     },
})

export default ImageCard