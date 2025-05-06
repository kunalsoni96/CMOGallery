import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Linking,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform, PermissionsAndroid,
  SafeAreaView
} from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import { DownloadFixImg, ShareFixImg } from '../assets';
import commonStyle from '../components/Style';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../redux/actions/EventAction';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import MasonryList from '@react-native-seoul/masonry-list';
import { zip } from 'react-native-zip-archive';
import axios from 'axios';
const { width, height } = Dimensions.get("window");
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import LoaderScreen from '../components/LoaderScreen';
// ✅ ImageCard component
const ImageCard = ({ item, isSelected, onSelect }) => (
  <View style={{...styles.imageCard, height:item.height}}>
    <TouchableOpacity style={styles.imageTouchable} onPress={onSelect}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.topShadow} />
        {isSelected &&
        (<View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
         
        </View>
        )} 
      </ImageBackground>
    </TouchableOpacity>
  </View>
);


const ImageListScreen = (props) => {
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("Loading event all images...")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotos(props?.route?.params?.id));
  }, []);

  const event = useSelector(state => state.event);
  const toggleSelectImage = (id) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };


  useEffect(() => {
    let data = []
    if(props.route.params.screen == "UploadPhotoScreen"){
      data = props?.route?.params?.data?.payload?.photos
    }
    else{
      data = event.eventPhotos
    }

    const shouldStartWithSmall = Math.random() < 0.5; // randomly true or false

    let result = data.map((value, index) => {
      const newItem = { ...value };

      const isEven = index % 2 === 0;
      const assignSmall = shouldStartWithSmall ? isEven : !isEven;

      if (assignSmall) {
        newItem.height = Math.floor(Math.random() * (220 - 200 + 1)) + 200;
      } else {
        newItem.height = Math.floor(Math.random() * (270 - 250 + 1)) + 250;
      }

      return newItem;
    });

setData(result);
  },[event])
 
  async function downloadImageToLocal(url, index) {
    const extension = url.split('.').pop().split(/\#|\?/)[0]; // get file extension
    const localPath = `${RNFS.CachesDirectoryPath}/shared_image_${index}.${extension}`;
  
    const res = await RNFS.downloadFile({
      fromUrl: url,
      toFile: localPath,
    }).promise;
  
    if (res.statusCode === 200) {
      return Platform.OS === 'android' ? 'file://' + localPath : localPath;
    } else {
      throw new Error('Failed to download image');
    }
  }
  
const  shareImages = async(urls) => {
    try {
      setLoader(true)
      setMessage("Please wait...")
      const localImagePaths = await Promise.all(
        urls.map((url, index) => downloadImageToLocal(url, index))
      );
  
      const shareOptions = {
        title: 'Share images',
        urls: localImagePaths, // multiple local images
      };
      setLoader(false)
      setMessage("Loading event all images...")
      await Share.open(shareOptions);
      
    } catch (error) {
      // console.error('Error sharing images:', error);
    }
  }

  


  const renderItem = (item, index) => {
    return (
      <ImageCard item={item}
      isSelected={selectedImages.includes(item?.image)}
      onSelect={() => toggleSelectImage(item.image)} 
      />
    )
  }


  const requestStoragePermission = async () => {
    if (Platform.OS === 'ios')
      return true;
  
    if (Platform.OS === 'android') {
      let androidVersion = Platform.Version;
      if(androidVersion > 11) return true;
    try {
      const granted = await request(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
      );
  
      return (granted === RESULTS.GRANTED);
    } catch (err) {
      return false;
    }
    }
  };
  


  const downloadAndZipImages = async (imageUrls) => {
    setLoader(true)
    setMessage("Download in process...")
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      console.warn('❌ Storage permission denied');
      return;
    }
  
    const tempFolderPath = `${RNFS.DocumentDirectoryPath}/tempImages`;
  
    // 🧹 Clean up old temp folder
    if (await RNFS.exists(tempFolderPath)) {
      await RNFS.unlink(tempFolderPath);
    }
    await RNFS.mkdir(tempFolderPath);
  
    // 📥 Download each image
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const filename = `image_${i}.jpg`;
      const destPath = `${tempFolderPath}/${filename}`;
  
      try {
        const result = await RNFS.downloadFile({
          fromUrl: url,
          toFile: destPath,
        }).promise;
  
        if (result.statusCode !== 200) {
          console.warn(`⚠️ Download failed for ${url}, status: ${result.statusCode}`);
        }
      } catch (err) {
        console.error(`❌ Failed to download ${url}`, err);
      }
    }
  
    // 🗜️ Create ZIP file in Download folder
    const zipPath = `${RNFS.DownloadDirectoryPath}/my_images_${Date.now()}.zip`;
  
    try {
      const result = await zip(tempFolderPath, zipPath);
      Alert.alert(
        'Download Completed',
        `File saved to Download folder:\n${result}`
      );
      setTimeout(() => {
        setMessage("Loading event all images...")
        setLoader(false)
      }, 0);
      return result;
    } catch (error) {
      setTimeout(() => {
        setLoader(false)
      }, 0);
      console.error('❌ ZIP creation failed:', error);
    }
  };

  const selectAllHandle = () => {
    if(selectedImages?.length == event?.eventPhotos?.length) {
      setSelectedImages([])
    }
    else{
      let result = event?.eventPhotos?.map((value)=>{
        return value.image
      })
      setSelectedImages(result)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header screen="All Images" />
      {props?.route?.params?.title &&
      <View style={styles.titleSection}>
        <Text style={{...commonStyle.title, width:'75%'}}>
          {props?.route?.params?.title} 
        </Text>

        <View style={{position:'absolute', right:20, paddingTop:10}}>
        <TouchableOpacity onPress={()=>selectAllHandle()} style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold'}}>Select All</Text>
          <View style={{...styles.checkboxContainer, backgroundColor:'white', position:'relative', borderColor:'black', right:-5, top:0}}>
            {selectedImages.length == event.eventPhotos?.length &&
            <View style={styles.checkbox}>
              <Text style={{...styles.checkmark, color:colors.primary}}>✓</Text>
            </View>
            }
        </View>
        </TouchableOpacity>
        </View>
      </View>
  }

      <View style={styles.imagesSection}>
        <MasonryList
          data={data}
          keyExtractor={(item) => item._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>

      <Modal visible={image !== null} onRequestClose={() => setImage(null)}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setImage(null)}
        >
          <Image
            source={{ uri: image }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => shareImages(selectedImages)} style={styles.link}>
          <Image source={ShareFixImg} style={{...styles.icon}} />
          <Text style={styles.linkText}> Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => downloadAndZipImages(selectedImages)} style={[styles.link, { backgroundColor: colors.primary }]}>
          <Image source={DownloadFixImg} style={styles.icon} />
          <Text style={[styles.linkText, { color: colors.secondary }]}> Download</Text>
        </TouchableOpacity>
      </View>
      {loader && <LoaderScreen screen="ImageListScreen" message2={message} message={""} /> }
      
    </SafeAreaView>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleSection: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection:'row'
  },
  imagesSection: {
    flex: 1,
    
  },
  imageCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    
  },
  imageTouchable: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 250,
  },
  topShadow: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // height: 40,
    // backgroundColor: 'black',
    // opacity: 0.1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  link: {
    width: width / 2.4,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    flexDirection: 'row',
  },
  linkText: {
    fontSize: 16,
    color: colors.primary,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  checkboxContainer:{
    width:20, 
    height:20,
    borderWidth:2,
    position:'absolute',
    right:10,
    top:10,
    borderColor:colors.primary,
    borderRadius:5,
    backgroundColor:colors.primary
  },
  checkbox:{

  },
  checkmark:{
    color:'white',
    fontSize:16,
    marginTop:-3,
    marginLeft:3
  }
});

export default ImageListScreen;
