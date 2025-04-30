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
  SafeAreaView
} from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import { DownloadFixImg, ShareFixImg } from '../assets';
import commonStyle from '../components/Style';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../redux/actions/EventAction';

const { width, height } = Dimensions.get("window");

// ✅ ImageCard component
const ImageCard = ({ item, isSelected, onSelect }) => (
  <View style={styles.imageCard}>
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

  let data = []
  if(props.route.params.screen == "UploadPhotoScreen"){
    data = props?.route?.params?.data?.payload?.photos
  }
  else{
    data = event.eventPhotos
  }
  console.log('-------', data)
  return (
    <SafeAreaView style={styles.container}>
      <Header screen="All Images" />

      <View style={styles.titleSection}>
        <Text style={commonStyle.title}>
          {props?.route?.params?.title}
        </Text>
      </View>

      <View style={styles.imagesSection}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item?._id ? item._id.toString() : index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => <ImageCard item={item}
          isSelected={selectedImages.includes(item?.image)}
          onSelect={() => toggleSelectImage(item.image)} />}
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
        <TouchableOpacity style={styles.link}>
          <Image source={ShareFixImg} style={styles.icon} />
          <Text style={styles.linkText}> Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.link, { backgroundColor: colors.primary }]}>
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
