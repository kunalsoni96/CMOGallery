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
  Platform,
  SafeAreaView
} from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import { CrossImg, DownloadFixImg, DownloadingImg, ShareFixImg } from '../assets';
import commonStyle from '../components/Style';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../redux/actions/EventAction';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import MasonryList from '@react-native-seoul/masonry-list';
const { width, height } = Dimensions.get("window");
import LoaderScreen from '../components/LoaderScreen';
import { downloadAndZipImages } from '../../utils/zipCreate';
import Toaster from '../components/Toaster';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
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
  const [visible, setVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("Loading event all images...")
  const dispatch = useDispatch();
  const navigation = useNavigation()
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

  const downloadHandle = async() => {
    setVisible(true)
    // await downloadAndZipImages(selectedImages)
    // setVisible(false)
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


      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => shareImages(selectedImages)} style={styles.link}>
          <Image source={ShareFixImg} style={{...styles.icon}} />
          <Text style={styles.linkText}> Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => downloadHandle()} style={[styles.link, { backgroundColor: colors.primary }]}>
          <Image source={DownloadFixImg} style={styles.icon} />
          <Text style={[styles.linkText, { color: colors.secondary }]}> Download</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalSection}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setVisible(false)} style={{position:'absolute', right:-10, top:-10}}>
            <Image source={CrossImg} style={{width:50, height:50}} />
          </TouchableOpacity>
        <LottieView
          source={DownloadingImg} // Ensure correct path
          autoPlay
          loop
          style={{width:40, height:40}}
        />

        <Text style={styles.headingText}>
        Creating your ZIP archive...
        </Text>
        <Text style={styles.subTitle}>
            Your selected images are being compressed into a ZIP file.
            You can wait here, or click the Downloads section once it's ready !
        </Text>

        <View style={{flexDirection:'row', marginTop:20, width:'100%', justifyContent:'space-around'}}>
          <TouchableOpacity 
          onPress={() => {
            setSelectedImages([])
            setVisible(false)
          }}
          style={{...styles.link, backgroundColor:colors.border, width:100,  borderRadius:5, height:40}}>
            <Text>Cancel </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => {}}
          style={{...styles.link, backgroundColor:colors.primary, borderRadius:5, height:40}}>
            <Text style={{color:'white'}}>Go to Downloads</Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>
      </Modal>


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
  modalSection:{
    flex:1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  modalContainer: {
    width:width/1.1,
    height:width/1.3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    paddingHorizontal:20
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
  },

  headingText:{
    fontSize:18,
    color:'black',
    fontWeight:'bold',
    marginVertical:10
  },
  subTitle:{
    textAlign:'center'
  },

 
});

export default ImageListScreen;
