import { useNavigation } from '@react-navigation/native';
import {View, TouchableOpacity, Text, StyleSheet, 
    ImageBackground, Image, Dimensions, Share} from 'react-native';
import commonStyle from './Style';
import { DownloadImg, LinkImg, ShareImg } from '../assets';
import Clipboard from '@react-native-clipboard/clipboard';
const { width } = Dimensions.get('window')
const ImageCard = ({ item }) => {
    const navigation = useNavigation();

    const copyToClipboard = () => {
        Clipboard.setString('hello world');
      };

    const onShare = async () => {
    try {
        const result = await Share.share({
        message: 'Check out this awesome content!',
        url: 'https://www.example.com', 
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
          onPress={()=>navigation.navigate('ImageListScreen')}
        >
          <ImageBackground
            source={{ uri: item.uri }}
            style={{ width: '100%', height: item.height }}
            resizeMode="cover"
            imageStyle={{borderRadius:15}}
          >
            <View style={commonStyle.directoryContent}>
              <View>
                <Text style={commonStyle.imageCountText}>250</Text>
                <Text style={commonStyle.photosText}>photos</Text>
              </View>
              <View style={styles.eventDateSection}>
                <Text style={styles.eventDate}>02 Nov 2024</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.imgBottomSection}>
            <Text style={commonStyle.title}>CI Young Indians Conferences</Text>
            <View style={commonStyle.linksSection}>
              <TouchableOpacity>
                <Image source={DownloadImg} style={commonStyle.linkIMg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onShare()}>
                <Image source={ShareImg} style={commonStyle.linkIMg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>copyToClipboard()}>
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
    width: '47%',
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