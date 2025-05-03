import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Dimensions,
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
import { zip } from 'react-native-zip-archive';
import MasonryList from '@react-native-seoul/masonry-list';
const { width, height } = Dimensions.get("window");

// ✅ ImageCard component
const ImageCard = ({ item, isSelected, onSelect }) => (
  <View style={{...styles.imageCard, height:item.height}}>
    <TouchableOpacity style={styles.imageTouchable} onPress={onSelect}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        {/* Checkbox Overlay */}
        <View style={styles.checkboxContainer}>
          {isSelected && (
            <View style={styles.checkbox}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
         )} 
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);


const ImageListScreen = (props) => {
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [data, setData] = useState([]);
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
      const localImagePaths = await Promise.all(
        urls.map((url, index) => downloadImageToLocal(url, index))
      );
  
      const shareOptions = {
        title: 'Share images',
        urls: localImagePaths, // multiple local images
      };
  
      await Share.open(shareOptions);
    } catch (error) {
      // console.error('Error sharing images:', error);
    }
  }


  
  
  async function requestStoragePermission() {
    if (Platform.OS !== 'android') return true;
  
    const androidVersion = parseInt(Platform.Version, 10);
    console.log('Android version:', androidVersion);
  
    if (androidVersion >= 33) {
      // Android 13+ - new media permissions
      const readMediaImages = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );
      const readMediaVideo = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      );
      console.log('Permission results:', readMediaImages, readMediaVideo);
      return (
        readMediaImages === PermissionsAndroid.RESULTS.GRANTED ||
        readMediaVideo === PermissionsAndroid.RESULTS.GRANTED
      );
    } else if (androidVersion >= 30) {
      // Android 11 or 12
      const readExternal = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      console.log('Permission result:', readExternal);
      return readExternal === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // Android 10 and below
      const writeExternal = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      console.log('Permission result:', writeExternal);
      return writeExternal === PermissionsAndroid.RESULTS.GRANTED;
    }
  }

  
  async function downloadZippedImages(urls) {
    try {
      // 📁 App-specific cache folder
      const tempFolder = `${RNFS.CachesDirectoryPath}/zip_images`;
      await RNFS.mkdir(tempFolder);
  
      // ⬇️ Download all images to temp folder
      const downloadedPaths = await Promise.all(
        urls.map(async (url, index) => {
          const ext = url.split('.').pop().split(/\#|\?/)[0];
          const filePath = `${tempFolder}/image_${index}.${ext}`;
          const res = await RNFS.downloadFile({ fromUrl: url, toFile: filePath }).promise;
          if (res.statusCode === 200) return filePath;
          else throw new Error(`Failed to download: ${url}`);
        })
      );
  
      // 🗜️ Create ZIP file from temp folder
      const zipPath = `${RNFS.CachesDirectoryPath}/images_bundle.zip`;
      // await zip(tempFolder, zipPath);
  
      await RNFS.copyFile(zipPath, zipPath);
        alert
    } catch (err) {
      console.log('ZIP failed:', err);
      Alert.alert('Error', 'Failed to prepare ZIP file.');
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

  return (
    <SafeAreaView style={styles.container}>
      <Header screen="All Images" />
      {props?.route?.params?.title &&
      <View style={styles.titleSection}>
        <Text style={commonStyle.title}>
          {props?.route?.params?.title}
        </Text>
      </View>
  }

      <View style={styles.imagesSection}>
        {/* <FlatList
          data={data}
          keyExtractor={(item, index) => item?._id ? item._id : index.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => <ImageCard item={item}
          isSelected={selectedImages.includes(item?.image)}
          onSelect={() => toggleSelectImage(item.image)} />}
        /> */}
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
          <Image source={ShareFixImg} style={{...styles.icon, width:20,}} />
          <Text style={styles.linkText}> Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>downloadZippedImages(selectedImages)} style={[styles.link, { backgroundColor: colors.primary }]}>
          <Image source={DownloadFixImg} style={styles.icon} />
          <Text style={[styles.linkText, { color: colors.secondary }]}> Download</Text>
        </TouchableOpacity>
      </View>
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
    borderColor:'white',
    borderRadius:5
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
