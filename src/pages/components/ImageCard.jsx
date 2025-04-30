import { useNavigation } from '@react-navigation/native';
import {View, TouchableOpacity, Text, StyleSheet, 
    ImageBackground, Image, Dimensions, Share} from 'react-native';
import commonStyle from './Style';
import { DownloadImg, LinkImg, ShareImg } from '../assets';
import Clipboard from '@react-native-clipboard/clipboard';
const { width } = Dimensions.get('window')
const ImageCard = ({ item, callback, customHeight }) => {
    const navigation = useNavigation();

    const copyToClipboard = (uri) => {
        Clipboard.setString(uri);
        callback(true)
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
          onPress={()=>navigation.navigate('ImageListScreen', { id: item?._id, title:item?.name })}
        >
          <ImageBackground
            source={{ uri: item?.cover }}
            style={{ width: '100%', height: customHeight }}
            resizeMode="cover"
            imageStyle={{borderRadius:15}}
          >
            <View style={commonStyle.directoryContent}>
              <View>
                {/* <Text style={commonStyle.imageCountText}>{item.total}</Text> */}
                <Text style={commonStyle.photosText}>photos</Text>
              </View>
              <View style={styles.eventDateSection}>
                <Text style={styles.eventDate}>{item?.date}</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.imgBottomSection}>
            <Text style={commonStyle.title}>CI Young Indians Conferences</Text>
            <View style={commonStyle.linksSection}>
              <TouchableOpacity>
                <Image source={DownloadImg} style={commonStyle.linkIMg} />
              </TouchableOpacity>
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
    width: width/2.2,
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