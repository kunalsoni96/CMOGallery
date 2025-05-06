import { useNavigation } from '@react-navigation/native';
import {View, TouchableOpacity, Text, StyleSheet, 
    ImageBackground, Image, Dimensions, Share} from 'react-native';
import commonStyle from './Style';
import { DownloadImg, LinkImg, ShareImg } from '../assets';
import Clipboard from '@react-native-clipboard/clipboard';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window')
const ImageCard = ({ item,  customHeight, downloadingImgs }) => {
    const navigation = useNavigation();
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
             
              {downloadingImgs.includes(item._id) ?
                <LottieView
                source={require('./../../images/downloading.json')} // Ensure correct path
                autoPlay
                loop
                style={{width:30, height:30}}
              />
                :
              <TouchableOpacity>
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
    marginHorizontal:'1%', 
    marginVertical:10, 
    width: width/2.1,
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