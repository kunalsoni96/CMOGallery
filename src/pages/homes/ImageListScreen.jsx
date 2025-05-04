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


  
  
  
  

  


  const renderItem = (item, index) => {
    return (
      <ImageCard item={item}
      isSelected={selectedImages.includes(item?.image)}
      onSelect={() => toggleSelectImage(item.image)} 
      />
    )
  }



  const downloadZippedImagesToStorage = async (urls) => {
    try {
        if (!urls || urls.length === 0) {
            Alert.alert('Error', 'No image URLs provided.');
            return;
        }

        const granted = await requestStoragePermission(); // Request permission, but this can be skipped if no external storage used
        alert(granted)
        if (!granted) return;

        const tempFolder = `${RNFS.TemporaryDirectoryPath}/zip_images`;  // Use Temporary Directory

        await RNFS.mkdir(tempFolder);

        const downloadedPaths = await Promise.all(
            urls.map(async (url, index) => {
                const ext = url.split('.').pop().split(/\#|\?/)[0] || 'jpg';
                const filePath = `${tempFolder}/image_${index}.${ext}`;
                const res = await RNFS.downloadFile({ fromUrl: url, toFile: filePath }).promise;
                if (res.statusCode === 200) {
                    return filePath;
                } else {
                    throw new Error(`Download failed for ${url}`);
                }
            })
        );

        if (downloadedPaths.length === 0) {
            Alert.alert('Error', 'No images were downloaded.');
            return;
        }

        // Here we store in internal storage (app-specific storage)
        const zipPath = `${RNFS.TemporaryDirectoryPath}/images_bundle.zip`;  // Use Temporary Directory instead of external storage
        const zippedPath = await zip(tempFolder, zipPath);
        Alert.alert('Success', `ZIP file created at:\n${zippedPath}`);
    } catch (err) {
        console.log('Error creating ZIP:', err);
        Alert.alert('Error', err.message || 'Unexpected error occurred');
    }
};


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
          <Image source={ShareFixImg} style={{...styles.icon, width:20}} />
          <Text style={styles.linkText}> Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>downloadZippedImagesToStorage(selectedImages)} style={[styles.link, { backgroundColor: colors.primary }]}>
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
